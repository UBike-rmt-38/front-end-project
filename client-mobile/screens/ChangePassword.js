import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import { CHANGE_PASSWORD } from '../constants/mutation';
import { useMutation } from '@apollo/client';

export default function ChangePassword({ navigation }) {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changeNewPassword, { error }] = useMutation(CHANGE_PASSWORD)
    const handleChangePassword = async () => {
        console.log(oldPassword, newPassword);
        try {
            const response = await changeNewPassword({
                variables: { oldPassword, newPassword }
            })
            if (response.errors) throw response.errors;
            // else {
            //     navigation.goBack();
            // }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white', flex: 1, justifyContent: "center", alignItems: "center", maxHeight: 250, borderRadius: 15, opacity: 0.7, padding: 10 }}>
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
