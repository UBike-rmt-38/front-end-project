import HomeScreen from "../screens/HomeScreen";
import AuthStackNavigator from "./AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AuthStackNavigator/>
      {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}

    </NavigationContainer>
  );
}
