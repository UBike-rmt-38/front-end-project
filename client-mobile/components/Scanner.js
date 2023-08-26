import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { useNavigation } from '@react-navigation/native'; 

export default function Scanner({ onCloseScanner }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // const navigation = useNavigation();  

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    getCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // navigation.navigate('Payment');
    onCloseScanner();
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

  };

  return (
    <View style={styles.container}>
      <View style={styles.barcodeContainer}>
        {hasCameraPermission === null ? (
          <Text>Requesting camera permission</Text>
        ) : hasCameraPermission === false ? (
          <Text>No access to camera</Text>
        ) : (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.barcodeScanner}
          />
        )}
      </View>
      <Button title="Close" onPress={onCloseScanner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeContainer: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#006241',

  },
  barcodeScanner: {
    ...StyleSheet.absoluteFillObject,
  },
});
