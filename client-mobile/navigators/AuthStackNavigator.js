import { useEffect } from "react";  
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import MapsScreen from "../screens/MapsScreen";
import LoginScreen from "../screens/LoginScreen";
import * as SecureStore from 'expo-secure-store'; 
import { useSelector, useDispatch } from "react-redux";
import { setIsSignedIn } from "../stores/reducers/authSlice";
import { getValueFor } from "../helpers/secureStoreAction";
import HistoryScreen from "../screens/HistoryScreen";

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const getIsSignedIn = async () => {
    try {
      const access_token = await getValueFor("access_token")
      console.log(access_token)
      if (access_token) {
        dispatch(setIsSignedIn(true));
      } 
      else {
        dispatch(setIsSignedIn(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIsSignedIn();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTransparent: true,
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
    {isSignedIn ? (
      <>
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Maps"
        component={MapsScreen}
      /> */}
        <Stack.Screen
        options={{ headerShown: false }}
        name="History"
        component={HistoryScreen}
      />
      </>
    ) : (
      <>
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={OnboardingScreen}
        /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </>
    )}
    </Stack.Navigator>
  );
}
