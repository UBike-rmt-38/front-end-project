import React from "react";
import { Marker } from "react-native-maps";
const UBikeMapPin = require("../assets/UBike-map-pin.png")

export default function MapsPin({ coordinate, title, description, onPress }) {
  return <Marker coordinate={coordinate} title={title} description={description} image={UBikeMapPin} onPress={onPress} />;
}
