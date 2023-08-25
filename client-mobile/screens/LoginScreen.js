import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Scanner from "../components/Scanner";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  //ini scanner
  const [showScanner, setShowScanner] = useState(false);
  const openScanner = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
    }
    // else {
    //   navigation.navigate('Home');
    // }
    console.log(email);
    console.log(password);
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="grey"
            />
          </TouchableOpacity>
        </View>
        <TouchableHighlight style={styles.button} onPress={openScanner}>
          <Text style={styles.buttonText}>Scan Here</Text>
        </TouchableHighlight>

        <Modal visible={showScanner} animationType="slide" transparent={false}>
          <View style={styles.scannerModal}>
            <Scanner onCloseScanner={closeScanner} />
          </View>
        </Modal>
        <TouchableHighlight style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={navigateToSignUp}>
        <Text>Sign up</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#006241",
  },

  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  eyeIcon: {
    position: "absolute",
    top: 8,
    right: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#006241",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 80,
    borderRadius: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  scannerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006241",
  },
});
