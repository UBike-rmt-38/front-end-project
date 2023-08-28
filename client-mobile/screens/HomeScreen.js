import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { Distance } from "../components/Distance";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const navigation = useNavigation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
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
  const dayName = daysOfWeek[currentTime.getDay()];
  const day = currentTime.getDate();
  const month = currentTime.getMonth() + 1;

  const formattedDate = `${dayName}, ${day < 10 ? "0" + day : day}.${
    month < 10 ? "0" + month : month
  }`;

  const apiUrl = `http://192.168.0.56:3000/Stations`;

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

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return "Good Morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon!";
    } else {
      return "Good Night!";
    }
  };
  const images = [
    "https://png.pngtree.com/thumb_back/fw800/background/20210417/pngtree-world-bicycle-day-background-with-sun-rays-image_633284.jpg",
    "https://c8.alamy.com/comp/KNW1HR/lets-ride-bicycle-sport-transport-retro-banner-design-KNW1HR.jpg",
  ];

  const handleTopupPress = () => {
    navigation.navigate('TopUp');
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={require("../assets/Logo.png")}
          style={{
            height: 30,
            width: 30,
            borderColor: "yellow",
            borderWidth: 1,
            margin: 10,
          }}
        />
        <View style={styles.icon}>
          <Image
            source={{
              uri: "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
            }}
            style={styles.iconImage}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.greetingBox}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.timeText}>
            {currentTime.toLocaleTimeString()}
          </Text>
          <Text style={styles.greetingText}>{getGreeting()}</Text>
          <Text style={styles.navigationText}>Where do you want to go?</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.header}>Balance</Text>
            <Text style={styles.balance}>$100.00</Text>
            <TouchableOpacity style={styles.topUpButton} onPress={handleTopupPress}>
              <Text style={styles.buttonText}>Top Up</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.horizontalImage}
              />
            ))}
          </ScrollView>

          <View style={styles.overlay}>
            <Text style={styles.header}>Stations near me:</Text>
            <ScrollView>
              {nearbyStations.map((item) => (
                <View key={item.id} style={styles.stationContainer}>
                  <Text style={styles.stationName}>{item.name}</Text>
                  <Text style={styles.stationDistance}>
                    {` ${calculateDistance(
                      item.latitude,
                      item.longitude
                    ).toFixed()} m`}
                  </Text>
                  <Text style={styles.stationCategory}>
                    Available bikes: Kategori A
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flex: 1,
    padding: 16,
    borderRadius: 5,
  },
  box: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "50%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  topUpButton: {
    backgroundColor: "#199C61",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  },
  stationCategory: {
    fontSize: 14,
    color: "green",
    marginTop: 8,
  },
  greetingBox: {
    backgroundColor: "black",
    padding: 16,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  navigationText: {
    fontSize: 18,
    color: "white",
    marginLeft: 5,
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
    top: 20,
    right: 20,
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
  horizontalImage: {
    width: 200,
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
});
