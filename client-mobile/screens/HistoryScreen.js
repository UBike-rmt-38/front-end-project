import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USERS_DETAILS, GET_BICYCLES } from "../constants/query";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function HistoryScreen() {
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS_DETAILS);
  const {
    loading: bicyclesLoading,
    error: bicyclesError,
    data: bicyclesData,
  } = useQuery(GET_BICYCLES);

  if (usersLoading || bicyclesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1AD3C1" />
      </View>
    );
  }

  if (usersError || bicyclesError) {
    return <Text>Error: {usersError?.message || bicyclesError?.message}</Text>;
  }

  const { Rentals } = usersData.getUsersDetails;
  const bicycles = bicyclesData.getBicycles;

  const getBicycleInfo = (bicycleId) => {
    const bicycle = bicycles.find((bicycle) => bicycle.id === bicycleId);
    return bicycle
      ? { name: bicycle.name, imageURL: bicycle.imageURL }
      : { name: "Unknown Bicycle", imageURL: "" };
  };

  const TabContent = ({ data, status }) => (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const bicycleInfo = getBicycleInfo(item.BicycleId);

          return (
            <View style={styles.itemContainer}>
              <View style={styles.contentContainer}>
                <Text style={styles.bicycleName}>{bicycleInfo.name}</Text>
                <Text>
                  Distance: {item.travelledDistance?.toLocaleString()} m
                </Text>
                <Text>Total: Rp.{item.totalPrice?.toLocaleString("id-ID")}</Text>
                <Text>{item.transaction}</Text>
                <Text
                style={[
                  styles.status,
                  { color: item.status ? "#4CAF50" : "#3498db" },
                ]}
              >
                {item.status ? "Complete" : "Ongoing"}
              </Text>
              </View>
              <Image
                source={{ uri: bicycleInfo.imageURL }}
                style={styles.bicycleImage}
                resizeMode="contain"
              />
            </View>
          );
        }}
      />
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPressColor: "transparent", // <<<< PR
        tabBarLabelStyle: { paddingTop: 50, fontSize: 14, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#28E9C3", height: 100 },
        tabBarIndicatorStyle: { backgroundColor: "#07A384" },
      }}
    >
      <Tab.Screen name="Ongoing">
        {() => {
          const ongoingRentals = Rentals.filter((item) => !item.status);
          return ongoingRentals.length > 0 ? (
            <TabContent data={ongoingRentals} status="Ongoing" />
          ) : (
            <Messages status="Ongoing" />
          );
        }}
      </Tab.Screen>

      <Tab.Screen name="Complete">
        {() => {
          const completedRentals = Rentals.filter((item) => item.status);
          return completedRentals.length > 0 ? (
            <TabContent data={completedRentals} status="Complete" />
          ) : (
            <Messages status="Complete" />
          );
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const Messages = ({ status }) => (
  <View style={styles.messagesContainer}>
    <Text style={styles.messagesText}>
      You haven't any {status === "Ongoing" ? "ongoing" : "completed"} rent!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272b2a",
  },
  itemContainer: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#272b2a'
  },
  bicycleName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
  },
  bicycleImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BBC6C4",
  },
  messagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messagesText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#",
  },
});
