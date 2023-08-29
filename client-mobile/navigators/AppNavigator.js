import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import TransactionScreen from "../screens/TransactionScreen";
import MapsScreen from "../screens/MapsScreen";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* <AuthStackNavigator/> */}
      {/* <HistoryScreen /> */}
      <MapsScreen />
      {/* <TransactionScreen /> */}
      {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}
    </NavigationContainer>
  );
}
