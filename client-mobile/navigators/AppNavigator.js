import AuthStackNavigator from "./AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./BottomNavigation";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AuthStackNavigator/>
      {/* jika ada penambahan Navigator baru ( tabs / drawer / dll), letakkan di sini yaaa */}
      {/* <MyTabs /> */}
    </NavigationContainer>
  );
}
