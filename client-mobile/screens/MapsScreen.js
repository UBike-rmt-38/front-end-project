import { useEffect, useState, useRef } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapsPin from "../components/MapsPin";
import Scanner from "../components/Scanner";
import * as Location from 'expo-location';  
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import Auth from "../hooks/Auth";


export default function MapsScreen() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showFlatList, setShowFlatList] = useState(false);
  const mapRef = useRef(null);
  const navigation = useNavigation()

  const openScanner = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  const userLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        });
        console.log(latitude);
        console.log(longitude);
      }
    } catch (error) {
      alert("Error getting current location: " + error.message);
    }
  };

  const { isSignedIn, setIsSignedIn } =  Auth()
  
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    setIsSignedIn(false)
    navigation.navigate('Login');
  };
  
// const apiUrl = `http://192.168.0.56:3000/stations`;
const apiUrl = `http://localhost:3000/stations`;

  useEffect(() => {
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setStations(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredStations = search
    ? stations.filter((station) =>
        station.name.toLowerCase().includes(search.toLowerCase())
      )
    : stations;

  const listStations = (station) => {
    setSearch(station.name);
    mapRef.current.animateToRegion({
      latitude: station.latitude,
      longitude: station.longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    });
    
    setShowFlatList(false);
  }
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
        <TouchableOpacity style={styles.locationButton} onPress={userLocation}>
          <Text style={styles.buttonText}>Go to My Location</Text>
        </TouchableOpacity>
    </View>
      
    {showFlatList && (
      <View style={styles.flatListContainer}>
        <Text>"{search}"</Text>
        <FlatList
          data={filteredStations.slice(0, 4)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => listStations(item)}>
              <Text>{item.name}</Text>
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
        {filteredStations.map((station) => (
          <MapsPin
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={openScanner}>
        <Text style={styles.buttonText}>Scan Here</Text>
      </TouchableOpacity>

      <Modal visible={showScanner} animationType="slide" transparent={false}>
        <View style={styles.scannerModal}>
          <Scanner onCloseScanner={closeScanner} />
        </View>
      </Modal>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.button}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 80,
    left: 40,
    right: 40,
    paddingHorizontal: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: 'grey',  
    borderWidth: 1,         
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    position: 'absolute',
    top: 125,   
    left: 50,
    right: 50,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',  
    borderWidth: 1,      

  },
  locationButton: {
    position: 'absolute',  
    top: 50,  
    backgroundColor: 'blue',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',  
    bottom: 50,  
    backgroundColor: 'blue',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scannerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006241',  
  },
});
