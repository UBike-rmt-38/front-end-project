import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Location from 'expo-location';


export default function HomeScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);

  const fetchStations = async () => {
    try {
      const response = await fetch('http://192.168.0.56:3000/stations');
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000;  
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  useEffect(() => {
    fetchStations();
  }, []);

  if (!userLocation) {
    return <Text>Loading...</Text>;
  }

  const nearbyStations = stations.filter(station => {
    const distance = calculateDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      station.latitude,
      station.longitude
    );
    return distance !== null && distance < 900;  //ganti distancenya bebas
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearest Stations:</Text>
      <FlatList
        data={nearbyStations}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.stationContainer}>
            <Text style={styles.stationName}>
              {item.name}
            </Text>
            <Text style={styles.stationDistance}>
              {calculateDistance(
                userLocation.coords.latitude,
                userLocation.coords.longitude,
                item.latitude,
                item.longitude
              ).toFixed()}m
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stationName: {
    fontSize: 16,
  },
  stationDistance: {
    fontSize: 14,
    color: '#666',
  },
});

// import React from "react";
// import { View, Text } from "react-native";

// export default function HomeScreen({ navigation }) {

//   return (
//     <View>
//       <Text>Welcome to HomeScreen!</Text>
//     </View>
//   );
// }

