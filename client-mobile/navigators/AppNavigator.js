import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* <AuthStackNavigator/> */}
      {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}
      <HistoryScreen />
      {/* <HomeScreen /> */}
      {/* <LoginScreen /> */}
    </NavigationContainer>
  );
}
