import React from "react";
import { Marker } from "react-native-maps";

export default function MapsPin({ coordinate, title }) {
  return <Marker coordinate={coordinate} title={title} />;
}
