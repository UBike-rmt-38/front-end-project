import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USERS_DETAILS } from "../constants/query";
import { MaterialIcons } from "@expo/vector-icons";

export default function TransactionScreen() {
  const { loading, error, data } = useQuery(GET_USERS_DETAILS);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1AD3C1" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const { Transactions } = data.getUsersDetails;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>
      <FlatList
        data={Transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <View>
                <MaterialIcons name="payment" size={24} color="grey" />
                <Text style={styles.amount}>
                  Rp. {item.amount.toLocaleString("id-ID")}
                </Text>
                <Text
                  style={[
                    styles.statusText,
                    { color: item.action === "Payment" ? "red" : "green" },
                  ]}
                >
                  {item.action === "Payment" ? "PAYMENT" : "DEPOSIT"}
                </Text>
              </View>
              <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
            </View>
            <View style={styles.cardFooter}></View>
          </View>
        )}
      />
    </View>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return formattedDate;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  header: {
    backgroundColor: "#28E9C3",
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  cardContainer: {
    top: 30,
    backgroundColor: "#ECEFEF",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#BBC6C4",
    padding: 15,
    width: "90%",
    marginBottom: 12,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },
  cardFooter: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  statusText: {
    marginTop: 5,
    marginLeft: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#",
  },
});
