import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import { GET_USERS_DETAIL } from "../constants/query";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { setIsSignedIn } from "../stores/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_USERS_DETAIL);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data.getUsersDetails;

  const handleTransaction = () => {
    navigation.navigate("Transaction");
  };
  const handleHistory = () => {
    navigation.navigate("History");
  };
  const handleEdit = () => {
    navigation.navigate("ChangePassword");
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      dispatch(setIsSignedIn(false));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView style={[styles.container, styles.bg_dark]}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.profile_box}>
            <View style={styles.profileContent}>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profile_text}>Hi, {user.username}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/dummy_user.png")}
                  style={styles.image}
                />
              </View>
              <TouchableOpacity style={styles.btn} onPress={handleEdit}>
                <Text style={styles.btnText}>Change Password</Text>
              </TouchableOpacity>
              <View style={styles.profile_data}>
                <View style={styles.profileDataContainer}>
                  <Text style={styles.profile_distance}>Last Ride</Text>
                </View>
                <View style={styles.profileDataSeparator}></View>
                <View style={styles.profileDataContainer}>
                  <Text style={styles.profile_distance_text}>
                    {user.Rentals.travelledDistance}
                  </Text>
                  <Text style={styles.profile_distance}>Total Distance</Text>
                </View>
              </View>
            </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoHeading}>Fullname</Text>
              <Text style={styles.infoText}>{user.username}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoHeading}>Email</Text>
              <Text style={styles.infoText}>{user.email}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoHeading}>Phone</Text>
              <Text style={styles.infoText}>0987654321</Text>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceHeading}>My Balance</Text>
              <View style={styles.balanceContent}>
                <Text style={styles.infoText}>Rp. {user.balance}</Text>
                <TouchableOpacity>
                  <Text style={styles.topUp}>TOP UP</Text>
                </TouchableOpacity>
              </View>
            <View style={styles.actionContainer}>
              <Text
                style={styles.actionText}
                onPress={handleHistory}
              >
                Rent history
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <Text
                style={styles.actionText}
                onPress={handleTransaction}
              >
                Transaction
              </Text>
            </View>
            <View style={styles.logoutContainer}>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.btnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#322D3A",
  },
  scrollView: {
    flex: 1,
  },
  btn: {
    backgroundColor: "#80FFCC",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  profile_box: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  profileContent: {
    alignItems: "center",
  },
  profileTextContainer: {
    marginBottom: 30,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#80FFCC",
  },
  profile_text: {
    color: "#80FFCC",
    fontSize: 40,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 250 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#80FFCC",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  profile_data: {
    flexDirection: "row",
    marginTop: 30,
    paddingVertical: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#80FFCC",
  },
  profileDataContainer: {
    alignItems: "center",
  },
  profileDataSeparator: {
    paddingHorizontal: 40,
  },
  profile_distance_text: {
    color: "#80FFCC",
    fontSize: 25,
  },
  profile_distance: {
    fontSize: 25,
    color: "white",
  },
  balanceContainer: {
    marginTop: 30,
  },
  balanceHeading: {
    color: "#80FFCC",
    fontSize: 20,
  },
  balanceContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  balanceAmount: {
    color: "white",
    fontSize: 20,
  },
  topUp: {
    fontSize: 15,
    backgroundColor: "#80FFCC",
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 20,
  },
  infoContainer: {
    marginTop: 30,
  },
  infoHeading: {
    color: "#80FFCC",
    fontSize: 20,
  },
  infoText: {
    color: "white",
    fontSize: 17,
    marginTop: 2,
    marginLeft: 10
  },
  actionContainer: {
    marginTop: 30,
  },
  actionText: {
    color: "#80FFCC",
    fontSize: 20,
  },
  logoutContainer: {
    marginTop: 50,
  },
  logoutButton: {
    backgroundColor: "#FF8066",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    paddingHorizontal: 10
  },
});
