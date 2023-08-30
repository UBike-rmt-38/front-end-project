
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapsScreen from "../screens/MapsScreen";  

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: "black",
          borderRadius: 0,
          height: 60,
        },
        tabBarActiveTintColor: "#4FFFB0",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          
          headerShown: false,
          tabBarLabel: "Home",
          tabBarShowLabel: false,

        }}
      />
      <Tab.Screen
        name="RentTab"
        component={MapsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          
          headerShown: false,
          tabBarLabel: "Rent",
          tabBarShowLabel: false,

        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarShowLabel: false,

        }}
      />
    </Tab.Navigator>
  );
};