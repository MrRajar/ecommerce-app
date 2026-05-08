import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../features/home/Home/Home';
import Wishlist from '../features/wishlist/Wishlist';
import Search from '../features/search/Search';
import Cart from '../features/cart/cart/Cart';
import Settings from '../features/setting/Settings';
const Tab = createBottomTabNavigator();

const COLORS = {
  active: '#EB3030',
  inactive: '#000000',
  white: '#FFFFFF',
  border: '#EEEEEE',
};

function CenterCartButton({ children, onPress, accessibilityState }: any) {
  const focused = accessibilityState?.selected;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.cartButtonWrapper}
    >
      <View style={[styles.cartButton, focused && styles.cartButtonActive]}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        // ✅ cleaner behavior when leaving tab (helpful if later nested stacks added)
        popToTopOnBlur: true,

        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,

        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: styles.tabIcon,

        tabBarIcon: ({ color, focused }) => {
          let iconName: string = 'home-outline';
          let size = 22;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Wishlist') {
            iconName = 'heart-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
            size = 26;

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? COLORS.active : COLORS.inactive}
              />
            );
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('TrendingProduct');
          },
        })}
        options={{ tabBarLabel: 'Wishlist' }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: '',
          tabBarButton: (props) => <CenterCartButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{ tabBarLabel: 'Search' }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    height: Platform.OS === 'ios' ? 78 : 70,
    backgroundColor: COLORS.white,

    borderTopWidth: 1,
    borderTopColor: COLORS.border,

    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },

    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 14 : 8,
  },

  tabItem: {
    paddingTop: 2,
  },

  tabIcon: {
    marginTop: 2,
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },

  cartButtonWrapper: {
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#EFEFEF',

    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  cartButtonActive: {
    borderColor: '#FFD5DF',
  },
});