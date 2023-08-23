import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import styles from "../style";

export default function OnboardingScreen() {
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
        <TouchableHighlight>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableHighlight>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
