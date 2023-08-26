import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import AuthStackNavigator from "./navigators/AuthStackNavigator";
import { Provider } from "react-redux";
import { store } from "./stores";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
