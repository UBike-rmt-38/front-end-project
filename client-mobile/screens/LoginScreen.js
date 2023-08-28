import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setIsSignedIn } from "../stores/reducers/authSlice";
import { saveAccessToken } from "../helpers/secureStoreAction";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../constants/mutation";

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
      if (response.errors) throw response.errors;
      else {
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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
      <View>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.regularText}>Don't have an account?</Text>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={navigateToSignUp}
        >
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
  regularText: {
    fontSize: 20,
    fontWeight: "normal",
  },
  signUpText: {
    color: "#4FFFB0",
    fontSize: 20,
    fontWeight: "800",
  },
});
