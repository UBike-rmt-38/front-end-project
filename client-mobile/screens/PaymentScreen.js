//ini contoh aja buat tes switch pagenya

import { StyleSheet, Text, View } from "react-native";

export default function Payment(){
    return(
        <View style={styles.container}>
            <Text>
                Ini Payment
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      },
})