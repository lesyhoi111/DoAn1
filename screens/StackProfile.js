import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {  ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile'
import MyAccount from './MyAccount'
import Address from './Address'
import AddAddress from './AddAddress'
import EditAdress from './EditAdress'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function StackProfile(props) {

    return (
        
            <Stack.Navigator initialRouteName="Profile"  screenOptions={{headerShown:false}}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="MyAccount" component={MyAccount} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="AddAddress" component={AddAddress} />
                <Stack.Screen name="EditAdress" component={EditAdress} />
            </Stack.Navigator>
        
    )
};
export default StackProfile;