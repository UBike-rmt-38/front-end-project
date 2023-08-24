import React from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/style'
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