import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MapsScreen from "../screens/MapsScreen";

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTransparent: true,
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="Maps"
        component={MapsScreen}
        options={{ headerShown: false }}
      />
      {/* letakkan screen yang sudah kalian buat di sini */}
    </Stack.Navigator>
  );
}