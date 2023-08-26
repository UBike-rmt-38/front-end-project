import { useEffect, useState } from "react";  
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import MapsScreen from "../screens/MapsScreen";
import LoginScreen from "../screens/LoginScreen";
import * as SecureStore from 'expo-secure-store'; 
import { useSelector, useDispatch } from "react-redux"
import { setIsSignedIn } from "../stores/reducers/authSlice";

const Stack = createNativeStackNavigator();

async function getValueFor(key) {
  return result = await SecureStore.getItemAsync(key);
}

export default function AuthStackNavigator() {
  // const [isSignedIn, setIsSignedIn] = useState(false);  
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const getIsSignedIn = async () => {
    try {
      const accessToken = await getValueFor("accessToken")
      console.log(accessToken)
      if (accessToken) {
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
      <Stack.Screen
        options={{ headerShown: false }}
        name="Maps"
        component={MapsScreen}
      />
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
