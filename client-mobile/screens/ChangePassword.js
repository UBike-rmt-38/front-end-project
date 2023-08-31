import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import { CHANGE_PASSWORD } from '../constants/mutation';
import { LinearGradient } from "expo-linear-gradient";
import { useMutation } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { response } from 'express';
const { height, width } = Dimensions.get("screen");

export default function ChangePassword({ navigation }) {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changeNewPassword, { error }] = useMutation(CHANGE_PASSWORD)
    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Wrong Input'
        });
    }
    const successToast = () => {
        Toast.show({
            type: 'success',
            text1: 'success',
            text2: 'password has been changed'
        });
    }
    const handleChangePassword = async () => {
        try {
            const response = await changeNewPassword({
                variables: { oldPassword, newPassword }
            })
            console.log(response, 'ini adalah respon');
            if (error) {
                console.log(error);
                showToast();
            }
            else {
                navigation.goBack();
            }
        } catch (err) {
            console.log(err, '<<<<<<<<<<<<');
            showToast()
        }
    }
    return (
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <LinearGradient
                    colors={["rgba(0, 0, 0, 1)", "transparent"]}
                    style={styles.inline_box}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", maxHeight: 250, borderRadius: 15, opacity: 0.7, padding: 10 }}>
                        <View  >
                            <TextInput
                                style={styles.input}
                                placeholder="Old Password"
                                secureTextEntry={!showOldPassword}
                                value={oldPassword}
                                onChangeText={setOldPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowOldPassword(!showOldPassword)}
                            >
                                <FontAwesome
                                    name={showOldPassword ? "eye-slash" : "eye"}
                                    size={20}
                                    color="grey"
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                secureTextEntry={!showNewPassword}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                <FontAwesome
                                    name={showNewPassword ? "eye-slash" : "eye"}
                                    size={20}
                                    color="grey"
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleChangePassword} >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    input: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "white",
        width: 270
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
    button: {
        backgroundColor: "#006241",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 80,
        borderRadius: 40,
    },
    inline_box: {
        borderRadius: 50,
        height: 500,
        backgroundColor: "rgba(120, 120, 120, 0.4)",
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
        marginTop: 500
    }
});
