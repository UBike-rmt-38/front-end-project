import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import AuthStackNavigator from './navigators/AuthStackNavigator'
import AppNavigator from './navigators/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* ... Your app content here */}
      <AppNavigator />
    </NavigationContainer>
  );
}
