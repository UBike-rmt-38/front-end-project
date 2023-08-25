import { Platform, View } from "react-native";
import styles from "../style";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function MapsScreen() {
  return (
    <View style={styles.container}>
      <MapView
        provider={Platform.OS == "android" ? PROVIDER_GOOGLE : ""}
        mapType={"standard"}
        style={styles.map}
        initialRegion={{
          latitude: -6.1754, // ini kordinat Jakarta Pusat
          longitude: 106.8272,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* letakkan custom marker kita ke dalam sini */}
        
      </MapView>
    </View>
  );
}
