import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

// ...

export const toastConfig = {
  success: ({ text1, ...rest }) => (
    <View style={ styles.successToast }>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({ text1, ...rest }) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

// ...
const styles = StyleSheet.create({
  successToast: {
    backgroundColor: '#4CAF50', // Customize the background color for success toasts
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    color: "#fff"
  },
  errorToast: {
    backgroundColor: '#FF5733', // Customize the background color for error toasts
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toastText: {
    color: 'white', // Customize the text color for toast messages
    fontSize: 16,
    fontWeight: 'bold',
  },
});

