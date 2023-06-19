import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {  ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile'
import MyAccount from './MyAccount'
import Address from './Address'
import AddAddress from './AddAddress'
import EditAdress from './EditAdress'
import History from './History'
import RecommendFood from './RecommendFood'
import RecommendFoodDetail from './RecommendFoodDetail'
import Voucher from './Voucher'
import ReviewPro from './ReviewPro'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function StackProfile(props) {

    return (
        
            <Stack.Navigator initialRouteName="Profile"  screenOptions={{headerShown:false}}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="AddAddress" component={AddAddress} />
                <Stack.Screen name="EditAdress" component={EditAdress} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Voucher" component={Voucher} />
                <Stack.Screen name="ReviewPro" component={ReviewPro} />
            </Stack.Navigator>
        
    )
};
export default StackProfile;