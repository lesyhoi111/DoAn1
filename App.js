import React, { createContext, useState, useEffect } from 'react';
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
import IngredientSale from './screens/components/IngredientSale'
import TapRecipe from './screens/components/TapRecipe'
import TapRecipeStore from './screens/components/TapRecipeStore'
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from './firebase/index'
import store from "./screens/components/Redux/Store";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let listdata=[];
let shop=[];
const Stack = createNativeStackNavigator();
export const MyContext = createContext();

function App(props) {

    // const [listdata, setListdata] = useState();
    // const [shop, setShop] = useState();
    useEffect(() => {
        getData();
        getListShop()
    }, [])
    const getData = async () => {
        console.log("getdata")
        // setLoading(true)
        try {
            const q = query(collection(db, "THUCPHAM"),
            );
            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                listdata.push({ id: doc.id, ...doc.data() });
                console.log(doc.id)
            });
            // setTimeout(() => {
            //     // setListdata(results)
            //     // console.log(results)
            //     console.log(listdata)
            // },5000)
            // console.log(listdata)
        } catch (error) {
            console.error(error);
        }

    };
    const getListShop = async () => {
        try {
            const thucphamRef = collection(db, "CUAHANG");
            const thucphamQuery = query(thucphamRef,);
            const querySnapshot = await getDocs(thucphamQuery);
            const results = [];
            querySnapshot.forEach((doc) => {
              shop.push({ id: doc.id, ...doc.data() });
          });
        //   setTimeout(() => {
        //     // setShop(results)
        //     console.log(shop)
        // },5000)
        // console.log(shop)
          } catch (error) {
            console.error(error)
          }
      }
    

    return (
        <Provider store={store}>
            <MyContext.Provider value={{ listdata, shop }}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="BoardingSlider" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="BoardingSlider" component={BoardingSlider} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="UITab" component={UITab} />
                        <Stack.Screen name="Cart" component={Cart} />
                        <Stack.Screen name="ProductDetail" component={ProductDetail} />
                        <Stack.Screen name="Store" component={Store} />
                        <Stack.Screen name="DetailStore" component={DetailStore} />
                        <Stack.Screen name="Order" component={Order} />
                        <Stack.Screen name="IngredientSale" component={IngredientSale} />
                        <Stack.Screen name="TapRecipe" component={TapRecipe} />
                        <Stack.Screen name="TapRecipeStore" component={TapRecipeStore} />
                    </Stack.Navigator>
                </NavigationContainer>
            </MyContext.Provider>
        </Provider>
    )
};
export default App;