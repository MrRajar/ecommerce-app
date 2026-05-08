import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "../ecommerce-mobile-app/src/features/auth/AuthContext/AuthContext";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
          translucent={false}
          hidden={false}
        />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;