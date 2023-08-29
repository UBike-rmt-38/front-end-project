import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USERS_DETAILS } from '../constants/query';
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TransactionScreen(){

const auth = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('access_token'); 
    return {
        headers: {
        ...headers,
        Authorization: token,
        },
    };
    });
  const { loading, error, data } = useQuery(GET_USERS_DETAILS);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const { Transactions } = data.getUsersDetails;

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Transaction History:</Text>
      <FlatList
        data={Transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Action: {item.action}</Text>
            <Text>Amount: {item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

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
    padding: 8,
    marginBottom: 8,
  },
});



