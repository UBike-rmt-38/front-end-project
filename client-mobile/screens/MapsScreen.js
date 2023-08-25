import { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapsPin from "../components/MapsPin";

export default function MapsScreen() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/stations")
      .then((response) => response.json())
      .then((data) => setStations(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredStations = search
    ? stations.filter((station) =>
        station.name.toLowerCase().includes(search.toLowerCase())
      )
    : stations;

  const handleStationPress = (station) => {
    setSearch(station.name);
    mapRef.current.animateToRegion({
      latitude: station.latitude,
      longitude: station.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.021,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search station by name"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        data={filteredStations.slice(0, 10)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStationPress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    marginTop: 50,
    borderWidth: 1,
    padding: 10,
  },
  map: {
    flex: 1,
  },
});
