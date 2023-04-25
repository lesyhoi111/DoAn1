import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, VirtualizedList, ScrollView, Image } from 'react-native';
import Search from './components/Search'
import IngredientSale from './components/IngredientSale'
import TapRecipe from './components/TapRecipe'
import SliderImage from './components/SliderImage'
import Color from '../src/Color'
function Home(props) {
    const {navigation,route}=props
    const {navigate,goBack}=navigation
    return (
        <ScrollView horizontal={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                <View style={{position:'absolute', height:110, width:110,borderRadius:100,backgroundColor:Color.main,right:-20,top:-45}}></View>
                <View style={{position:'absolute', height:230, width:230,borderRadius:100,backgroundColor:Color.backgroundMain,bottom:-125,left:-60}}></View>
                    <View style={{ marginVertical: 0,flex:4 , }}>
                        <Text style={styles.txtheader}>Xin chào!</Text>
                        <Text style={styles.txtheaderbottom}>Bạn muốn mua thực phẩm gì?</Text>
                    </View>
                    <View style={{ flex:1,flexDirection:'row', paddingRight:5, alignItems:'center' }}>
                        <View flex={1}></View>
                        <TouchableOpacity style={{}}>
                            <Image source={require('../src/images/sale.png')} style={[styles.img, { borderWidth: 3, borderColor: Color.backgroundMain }]}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{}}>
                    
                <SliderImage></SliderImage>
                
                </View>
                    <Search></Search>   
                    <TouchableOpacity style={{ height:35,width:330,position:'absolute',left:15,top:213}} onPress={()=>navigate('SearchScreen')}>
                        </TouchableOpacity>      
                <IngredientSale></IngredientSale>
                <TapRecipe></TapRecipe>
            </SafeAreaView>
        </ScrollView>
     
    )
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        flexDirection:'row',
        marginTop:10
    },
    txtheader: {
        color: Color.main,
        fontSize: 26,
        paddingLeft: 15,
        fontWeight: '600'
    },
    txtheaderbottom: {
        fontSize: 20,
        paddingLeft: 15,
        fontWeight: '400'
    },
    titleHeader: {
        fontSize: 30,
        paddingLeft: 20,
        paddingRight: 30,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 50,
    }
})