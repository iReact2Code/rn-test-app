import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import UserCenterScreen from '../screens/UserCenterScreen';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { id: string };
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function MenuButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.headerBtn}
    >
      <Text>Menu</Text>
    </TouchableOpacity>
  );
}

function UserButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.getParent()?.navigate('UserCenter' as never)}
      style={styles.headerBtn}
    >
      <Text>User</Text>
    </TouchableOpacity>
  );
}

function renderMenuButton() {
  return <MenuButton />;
}

function renderUserButton() {
  return <UserButton />;
}

function StackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Shop',
          headerLeft: renderMenuButton,
          headerRight: renderUserButton,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: 'Product',
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

type UserStackParamList = {
  UserCenter: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParamList>();

function UserCenterStack() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="UserCenter"
        component={UserCenterScreen}
        options={{
          title: 'User Center',
          headerLeft: renderMenuButton,
        }}
      />
    </UserStack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Shop" component={StackGroup} />
      <Drawer.Screen name="UserCenter" component={UserCenterStack} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerBtn: { paddingHorizontal: 12 },
});
