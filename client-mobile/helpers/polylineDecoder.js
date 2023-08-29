import polyline from "@mapbox/polyline";

export default function decodePolyline(encodedPolyline) {
  const decodedCoordinates = polyline.decode(encodedPolyline);
  return decodedCoordinates;
}