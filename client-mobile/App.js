import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import AuthStackNavigator from './navigators/AuthStackNavigator'

export default function App() {
  return (
    <NavigationContainer>
      {/* ... Your app content here */}
      <AuthStackNavigator />
    </NavigationContainer>
  );
}
