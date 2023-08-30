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
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordInputContainer}>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
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
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    width: 150,
    height: 90,
    marginBottom: 20, 
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#076F59",
    borderRadius: 8,
    backgroundColor: "white",
    width: "90%"
  },
  passwordInputContainer: {
    position: "relative",
    
  },
  eyeIcon: {
    position: "absolute",
    top: 8,
    right: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 80,
    borderRadius: 40,
  },
  regularText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  signUpContainer: {
    marginTop: 20,
  },
  signUpText: {
    color: "#076F59",
    fontSize: 15,
    fontWeight: "bold",
  },
});