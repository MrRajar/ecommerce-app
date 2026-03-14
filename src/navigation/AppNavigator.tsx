import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../splash/Splash";
import Onboarding from "../onboarding/Onboarding";
import Login from "../features/auth/Login/Login";
import Signup from "../features/auth/Signup/Signup";
import ForgotPassword from "../features/auth/ForgotPassword/ForgotPassword";
import Welcome from "../features/Welcome/Welcome";
import TabNavigator from "./TabNavigator";
import TrendingProduct from "../features/trendingproduct/trendingproduct/TrendingProduct";
import ProductDetail from "../features/productdetail/productdetail/ProductDetail";
import Cart from "../features/cart/cart/Cart";
import PlaceOrder from "../features/placeorder/PlaceOrder";
import Shipping from "../features/shipping/Shipping";
import Successfully from "../features/successfully/Successfully";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
  MainTabs: undefined;
  TrendingProduct: { filter?: 'deals' | 'trending' | 'all' };
  ProductDetail: { product: any };
  Cart: undefined;
  PlaceOrder: { product?: any };
  Shipping: { product?: any };
  Successfully: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Intro / Auth Flow */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />

      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />

      {/* Main Tabs */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
      />

      {/* Product / Listing Flow */}
      <Stack.Screen
        name="TrendingProduct"
        component={TrendingProduct}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          gestureEnabled: false,
        }}
      />

      {/* Checkout Flow - back only via header arrow */}
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrder}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Shipping"
        component={Shipping}
        options={{
          gestureEnabled: false,
        }}
      />

      {/* Success Modal */}
      <Stack.Screen
        name="Successfully"
        component={Successfully}
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false, // optional, global me already false hai
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;