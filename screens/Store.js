import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button,Image, SafeAreaView, StyleSheet, Text , TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from './components/Search';
import color from '../src/Color';
import TapRecipeStore from './components/TapRecipeStore'
function Store(props) {
    const { navigation, route } = props
    const { shop } = route.params
const [search,setSearch] = useState('')
const searched = () =>DATA.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack}>
                    <Icon name="arrow-left" size={25} color={color.backgroundMain} alignItems='center' />
                </TouchableOpacity>
                <View style={styles.SearchInput}>
                <Search onChangeText = {(text)=>{setSearch(text)}}></Search>
                </View>
            </View>
            <TouchableOpacity style={styles.store} onPress={()=>{props.navigation.navigate("DetailStore",{shop:shop})}}>
                <View style={styles.row1Store}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image
                    style = {styles.imgStore}
                    source={{uri : shop.image}}
                    ></Image>
                    <Text style={styles.text}>{shop.ten}</Text>
                    </View>
              
                    <TouchableOpacity style={styles.btnFollow}>
                        <Text style={styles.text}>Theo dõi</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>{shop.sosp} </Text>
                    <Text style={styles.text1}>Sản phẩm</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>{shop.soluottd} </Text>
                    <Text style={styles.text1}>Lượng theo dõi</Text>
                    </View>
                   
                    
                </View>
                 
                </TouchableOpacity>
                <TapRecipeStore listTab={['Best sale','All Ingredient', 'Meat,Fish,Egg,Seafood', 'Vegetable,Mushroom,fruit', 'Spice,Cooking oil', 'Beverage,Beer', 'Milk', 'Confectionery']} ></TapRecipeStore>
                
                 
        </SafeAreaView>
    )
};
export default Store;

const styles = StyleSheet.create({
    container: {
        flex: 1,  
           backgroundColor:'#fff'
    },
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center' 
    },
    header: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    },
    btnBack:{
        padding:10
    },
    SearchInput:{
        flex:1

    },
    store:{
        backgroundColor:color.backgroundMain,
        height: 100,
        paddingHorizontal:20,
        justifyContent:'center',
        borderRadius:10,
        marginHorizontal:10
    },
    row1Store:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    imgStore:{
        width:45,
        height:45,
        borderRadius:5,
        marginRight:5
    },
    btnFollow:{
        backgroundColor:'#33CCFF',
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:10
    },
    text:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
    text1:{
        color:'#fff'
    }
})