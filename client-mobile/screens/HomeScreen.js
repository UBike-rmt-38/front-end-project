import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import Swiper from "react-native-swiper";

import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Distance } from "../components/Distance";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_STATIONS, GET_USERS_DETAIL } from "../constants/query";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const {
    loading: usersLoading,
    error: usersError,
    data,
    refetch: refetchUsers,
  } = useQuery(GET_USERS_DETAIL, {
    onCompleted: (data) => {
      setUser(data.getUsersDetails);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const {
    loading: stationsLoading,
    error: stationsError,
    data: stationsData,
    refetch: refetchStations,
  } = useQuery(GET_STATIONS);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refetchUsers()
      .then(() => refetchStations())
      .catch((error) => {
        console.error("Error refreshing data:", error);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } else {
      console.error("Permission to access location was denied");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = daysOfWeek[currentTime.getDay()];
  const day = currentTime.getDate();
  const monthName = monthNames[currentTime.getMonth()];

  const formattedDate = `${dayName}, ${
    day < 10 ? "0" + day : day
  } ${monthName}`;
  // console.log(monthName);
  useEffect(() => {
    refetchUsers();
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      } else {
        console.error("Permission to access location was denied");
      }
    };

    getUserLocation();
  }, []);

  if (usersLoading || stationsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1AD3C1" />
      </View>
    );
  }
  if (usersError || stationsError)
    return <Text>Error: {usersError?.message || stationsError?.message}</Text>;

  const calculateDistance = (lat, lon) => {
    if (userLocation) {
      const distance = Distance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        lat,
        lon
      );
      return distance;
    }
    return null;
  };

  const stations = stationsData.getStations || [];

  const nearbyStations = stations.filter((station) => {
    const distance = calculateDistance(station.latitude, station.longitude);
    return distance !== null && distance < 10000000000;
  });

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return "Good morning, ";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon, ";
    } else {
      return "Good night, ";
    }
  };

  const images = [
    "https://png.pngtree.com/thumb_back/fw800/background/20210417/pngtree-world-bicycle-day-background-with-sun-rays-image_633284.jpg",
    "https://c8.alamy.com/comp/KNW1HR/lets-ride-bicycle-sport-transport-retro-banner-design-KNW1HR.jpg",
  ];

  const handleTopupPress = () => {
    navigation.navigate("TopUp");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <ImageBackground
          source={require("../assets/background.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/Logo.png")}
              style={{
                height: 80,
                width: 80,
                marginTop: 20,
              }}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
              style={styles.icon}
            >
              <Image
                source={require("../assets/dummy_user.png")}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <View style={styles.greetingBox}>
              <Text style={styles.dateText}>{formattedDate}</Text>
              <Text style={styles.greetingText}>
                {getGreeting()}
                {user.username}!
              </Text>
              <Text style={styles.navigationText}>
                Where do you want to go?
              </Text>
            </View>
            <View style={styles.container}>
              <View style={styles.box}>
                <View style={styles.row}>
                  <Text style={styles.header}>Balance</Text>
                  <Text style={styles.balance}>
                    Rp. {user && user.balance
                      ? user.balance.toLocaleString("id-ID")
                      : 0}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.topUpButton}
                  onPress={handleTopupPress}
                >
                  <Text style={styles.buttonText}>Top Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.headerContainer}>
                <Text style={styles.header1}>Happening right now</Text>
              </View>
              <Swiper
                autoplay
                autoplayTimeout={5}
                showsPagination={false}
                loop
                height={120}
              >
                {images.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.images}
                  />
                ))}
              </Swiper>

              <View style={styles.nearStations}>
                <Text style={styles.header}>Stations near me:</Text>
                <ScrollView style={{ height: 300 }}>
                  {nearbyStations.map((item) => (
                    <View key={item.id} style={styles.stationContainer}>
                      <Text style={styles.stationName}>{item.name}</Text>
                      <Text style={styles.stationDistance}>
                        {` ${calculateDistance(
                          item.latitude,
                          item.longitude
                        ).toFixed()} m`}
                      </Text>
                      <Text style={styles.bicyclesCategory}>
                        <MaterialCommunityIcons
                          name="bike"
                          size={18}
                          color="black"
                        />{" "}
                        {item.Bicycles.length === 0
                          ? "No bikes available"
                          : item.Bicycles.map((bike) => bike.name).join(", ")}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  header1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  box: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    padding: 16,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balance: {
    fontSize: 29,
    color: "white",
  },
  topUpButton: {
    backgroundColor: "black",
    borderRadius: 30,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  nearStations: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flex: 1,
    padding: 16,
    borderRadius: 5,
    height: 230,
  },
  stationContainer: {
    marginBottom: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  stationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stationInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stationDistance: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
  bicyclesCategory: {
    fontSize: 12,
    color: "green",
    marginTop: 8,
    fontWeight: "bold",
    marginLeft: 5,
  },
  greetingBox: {
    backgroundColor: "black",
    padding: 16,
    height: "22%", //ganti aja ini
  },
  greetingText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginBottom: 5,
  },
  navigationText: {
    fontSize: 18,
    color: "white",
    top: 5,
  },
  avatarContainer: {
    backgroundColor: "black",
    height: "12%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
    top: 30,
    right: 25,
    borderWidth: 3,
    borderColor: "#3FDA9C",
    borderRadius: 40,
  },
  iconImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  images: {
    width: 350,
    height: 100,
    marginHorizontal: 5,
    marginBottom: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  dateText: {
    fontWeight: "bold",
    color: "white",
  },
  timeText: {
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  headerContainer: {
    marginVertical: 16,
  },
});
