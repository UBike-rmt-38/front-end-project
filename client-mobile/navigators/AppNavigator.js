import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import MapsScreen from "../screens/MapsScreen";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* <AuthStackNavigator/> */}
      <MapsScreen />
      {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}
    </NavigationContainer>
  )
}