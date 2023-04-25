import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text,  View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image, Pressable, FlatList } from 'react-native';
import ItemIngredientSale from './ItemIngredientSale'
import color from '../../src/Color'
import DATA from './DATA'


function IngredientSale() {
    const DATA = [
        {
            id: '002',
            name: 'Cá hồi meomeomeo 1kg',
            image: 'https://canghaisan.com/wp-content/uploads/2020/10/103-1.jpg',
            percent: '15%',
            status: 'Pre-order',
            price: 90000,
            starpoint: 4,
            promotion: 'Mua 3 giao hàng 3'
        },
        {
            id: '003',
            name: 'Đậu gì chả biết alolaco 0.5kg nhưng cân bị hư',
            image: 'https://winnie.vn/wp-content/uploads/2016/10/1-2.jpg',
            percent: '5%',
            status: 'Sold-out',
            price: 10000,
            starpoint: 5,
            promotion: ''
        },
        {
            id: '001',
            name: 'Trứng gà HoHoFood 10 quả',
            image: 'https://www.verywellhealth.com/thmb/Pxi1hxHpUzBN9JwOz-WF2il_R58=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/uncover-hidden-egg-ingredients-1324275-primary-recirc-3cf777cca7044ee1992cc0a27d6449fa.jpg',
            percent: '10%',
            status: 'Available',
            price: 27000,
            starpoint: 4,
            promotion: 'Mua 3 tính tiền 4 giao 1'
        },
      ];
    
    return (
        
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',marginVertical:10,marginHorizontal:10}}>
                <Text style={styles.textHeader}>Hot Sale</Text>               
                <Pressable>
                    <Text>View All</Text>
                </Pressable>
            </View>
            <FlatList horizontal={true}
            data={DATA}
            renderItem={({item})=><ItemIngredientSale source={item.image} title={item.name} percent={item.percent} status={item.status} starpoint={item.starpoint} price={item.price} promotion={item.promotion} short={false}></ItemIngredientSale>}
            keyExtractor={item=>item.id}></FlatList>
            
        </View>
    )
};
export default IngredientSale;

const styles = StyleSheet.create({
    container: {
        marginHorizontal:5,
        paddingVertical:0,
        //alignItems:'center',
    },  
    textHeader: {
        fontSize:20,
        color:'black',
        fontWeight:600
    },
})