import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Cart from './Cart'
import Store from './Store'
import ProductDetail from './ProductDetail'
import SearchScreen from './SearchScreen'
import StackProfile from './StackProfile'
import Color from '../src/Color' 

const Tab = createBottomTabNavigator();

function UITab() {
  return (
    <Tab.Navigator initialRouteName="Home"  screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        //tabBarLabelStyle:{fontSize:14, fontWeight:'bold'},
        tabBarActiveTintColor: Color.main,
        tabBarStyle:{
            backgroundColor:'white',
            height:45
        }
    }}>
      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={36} />
          ),
        }}/>

      <Tab.Screen name="SearchScreen" component={SearchScreen}  options={{
          tabBarLabel: 'SearchScreen',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={35} />
          ),
        }} />

      <Tab.Screen name="Cart" component={Cart}  options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart-plus" color={color} size={35} />
          ),
        }} />
        <Tab.Screen name="StackProfile" component={StackProfile} options={{
          tabBarLabel: 'StackProfile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={35} />
          ),
        }}/>
    </Tab.Navigator>
  );
}
export default UITab;