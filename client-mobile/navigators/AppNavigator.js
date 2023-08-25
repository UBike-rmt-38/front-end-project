import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
      {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}
    </NavigationContainer>
  );
}
