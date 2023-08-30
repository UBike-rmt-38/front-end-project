import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { setIsSignedIn } from "../stores/reducers/authSlice";
import { saveAccessToken } from "../helpers/secureStoreAction";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../constants/mutation";
const image = require("../assets/background.png");

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [login, { error }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogin = async () => {
    try {
      const response = await login({
        variables: { username: username, password: password },
      });
      console.log(response, "ini responde");
      if (response.errors) throw response.errors;
      else {
        console.log("ketrigrr di handle logini");
        await saveAccessToken(response.data.login);
        dispatch(setIsSignedIn(true));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Image
          source={require("../assets/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.box}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 1)", "transparent"]}
            style={styles.inline_box}
          >
            <View style={styles.inline_box}>
              <View style={styles.item_box}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.input_container}>
                  <TextInput
                    style={styles.input}
                    placeholder="username"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View style={styles.item_box}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.input_container}>
                  <TextInput
                    style={styles.input}
                    placeholder="password"
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
              </View>
              <View style={styles.item_box}>
                <TouchableOpacity onPress={handleLogin} style={styles.btn_div}>
                  <Text style={styles.btn}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUpContainer}>
                <Text style={styles.regularText}>Don't have an account?</Text>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={navigateToSignUp}
                >
                  <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item_box: {
    marginVertical: 30,
  },
  label: {
    color: "white",
    fontSize: 25,
    lineHeight: 84,
    fontWeight: "bold",
    marginLeft: 45,
  },
  box: {
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 55
  },
  icon: {
    marginRight: 30
  },
  inline_box: {
    borderRadius: 50,
    height: 600,
    backgroundColor: "rgba(120, 120, 120, 0.4)",
    width: "480",
    shadowColor: "#000",
    shadowOffset: {
      height: 30,
      width: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#808090",
    width: 490
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffff",
    width: 400,
    borderRadius: 10,
    fontSize: 20,
  },
  input_container: {
    flex: 1,
    alignItems: "center",
  },
  item_box: {
    marginVertical: 30,
  },
  btn_div: {
    marginTop: 40,
    height: 60,
    width: "80%",
    marginHorizontal: 50,
    borderRadius: 30,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#808080",
    borderWidth: 1,
    paddingTop: 10
  },
  btn: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 30,
  },
  eyeIcon: {
    position: "absolute",
    top: 25,
    right: 60,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    width: 150,
    height: 90,
    marginBottom: 20,
  },
  signUpContainer: {
    marginTop: 5
  },
  regularText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  signUpText: {
    marginTop: 5,
    fontSize: 20,
    color: '#ffff',
    textDecorationLine: 'underline',
  },
});