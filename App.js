import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import Home from "./screens/Home";
import CommentsScreen from "./screens/CommentsScreen";
import MapScreen from "./screens/MapScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{ headerShown: true }}
        />
        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: true }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
