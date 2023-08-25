import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles/style';

import AppNavigator from "./navigators/AppNavigator";

export default function App() {
  return <AppNavigator />;
}
