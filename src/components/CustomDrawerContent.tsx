import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppImages } from '../shared/utlis/AppImages';

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;

  const handleNavigation = (screenName: string) => {
    // Navigate to the target screen in the nested MainApp stack
    navigation.navigate('MainApp', { screen: screenName });
    // Explicitly close the drawer after selection
    navigation.closeDrawer();
  };

  const navItems = [
    { label: 'Home', icon: 'home-outline', screen: 'TabScreens' },
    { label: 'Trending', icon: 'flame-outline', screen: 'TrendingProduct' },
    { label: 'Cart', icon: 'cart-outline', screen: 'Cart' },
    { label: 'Settings', icon: 'settings-outline', screen: 'SettingsScreen' },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={AppImages.avatar} style={styles.profileImage} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Mehmood Rajar</Text>
            <Text style={styles.profileEmail}>mehmood@example.com</Text>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.navContainer}>
          {navItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() => handleNavigation(item.screen)}
            >
              <Ionicons name={item.icon} size={24} color="#333" />
              <Text style={styles.navLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Logout Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#EB3030" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileTextContainer: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  navContainer: {
    paddingTop: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  navLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 40,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#EB3030',
    marginLeft: 15,
    fontWeight: 'bold',
  },
});
