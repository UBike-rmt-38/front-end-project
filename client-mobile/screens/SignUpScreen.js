import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../constants/mutation";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const image = require("../assets/background.png");

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleSignUp = async () => {
    try {
      console.log(username, email, password);
      const response = await createUser({
        variables: { username: username, email: email, password: password },
      });
      if (response.errors) throw response.errors;
      else {
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
                <Text style={styles.label}>Email</Text>
                <View style={styles.input_container}>
                  <TextInput
                    style={styles.input}
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
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
                <TouchableOpacity onPress={handleSignUp} style={styles.btn_div}>
                  <Text style={styles.btn}>Sign Up</Text>
                  {/* <Image source={require('../assets/arrow1.png')} style={styles.icon} /> */}
                  <View style={styles.icon}>
                    <FontAwesome5 name="greater-than" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginRight: 30
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
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
    flexDirection: "row",
  },
  btn: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 30,
  },
  eyeIcon: {
    position: "absolute",
    top: 8,
    right: 15,
  },
});
