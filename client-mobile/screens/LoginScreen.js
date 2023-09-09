import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { setIsSignedIn } from "../stores/reducers/authSlice";
import { saveAccessToken } from "../helpers/secureStoreAction";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../constants/mutation";
import Toast from "react-native-toast-message";
const image = require("../assets/background.png");
const { height, width } = Dimensions.get("screen");

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
        Toast.show({
          type: "success",
          text1: `Welcome, ${username}`,
          position: "top",
          visibilityTime: 2000,
        });
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
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.image}
      blurRadius={8}
    >
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
                      name={showPassword ? "eye" : "eye-slash"}
                      size={20}
                      color="grey"
                      style={{
                        position: "absolute",
                        right: width - 310,
                        top: height - 835,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.item_box}>
                <TouchableOpacity onPress={handleLogin} style={styles.btn_div}>
                  <Text style={styles.btn}>Sign In</Text>
                  <View>
                    <Ionicons name="chevron-forward" size={28} color="white" />
                  </View>
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
    paddingHorizontal: width - 380,
    marginTop: width - 180,
    width: width,
  },
  item_box: {
    marginVertical: width - 380,
  },
  blurring: {
    flex: 1,
    backgroundColor: "#808080",
    opacity: 0,
  },
  label: {
    color: "white",
    fontSize: 25,
    lineHeight: 84,
    fontWeight: "bold",
    marginLeft: width - 338,
    marginBottom: width - 380,
  },
  box: {
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: width - 400,
  },
  icon: {
    marginRight: 30,
  },
  inline_box: {
    borderRadius: 50,
    height: 500,
    backgroundColor: "rgba(120, 120, 120, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      height: 30,
      width: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#808090",
    width: width - 2,
  },
  input: {
    height: 50,
    margin: width - 430,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffff",
    width: "70%",
    borderRadius: 10,
    fontSize: 20,
  },
  input_container: {
    flex: 1,
    alignItems: "center",
  },
  btn_div: {
    marginTop: 40,
    height: 60,
    width: "72%",
    marginHorizontal: 50,
    borderRadius: 30,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#808080",
    borderWidth: 1,
    // paddingTop: 0,
    paddingRight: 10,
    flexDirection: "row"
  },
  btn: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 30,
  },
  eyeIcon: {
    position: "absolute",
    top: width - 468,
    right: width - 420,
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
    marginTop: 5,
  },
  regularText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  signUpText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#4FFFB0",
    textDecorationLine: "underline",
  },
});
