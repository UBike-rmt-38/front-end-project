import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USERS_DETAILS, GET_BICYCLES } from '../constants/query';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function HistoryScreen(){
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS_DETAILS);
  const { loading: bicyclesLoading, error: bicyclesError, data: bicyclesData } = useQuery(GET_BICYCLES);

  if (usersLoading || bicyclesLoading) {
    return <Text>Loading...</Text>;
  }

  if (usersError || bicyclesError) {
    return <Text>Error: {usersError?.message || bicyclesError?.message}</Text>;
  }

  const { Rentals } = usersData.getUsersDetails;
  const bicycles = bicyclesData.getBicycles;

  const getBicycleName = (bicycleId) => {
    const bicycle = bicycles.find((bicycle) => bicycle.id === bicycleId);
    return bicycle ? bicycle.name : 'Unknown Bicycle';
  };

  const CompleteTab = () => (
    <View style={styles.container}>
      <FlatList
        data={Rentals.filter((item) => !item.status)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Bicycle: {getBicycleName(item.BicycleId)}</Text>
            <Text>Order: Complete</Text>
            <Text>Distance: {item.travelledDistance}</Text>
            <Text>Total Price: {item.totalPrice}</Text>
            <Text>Transaction: {item.transaction}</Text>
          </View>
        )}
      />
    </View>
  );

  const OngoingTab = () => (
    <View style={styles.container}>
      <FlatList
        data={Rentals.filter((item) => item.status)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Bicycle: {getBicycleName(item.BicycleId)}</Text>
            <Text>Order: Ongoing</Text>
            <Text>Distance: {item.travelledDistance}</Text>
            <Text>Total Price: {item.totalPrice}</Text>
            <Text>Transaction: {item.transaction}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Ongoing" component={OngoingTab} />
      <Tab.Screen name="Complete" component={CompleteTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 8,
    borderRadius: 20,
  },
});

