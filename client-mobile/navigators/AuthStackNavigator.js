import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator
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
      {/* letakkan screen yang sudah kalian buat di sini */}
    </Stack.Navigator>
  );
}
