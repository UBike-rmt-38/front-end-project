import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function OnboardingScreen({ navigation }) {
  const navigateToLogin = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/—Pngtree—green_luxury_silk_cloth_pattern_1324718.png")}
      />
      <View style={styles.gridRow}>
        <Image
          style={styles.image}
          source={require("../assets/Path-2-RF-768x576.png")}
        />
        <Text style={styles.textTitle}>EASY WAY TO FIND YOUR BICYCLE</Text>
        <Text style={styles.textDescription}>
          Providing cheap bicycle rental services and safe comfortable
          facilities
        </Text>
        <View style={styles.item_box}>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Get Started</Text>
            <View style={styles.icon}>
              <FontAwesome5 name="greater-than" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 334,
  },
  icon: {
    marginRight: 10
  },
  item_box: {
    marginVertical: 30,
  },
  btn: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    position: "absolute",
    height: 932,
    width: 430,
  },
  gridRow: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 60,
    marginHorizontal: 16,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#808080",
    padding: 15,
    width: 330,
    height: 60,
    borderRadius: 90,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
  },
  textDescription: {
    color: "white",
    fontWeight: "normal",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
  },
});
