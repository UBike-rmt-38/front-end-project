import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
import * as Location from "expo-location";
import { Distance } from "../components/Distance";

export default function HomeScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);

  const apiUrl = `http://localhost:3000/stations`;

  const fetchStations = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
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
    fetchStations();
  }, []);

  if (!userLocation) {
    return <Text>Loading...</Text>;
  }

  const calculateDistance = (latitude, longitude) => {
    return Distance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      latitude,
      longitude
    );
  };

  const nearbyStations = stations.filter((station) => {
    const distance = calculateDistance(station.latitude, station.longitude);
    return distance !== null && distance < 900;
  });

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.header}>Nearest Stations:</Text>
          <FlatList
            data={nearbyStations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.stationContainer}>
                <Text style={styles.stationName}>{item.name}</Text>
                <Text style={styles.stationDistance}>
                  {calculateDistance(item.latitude, item.longitude).toFixed()} m
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  stationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  stationName: {
    fontSize: 16,
    color: "white", // Set text color to white
  },
  stationDistance: {
    fontSize: 14,
    color: "#666",
  },
});
