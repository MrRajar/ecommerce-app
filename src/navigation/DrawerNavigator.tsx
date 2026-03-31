import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './AppNavigator';

import TabNavigator from './TabNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import TrendingProduct from "../features/trendingproduct/trendingproduct/TrendingProduct";
import ProductDetail from "../features/productdetail/productdetail/ProductDetail";
import Cart from "../features/cart/cart/Cart";
import PlaceOrder from "../features/placeorder/PlaceOrder";
import Shipping from "../features/shipping/Shipping";
import Settings from "../features/setting/Settings";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TabScreens" component={TabNavigator} />
    <Stack.Screen name="TrendingProduct" component={TrendingProduct} options={{ gestureEnabled: false }} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ gestureEnabled: false }} />
    <Stack.Screen name="Cart" component={Cart} options={{ gestureEnabled: false }} />
    <Stack.Screen name="PlaceOrder" component={PlaceOrder} options={{ gestureEnabled: false }} />
    <Stack.Screen name="Shipping" component={Shipping} options={{ gestureEnabled: false }} />
    <Stack.Screen name="SettingsScreen" component={Settings} />
  </Stack.Navigator>
);

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.4)',
        drawerStyle: {
          width: '75%',
        },
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen name="MainApp" component={DrawerStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
