import { toastConfig } from "../configToast";
import HomeScreen from "../screens/HomeScreen";
import AuthStackNavigator from "./AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message'

export default function AppNavigator() {
  return (
    <>
      <NavigationContainer>
        <AuthStackNavigator />
        {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}

      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
