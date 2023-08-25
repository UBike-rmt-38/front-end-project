import React from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
// import styles from '../styles/style'
const image = require('../assets/background.png')

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.box}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 1)', 'transparent']}
            style={styles.inline_box}
          >
            <View style={styles.inline_box}>

              <View style={styles.item_box}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.input_container}>
                  <TextInput style={styles.input} />
                </View>
              </View>
              <View style={styles.item_box}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.input_container}>
                  <TextInput style={styles.input} />
                </View>
              </View>
              <View style={styles.item_box}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.input_container}>
                  <TextInput style={styles.input} />
                </View>
              </View>
              <View style={styles.item_box}>
                <TouchableOpacity style={styles.btn_div}>
                  <Text style={styles.btn}>Sign Up</Text>
                  <Text style={[styles.btn, { fontSize: 40 }]}>&#62;</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end"
  },
  label: {
    color: 'white',
    fontSize: 25,
    lineHeight: 84,
    fontWeight: 'bold',
    marginLeft: 45
  },
  box: {
    alignItems: "center",
    marginBottom: 10
  },
  inline_box: {
    borderRadius: 50,
    height: 600,
    backgroundColor: 'rgba(120, 120, 120, 0.4)',
    width: 480,
    shadowColor: '#000',
    shadowOffset: {
      height: 30,
      width: 30
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#808090"
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffff",
    width: 400,
    borderRadius: 10,
    fontSize: 20
  },
  input_container: {
    flex: 1,
    alignItems: "center"
  },
  item_box: {
    marginVertical: 30
  },
  btn_div: {
    marginTop: 40,
    height: 60,
    width: '80%',
    marginHorizontal: 50,
    borderRadius: 30,
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#808080",
    borderWidth: 1,
    flexDirection: "row"
  },
  btn: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 30
  }
})