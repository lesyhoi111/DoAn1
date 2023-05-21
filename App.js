import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import UITab from './screens/UITab'
import Login from './screens/Login'
import BoardingSlider from './screens/BoardingSlider'
import Cart from './screens/Cart'
import ProductDetail from './screens/ProductDetail'
import Register from './screens/Register'
import DetailStore from './screens/DetailStore'
import Store from './screens/Store'
import Order from './screens/Order'
import History from './screens/History'
import store from "./screens/components/Redux/Store";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function App(props) {

    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BoardingSlider"  screenOptions={{headerShown:false}}>
                <Stack.Screen name="BoardingSlider" component={BoardingSlider} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="UITab" component={UITab} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="ProductDetail" component={ProductDetail}/>
                <Stack.Screen name="Store" component={Store} />
                <Stack.Screen name="DetailStore" component={DetailStore}/>
                <Stack.Screen name="Order" component={Order} />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
};
export default App;