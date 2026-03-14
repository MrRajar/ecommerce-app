import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "../ecommerce-mobile-app/src/features/auth/AuthContext/AuthContext";

const App = () => {
  return (
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
  );
};

export default App;