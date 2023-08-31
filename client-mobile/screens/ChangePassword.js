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
                <View style={styles.box}>
                    <LinearGradient
                        colors={["rgba(0, 0, 0, 1)", "transparent"]}
                        style={styles.inline_box}
                    >
                        <View style={styles.inline_box}>
                            <View style={styles.item_box} >
                                <Text style={styles.label}>New Password</Text>
                                <View style={styles.input_container}>
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
                            </View>
                            <View>
                                {/* <Text style={styles.label}>New Password</Text> */}
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
            </View>
        </ImageBackground >
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
        // paddingHorizontal: 50
        padding: 50
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
      },
    input: {
        height: 50,
        margin: 12,
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
    eyeIcon: {
        position: "absolute",
        top: 8,
        right: 15,
    },
    buttonText: {
        color: "#ffff",
        fontWeight: "bold",
        fontSize: 23,
        marginHorizontal: width - 370,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#ffff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 80,
        borderRadius: 40,
    },
    item_box: {
        marginVertical: width - 370,
    },
    inline_box: {
        borderRadius: 50,
        height: 500,
        backgroundColor: "rgba(120, 120, 120, 0.8)",
        shadowColor: "#000",
        shadowOffset: {
            height: 50,
            width: 30,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "#808090",
        width: width - 2,
        marginTop: 500
    },
    label: {
        color: "white",
        fontSize: 25,
        lineHeight: 84,
        fontWeight: "bold",
        marginLeft: "15%",
    },
    box: {
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: width - 450
    }
});
