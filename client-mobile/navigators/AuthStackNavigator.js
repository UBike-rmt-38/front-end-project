import { useEffect, useState } from "react";  
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import MapsScreen from "../screens/MapsScreen";
import LoginScreen from "../screens/LoginScreen";
import * as SecureStore from 'expo-secure-store'; 
import Auth from "../hooks/Auth";
import HomeScreen from "../screens/HomeScreen";
import DrawerNavigation from "./DrawerNavigator";


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
      
    {/* {isSignedIn ? ( */}
    <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          // component={DrawerNavigation}
          component={HomeScreen}
        />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Maps"
        component={MapsScreen}
      /> */}
    {/* ) : ( */}
      {/* <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={OnboardingScreen}
        /> 
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </> */}
    {/* )} */}

    </Stack.Navigator>
  );
}
