import { useEffect, useState, useRef } from "react";
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
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { setIsRenting, setIsSignedIn } from "../stores/reducers/authSlice";
import { useQuery } from "@apollo/client";
import { GET_STATIONS } from "../constants/query";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getValueFor } from "../helpers/secureStoreAction";
import axios from "axios";
import { ROUTES_API } from "../constants/baseURL";
import GOOGLE_API_KEY from "../constants/apiKey.js";
import decodePolyline from "../helpers/polylineDecoder";
import Modal from "react-native-modal";

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

  const getIsRenting = async () => {
    try {
      const renting_status = await getValueFor("renting_status");
      if (renting_status) {
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
    getUserLocation();
    updateNearestStations();
    getIsRenting();
  }, [stations]);

  const moveToSelectedStation = () => {
    if (userLocation && selectedStation && route.length > 0) {
      // Calculate the bounding box that contains both userLocation and selectedStation

      const animationDuration = 10; // Adjust animation duration as needed

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
  };

  const { data, loading, error } = useQuery(GET_STATIONS, {
    onCompleted: (data) => {
      setStations(data.getStations);
    },
    onError: (error) => {
      alert(`${error.message}`);
    },
  });

  const dispatch = useDispatch();

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
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        // const heading = location.coords.heading;
        setUserLocation(new AnimatedRegion({ latitude, longitude }));
        updateNearestStations(latitude, longitude);
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        });
      }
    } catch (error) {
      alert("Error getting current location: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      dispatch(setIsSignedIn(false));
    } catch (error) {
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
      // console.log(response.data.routes);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <TouchableHighlight
        style={{
          height: 50,
          width: 50,
          zIndex: 1,
          position: "absolute",
          right: 20,
          top: 140,
          backgroundColor: "white",
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

      {showFlatList && (
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
          />
        )}
        {filteredStations.map((station) => (
          <MapsPin
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
            description={station.address}
            onPress={() => openConfirmationModal(station)}
          />
        ))}
        {route && (
          <>
            {/* Menggambar Polyline menggunakan route */}
            <Polyline
              coordinates={route}
              strokeWidth={8}
              strokeColor="#00d4ff"
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
        <View style={styles.rentingStatus}>
          <Text style={{ color: "white" }}>renting</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.scanButton} onPress={openScanner}>
          <Text style={styles.buttonText}>Rent Bike</Text>
        </TouchableOpacity>
      )}

      <Modal visible={showScanner} animationType="slide" transparent={false}>
        <View style={styles.scannerModal}>
          <Scanner onCloseScanner={closeScanner} />
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {selectedStation && (
        <Modal
          isVisible={showConfirmationModal}
          swipeDirection={["down"]}
          onSwipeComplete={closeConfirmationModal}
          onBackButtonPress={closeConfirmationModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          avoidKeyboard={true}
          backdropColor="rgba(0, 0, 0, 0.5)"
          backdropOpacity={0}
          style={styles.modalContainer}
        >
          {/* <View style={styles.modalContainer}> */}
          <View style={styles.modalContent}>
            <View style={{ flexDirection: "row" }}>
              <Text>Move to {selectedStation?.name}?</Text>
              <TouchableOpacity
                style={styles.modalButtonYes}
                onPress={moveToSelectedStation}
              >
                <Text>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={closeConfirmationModal}
              >
                <Text>No</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={selectedStation.Bicycles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ alignItems: "center", marginVertical: 5 }}>
                  <Text>{item.name}</Text>
                  <Image
                    source={{ uri: item.imageURL }}
                    style={{ width: 300, height: 200 }}
                  />
                  <Text>Price: {item.price}</Text>
                </View>
              )}
            />
          </View>
          {/* </View> */}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 80,
    left: 40,
    right: 40,
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
    top: 125,
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
    bottom: 50,
    left: 125,
    backgroundColor: "blue",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rentingStatus: {
    position: "absolute",
    bottom: 50,
    left: 125,
    backgroundColor: "green",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    height: "50%",
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
});
