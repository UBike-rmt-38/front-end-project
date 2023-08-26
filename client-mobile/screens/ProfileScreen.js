import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />
      <SafeAreaView style={[styles.constainer, styles.bg_dark]}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.profile_box}>
            <View style={{ alignItems: "center" }}>
              <View style={{ marginBottom: 80, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#80FFCC' }}>
                <Text style={styles.profile_text}>Hi, Username</Text>
              </View>
              <View>
                <Image source={require('../assets/dummy_user.png')} style={styles.image} />
              </View>
              <View style={styles.profile_data}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.profile_distance_text}>123,000 km</Text>
                  <Text style={styles.profile_distance}>Last Ride</Text>
                </View>
                <View style={{ paddingHorizontal: 30 }}>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.profile_distance_text}>123,000 km</Text>
                  <Text style={styles.profile_distance}>Totally Rided</Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: '#80FFCC', fontSize: 20 }}>My Balance</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Rp 1000.000,00</Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 15, backgroundColor: '#80FFCC', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 20, fontWeight: "500" }}>TOP UP</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: '#80FFCC', fontSize: 20 }}>Fullname</Text>
              <Text style={{ color: 'white', fontSize: 20 }}>user full name</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: '#80FFCC', fontSize: 20 }}>Email</Text>
              <Text style={{ color: 'white', fontSize: 20 }}>User@mail.com</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: '#80FFCC', fontSize: 20 }}>Phone</Text>
              <Text style={{ color: 'white', fontSize: 20 }}>0987654321</Text>
            </View>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity style={styles.btn}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>EDIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  constainer: {
    flex: 1
  },
  btn: {
    backgroundColor: '#80FFCC',
    height: 40,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  profile_box: {
    paddingHorizontal: 110,
    paddingVertical: 50,
  },
  profile_data: {
    flexDirection: 'row',
    marginTop: 30,
    paddingVertical: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#80FFCC'
  },
  profile_distance_text: {
    color: '#80FFCC',
    fontSize: 25
  },
  profile_text: {
    color: '#80FFCC',
    fontSize: 40,
    fontWeight: 'bold'
  },
  profile_distance: {
    fontSize: 25,
    color: 'white'
  },
  profile_border: {
    borderWidth: 1,
    borderRadius: 50
  },
  bg_dark: {
    backgroundColor: '#272b2a'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: '#80FFCC'
  }
})