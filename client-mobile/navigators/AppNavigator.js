import HomeScreen from "../screens/HomeScreen";
import AuthStackNavigator from "./AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
NavigationContainer
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AuthStackNavigator/>
      {/* <HomeScreen /> */}
      {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}

    </NavigationContainer>
  );
}
