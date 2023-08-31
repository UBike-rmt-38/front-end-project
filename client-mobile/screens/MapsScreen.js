import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image,
  Animated,
  Button,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  AnimatedRegion,
  MarkerAnimated,
} from "react-native-maps";
import MapsPin from "../components/MapsPin";
import Scanner from "../components/Scanner";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setIsRenting } from "../stores/reducers/authSlice";
import { useQuery } from "@apollo/client";
import {
  CHECK_RENTALS,
  GET_BICYCLE_BY_ID,
  GET_STATIONS,
  GET_STATION_BY_ID,
} from "../constants/query";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getValueFor, saveRentingStatus } from "../helpers/secureStoreAction";
import axios from "axios";
import { ROUTES_API } from "../constants/baseURL";
import GOOGLE_API_KEY from "../constants/apiKey.js";
import decodePolyline from "../helpers/polylineDecoder";
import Modal from "react-native-modal";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("screen");

export default function MapsScreen() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showFlatList, setShowFlatList] = useState(false);
  const [nearestStations, setNearestStations] = useState([]);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const isRenting = useSelector((state) => state.auth.isRenting);
  const [route, setRoute] = useState([]);
  const [showRoute, setShowRoute] = useState(false);
  const [BicycleId, setBicycleId] = useState(null);
  const [travelledDistance, setTravelledDistance] = useState(0);
  const [estimatedTimeOfArrival, setEstimatedTimeOfArrival] = useState(null);
  const [balance, setBalance] = useState(0);
  const [StationId, setStationId] = useState(null);
  const [price, setPrice] = useState(0);
  const [rentalId, setRentalId] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [cash, setCash] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  // hooks
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["9%", "50%", "100%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleOpenBottomSheet = useCallback((station) => {
    // console.log(station, "<<<< handleOpenSheet");
    setSelectedStation(station);
    if (userLocation) {
      getRoutes(station.latitude, station.longitude);
    }
    // console.log(station, "<<< selected")
    sheetRef.current?.snapToIndex(2);
  });
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const {} = useQuery(GET_STATIONS, {
    onCompleted: (data) => {
      setStations(data.getStations);
    },
    onError: (error) => {
      alert(`${error.message}`);
    },
  });
  const dispatch = useDispatch();
  const {} = useQuery(CHECK_RENTALS, {
    onCompleted: (data) => {
      const isRenting = data.getUsersDetails.Rentals.some(
        (rental) => rental.status === false
      );
      const activeRental = data.getUsersDetails.Rentals.filter(
        (rental) => rental.status === false
      );
      console.log(activeRental, "<<<<<< active Rental");
      if (activeRental.length > 0) {
        // console.log(activeRental[0].id, "<<<<< activeRental[0].id di CHECK_RENTALS")
        setRentalId(activeRental[0]?.id);
        setTravelledDistance(activeRental[0]?.travelledDistance);
        // console.log(activeRental[0].BicycleId, "<<<< check rental bicycleId");
        setBicycleId(activeRental[0]?.BicycleId);
        refetch({ bicycleId: activeRental[0]?.BicycleId });
        setBalance(data.getUsersDetails?.balance);
      }
      console.log(isRenting, "<<<< check rental");
      dispatch(setIsRenting(isRenting));
      if (isRenting) saveRentingStatus("Active");
      else {
        saveRentingStatus("Inactive");
        getUserLocation();
      }
    },
  });

  const { refetch } = useQuery(GET_BICYCLE_BY_ID, {
    variables: {
      bicycleId: BicycleId,
    },
    onCompleted: (data) => {
      console.log(
        data.getBicycleById?.price,
        "<<<< useQuery GET_BICYCLE_BY_ID"
      );
      setPrice(data.getBicycleById?.price);
      setStationId(data.getBicycleById?.StationId);
      console.log(data.getBicycleById?.StationId, "<<<<< StationId");
      refetchStation({ stationId: data.getBicycleById?.StationId });
      // console.log(travelledDistance, price, "<<<< useQuery GET_BICYCLE_BY_ID")
    },
  });

  const { data: station, refetch: refetchStation } = useQuery(
    GET_STATION_BY_ID,
    {
      variables: {
        stationId: StationId,
      },
      onCompleted: (data) => {
        console.log(data, "<<<<< refetchStation ketrigger");
        getUserLocation();
      },
    }
  );

  // const fetchData = async () => {
  //   const { data } = await useQuery(GET_BICYCLE_BY_ID, { variables: {
  //     bicycleId: BicycleId,
  //   }});
  //   console.log(data.getBicycleById?.price, "<<<< useQuery GET_BICYCLE_BY_ID");
  //   setPrice(data.getBicycleById?.price);
  //   setStationId(data.getBicycleById.StationId);
  //   console.log(data.getBicycleById.StationId, "<<<<< StationId");

  //   const stationData = await useQuery(GET_STATION_BY_ID, {});
  //   console.log(stationData, "<<<<< refetchStation ketrigger");
  //   getUserLocation();
  // };

  // fetchData();

  const getIsRenting = async () => {
    try {
      const renting_status = await getValueFor("renting_status");
      if (renting_status === "Active") {
        dispatch(setIsRenting(true));
      } else {
        dispatch(setIsRenting(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openConfirmationModal = (station) => {
    // console.log(station.latitude, station.longitude);
    setSelectedStation(station);
    // console.log(station, "<<< selected")
    if (userLocation) {
      getRoutes(station.latitude, station.longitude);
    }
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    // setSelectedStation(null);
  };

  useEffect(() => {
    updateNearestStations();
    getIsRenting();
  }, [stations]);
  const moveToSelectedStation = () => {
    try {
      setShowRoute(true);
      if (userLocation && selectedStation && route.length > 0 && !isRenting) {
        // Calculate the bounding box that contains both userLocation and selectedStation

        const animationDuration = 100; // Adjust animation duration as needed

        const animations = route.map((coordinate, index) => {
          const { latitude, longitude } = coordinate;
          return userLocation.timing({
            latitude,
            longitude,
            duration: animationDuration,
            // delay: index * animationDuration, // Delay each animation by index * animationDuration
          });
        });

        // Execute animations in sequence
        Animated.sequence(animations).start(() => {
          // Animation sequence complete
          setRoute([]);
          setShowRoute(false);
        });

        closeConfirmationModal();

        const minLat =
          userLocation.latitude < selectedStation.latitude
            ? userLocation.latitude
            : selectedStation.latitude;
        const maxLat =
          userLocation.latitude > selectedStation.latitude
            ? userLocation.latitude
            : selectedStation.latitude;
        const minLon =
          userLocation.longitude < selectedStation.longitude
            ? userLocation.longitude
            : selectedStation.longitude;
        const maxLon =
          userLocation.longitude > selectedStation.longitude
            ? userLocation.longitude
            : selectedStation.longitude;

        // Calculate map's new latitudeDelta and longitudeDelta
        const latDelta = maxLat - minLat + 0.0922; // Add some padding
        const lonDelta = maxLon - minLon + 0.0421; // Add some padding

        // Animate the map to show the bounding box
        mapRef.current.animateToRegion(
          {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2,
            latitudeDelta: latDelta,
            longitudeDelta: lonDelta,
          },
          1000
        ); // Adjust duration as needed
      } else {
        // Calculate the bounding box that contains both userLocation and selectedStation

        const animationDuration = 100; // Adjust animation duration as needed

        const animations = route.map((coordinate, index) => {
          const { latitude, longitude } = coordinate;
          return userLocation.timing({
            latitude,
            longitude,
            duration: animationDuration,
            // delay: index * animationDuration, // Delay each animation by index * animationDuration
          });
        });

        // Execute animations in sequence
        Animated.sequence(animations).start(() => {
          // Animation sequence complete
          setRoute([]);
          setShowRoute(false);
        });

        closeConfirmationModal();

        const minLat =
          userLocation.latitude < selectedStation.latitude
            ? userLocation.latitude
            : selectedStation.latitude;
        const maxLat =
          userLocation.latitude > selectedStation.latitude
            ? userLocation.latitude
            : selectedStation.latitude;
        const minLon =
          userLocation.longitude < selectedStation.longitude
            ? userLocation.longitude
            : selectedStation.longitude;
        const maxLon =
          userLocation.longitude > selectedStation.longitude
            ? userLocation.longitude
            : selectedStation.longitude;

        // Calculate map's new latitudeDelta and longitudeDelta
        const latDelta = maxLat - minLat + 0.0922; // Add some padding
        const lonDelta = maxLon - minLon + 0.0421; // Add some padding

        // Animate the map to show the bounding box
        mapRef.current.animateToRegion(
          {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2,
            latitudeDelta: latDelta,
            longitudeDelta: lonDelta,
          },
          1000
        ); // Adjust duration as needed
      }
    } catch (error) {
      console.log(error, "<<<< error di moveToStation");
    }
  };

  const openScanner = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const toRad = (angle) => {
    return angle * (Math.PI / 180);
  };

  const updateNearestStations = (userLat, userLon) => {
    const stationsWithDistances = stations.map((station) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        station.latitude,
        station.longitude
      );
      return { ...station, distance };
    });

    const sortedStations = stationsWithDistances.sort(
      (a, b) => a.distance - b.distance
    );
    setNearestStations(sortedStations);
  };

  const getUserLocation = async () => {
    try {
      if (station.getStationsById) {
        console.log(station, "<<<< station ketrigger di getUserLocation");
        setUserLocation(
          new AnimatedRegion({
            latitude: station?.getStationsById.latitude,
            longitude: station?.getStationsById.longitude,
          })
        );
        updateNearestStations(
          station?.getStationsById.latitude,
          station?.getStationsById.longitude
        );
        mapRef.current.animateToRegion({
          latitude: station?.getStationsById.latitude,
          longitude: station?.getStationsById.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        });
        return;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        console.log("ketrigger di current position");
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        // const heading = location.coords.heading;
        // setUserLocation(new AnimatedRegion({ latitude, longitude }));
        setUserLocation(
          new AnimatedRegion({
            latitude: -6.2554579761602005,
            longitude: 106.85606339939457,
          })
        );
        updateNearestStations(latitude, longitude);
        mapRef.current.animateToRegion({
          // latitude,
          // longitude,
          latitude: -6.2554579761602005,
          longitude: 106.85606339939457,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        });
      }
    } catch (error) {
      // alert("Error getting current location: " + error.message);
      console.log(error);
    }
  };
  const filteredStations = search
    ? nearestStations.filter((station) =>
        station.name.toLowerCase().includes(search.toLowerCase())
      )
    : nearestStations;
  const listStations = (station) => {
    setSearch(station.name);
    mapRef.current.animateToRegion(
      {
        latitude: station.latitude,
        longitude: station.longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      },
      5000
    );
    setShowFlatList(false);
  };

  const getRoutes = async (destinationLat, destinationLong) => {
    const requestBody = {
      origin: {
        location: {
          latLng: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destinationLat,
            longitude: destinationLong,
          },
        },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: "en-US",
      units: "IMPERIAL",
    };

    try {
      const response = await axios.post(ROUTES_API, requestBody, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
      });
      // console.log(response);
      // console.log(response.data.routes[0].distanceMeters);
      setTravelledDistance(response.data.routes[0].distanceMeters);
      // console.log(response.data.routes[0].duration);
      const durationInSeconds = parseInt(
        response.data.routes[0].duration.replace("s", "")
      );
      // console.log(durationInSeconds);
      setEstimatedTimeOfArrival(durationInSeconds);

      const decodedCoordinates = decodePolyline(
        response.data.routes[0].polyline.encodedPolyline
      );
      // console.log(decodedCoordinates);
      const formattedRoute = decodedCoordinates.map(
        ([latitude, longitude]) => ({
          latitude,
          longitude,
        })
      );
      setRoute(formattedRoute);
      setTotalPrice((response.data.routes[0].distanceMeters * price) / 10000);
    } catch (error) {
      console.log(error);
    }
  };

  let displayTravelledDistance = "";

  if (travelledDistance >= 1000) {
    const km = travelledDistance / 1000;
    displayTravelledDistance = `${km.toFixed(1)} Km`;
  } else {
    displayTravelledDistance = `${travelledDistance} m`;
  }

  const handleCashChange = (text) => {
    // console.log(text, typeof text, "<<<< text")
    const cashValue = parseInt(text);
    // console.log(cashValue, typeof cashValue, "<<<< onChangeText")
    if (text !== "") {
      setCash(cashValue);
    } else {
      setCash(0);
    }
  };

  useEffect(() => {
    if (travelledDistance && price) {
      // console.log(price, "price ketrigger di useEffect");
      const newTotalPrice =
        (+travelledDistance * +price) / 10000 - Number(cash);
      // console.log(newTotalPrice, travelledDistance, price, cash, "<<<< useEffect")
      setTotalPrice(+newTotalPrice);
    }
  }, [cash]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.bikeImage} />
      <View style={styles.bikeDetails}>
        <Text style={styles.bikeName}>{item.name}</Text>
        <Text style={styles.bikePrice}>Rp{item.price / 10} per Km</Text>
      </View>
    </View>
  ));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={"Search stations..."}
            value={search}
            onChangeText={(text) => setSearch(text)}
            onFocus={() => setShowFlatList(true)}
          />
          {/* <TouchableOpacity style={styles.locationButton} onPress={getUserLocation}>
          <Text style={styles.buttonText}>Go to My Location</Text>
          </TouchableOpacity> */}
        </View>
        {showFlatList && userLocation && (
          <View style={styles.flatListContainer}>
            <Text>"{search}"</Text>
            <FlatList
              data={filteredStations.slice(0, 4)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => listStations(item)}>
                  <Text>
                    {item.name} - {item.distance.toFixed(2)} km
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          mapType={"standard"}
          style={styles.map}
          initialRegion={{
            latitude: -6.1754,
            longitude: 106.8272,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={() => setShowFlatList(false)}
        >
          {userLocation && (
            <MarkerAnimated
              style={{ zIndex: 10 }}
              coordinate={userLocation}
              title="My Location"
              // ref={(marker) => {
              //   setMyMarker(marker);
              // }}
            >
              <Ionicons name="radio-button-on" size={30} color="dodgerblue" />
            </MarkerAnimated>
          )}
          {filteredStations.map((station) => (
            <MapsPin
              key={station?.id}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.name}
              description={station.address}
              onPress={() => handleOpenBottomSheet(station)}
            />
          ))}
          {route && showRoute && (
            <>
              {/* Menggambar Polyline menggunakan route */}
              <Polyline
                coordinates={route}
                strokeWidth={5}
                strokeColor="#0AFF90"
              />

              {/* Menampilkan marker di setiap koordinat */}
              {/* {route.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                }}
              />
            ))} */}
            </>
          )}
        </MapView>
        {isRenting ? (
          // <View style={styles.rentingStatus}>
          //   <Text style={{ color: "white" }}>renting</Text>
          // </View>
          <View>
            <TouchableHighlight style={styles.rentingStatus}>
              <Ionicons
                name="bicycle"
                strokeWidth={8}
                size={40}
                color="#4FFFB0"
              />
              {/* <Text style={styles.buttonText}>Station</Text> */}
            </TouchableHighlight>
            <TouchableHighlight style={styles.scanButton} onPress={openScanner}>
              <Ionicons
                name="scan-outline"
                strokeWidth={8}
                size={40}
                color="#FFFFFF"
              />
              {/* <Text style={styles.buttonText}>Station</Text> */}
            </TouchableHighlight>
          </View>
        ) : (
          <View>
            <TouchableHighlight style={styles.scanButton} onPress={openScanner}>
              <Ionicons
                name="scan-outline"
                strokeWidth={8}
                size={40}
                color="#FFFFFF"
              />
              {/* <Text style={styles.buttonText}>Station</Text> */}
            </TouchableHighlight>
          </View>
        )}
        <TouchableHighlight
          style={{
            height: 50,
            width: 50,
            zIndex: 0,
            position: "absolute",
            right: 16,
            bottom: 90,
            backgroundColor: "black",
            borderRadius: 90,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            onPress={getUserLocation}
            name="locate"
            size={40}
            color="skyblue"
          />
        </TouchableHighlight>

        <Modal visible={showScanner} animationType="slide" transparent={false}>
          <View style={styles.scannerModal}>
            <Scanner
              onCloseScanner={closeScanner}
              isRenting={isRenting}
              travelledDistance={travelledDistance}
              totalPrice={totalPrice}
              rentalId={rentalId}
              transaction={transaction}
            />
          </View>
        </Modal>
        {isRenting && selectedStation ? (
          <View style={styles.buttomSheetContainer}>
            <BottomSheet
              onChange={handleSheetChange}
              snapPoints={snapPoints}
              style={{ zIndex: 2 }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <View style={[styles.itemContainer, { width: "40%" }]}>
                  <Text style={styles.bikePrice}>Move to</Text>
                  <Text style={styles.bikeName}>{selectedStation?.name} ?</Text>
                </View>
                {transaction && (
                  <TouchableOpacity
                    onPress={() => moveToSelectedStation(selectedStation)}
                    style={[
                      styles.itemContainer,
                      { width: "42%", backgroundColor: "#0AFF90" },
                    ]}
                  >
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Text style={[styles.bikeName]}>Start Navigation</Text>
                      <Ionicons name="navigate" color="white" size={20} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.itemContainer}>
                <View style={[styles.bikeDetails, { flexDirection: "row" }]}>
                  <View>
                    <Text style={styles.bikePrice}>Balance : </Text>
                    <Text style={styles.bikeName}>Rp{balance}</Text>
                    <Text style={styles.bikePrice}>Estimated Distance : </Text>
                    <Text style={styles.bikeName}>
                      {displayTravelledDistance}
                    </Text>
                    <Text style={styles.bikePrice}>Estimated Price :</Text>
                    <Text style={styles.bikeName}>
                      Rp{(travelledDistance * price) / 10000}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => setTransaction("Digital")}
                      style={[
                        styles.itemContainer,
                        { width: "85%", backgroundColor: "#808080" },
                        transaction === "Digital" && styles.activePaymentButton,
                      ]}
                    >
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <Ionicons name="card" color="white" size={25} />
                        <Text style={styles.paymentButtonText}>Digital</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setTransaction("Cash")}
                      style={[
                        styles.itemContainer,
                        { width: "85%", backgroundColor: "#808080" },
                        transaction === "Cash" && styles.activePaymentButton,
                      ]}
                    >
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <Ionicons name="cash" color="white" size={25} />
                        <Text style={styles.paymentButtonText}>Cash</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {transaction === "Cash" && (
                <View style={styles.itemContainer}>
                  <View style={{ flexDirection: "column", gap: 8 }}>
                    <Text>Amount :</Text>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Enter cash amount"
                      value={cash.toString()}
                      onChangeText={handleCashChange}
                      style={{
                        width: 300,
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginBottom: 20,
                      }}
                    />
                  </View>
                </View>
              )}
            </BottomSheet>
          </View>
        ) : (
          <View style={styles.buttomSheetContainer}>
            {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
            <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
            <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
            <Button title="Close" onPress={() => handleClosePress()} /> */}
            {selectedStation && (
              <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
                style={{ zIndex: 2 }}
              >
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View style={[styles.itemContainer, { width: "40%" }]}>
                    <Text style={styles.bikePrice}>Available bikes :</Text>
                    <Text style={styles.bikeName}>
                      {selectedStation?.Bicycles.length}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => moveToSelectedStation(selectedStation)}
                    style={[
                      styles.itemContainer,
                      { width: "42%", backgroundColor: "#0AFF90" },
                    ]}
                  >
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Text style={[styles.bikeName]}>Start Navigation</Text>
                      <Ionicons name="navigate" color="white" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
                <BottomSheetFlatList
                  data={selectedStation?.Bicycles}
                  keyExtractor={(item) => item?.id}
                  renderItem={renderItem}
                  contentContainerStyle={styles.contentContainer}
                />
              </BottomSheet>
            )}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "grey",
    borderWidth: 1,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    position: "absolute",
    top: 100,
    left: 50,
    right: 50,
    backgroundColor: "white",
    paddingHorizontal: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
  locationButton: {
    position: "absolute",
    top: 50,
    backgroundColor: "blue",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "blue",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  scanButton: {
    position: "absolute",
    bottom: 90,
    left: "56%",
    transform: [{ translateX: -50 }],
    backgroundColor: "black",
    borderRadius: 20,
    paddingVertical: 5,
    paddingLeft: 8,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  rentingStatus: {
    position: "absolute",
    bottom: 90,
    left: 0,
    backgroundColor: "black",
    borderRadius: 0,
    paddingVertical: 5,
    paddingLeft: 8,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  scannerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006241",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "black"
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    height: height / 2,
    width: width,
  },
  modalButtonYes: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonNo: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  paymentButton: {
    backgroundColor: "rgba(120, 120, 120, 0.4)",
    shadowColor: "#000",
    shadowOffset: {
      height: 30,
      width: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#808090",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#808080",
    padding: 15,
    width: 100,
    height: 60,
    borderRadius: 90,
  },
  paymentButtonText: {
    color: "black",
    fontWeight: "bold",
    // fontSize: 26,
    // marginHorizontal: 30,
    // textAlign: "left",
    // fontWeight: "bold",
    fontSize: 20,
  },
  activePaymentButton: {
    backgroundColor: "#0AFF90",
  },
  buttomSheetContainer: {
    flex: 1,
    paddingTop: 400,
    position: "absolute",
    bottom: 0,
    width,
    marginBottom: 48,
  },
  contentContainer: {
    backgroundColor: "white",
    // backgroundColor: "rgba(120, 120, 120, 0.4)"
  },
  itemContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    // marginBottom: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  bikeImage: {
    width: 100,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  bikeDetails: {
    flex: 1,
  },
  bikeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bikePrice: {
    fontSize: 14,
    color: "gray",
  },
});
