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
        
    }
    const handleChangePassword = async () => {
        try {
            const response = await changeNewPassword({
                variables: { oldPassword, newPassword }
            })
            console.log(response, 'ini adalah respon');
            if (error) {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Failed To Change Password',
                });
            }
            else {
                Toast.show({
                    type: 'success',
                    text1: 'Password Has Been Changed',
                });
                navigation.goBack();
            }
        } catch (err) {
            console.log(err, '<<<<<<<<<<<<');
            Toast.show({
                type: 'error',
                text1: 'Failed To Change Password',
            });
        }
    }
    return (
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.image}
        >
            <View style={styles.container}>
                <View style={styles.box}>
                    <LinearGradient
                        colors={["rgba(0, 0, 0, 1)", "transparent"]}
                        style={styles.inline_box}
                    >
                        <View style={styles.inline_box}>
                            <View style={styles.item_box}>
                                <Text style={styles.label}>Old Password</Text>
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
                                            name={showOldPassword ? "eye" : "eye-slash"}
                                            size={20}
                                            color="grey"
                                            style={{ position: "absolute", right: width - 310, top: height - 835 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.item_box}>
                                <Text style={styles.label}>New Password</Text>
                                <View style={styles.input_container}>
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
                                            name={showNewPassword ? "eye" : "eye-slash"}
                                            size={20}
                                            color="gray"
                                            style={{ position: "absolute", right: width - 310, top: height - 835 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.item_box}>
                                <TouchableOpacity onPress={handleChangePassword} style={styles.btn_div}>
                                    <Text style={styles.btn}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: width - 380,
        marginTop: width - 110,
        width: width
    },
    item_box: {
        marginVertical: width - 380,
    },
    blurring: {
        flex: 1,
        backgroundColor: "#808080",
        opacity: 0.
    },
    eyeIcon: {
        top: 5,
        right: 30, // Adjust the horizontal position to your preference
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
        paddingHorizontal: width - 400
    },
    icon: {
        marginRight: 30
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
        width: width - 2
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
        fontWeight: "bold",
        color: '#4FFFB0',
        textDecorationLine: 'underline',
    },
});
