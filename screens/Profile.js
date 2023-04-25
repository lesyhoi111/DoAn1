import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from './components/Search'
import IngredientSale from './components/IngredientSale'
import TapRecipe from './components/TapRecipe'
import SliderImage from './components/SliderImage'
import Color from '../src/Color'
function Profile(props) {
    const {navigation,route}=props
    const {navigate,goBack}=navigation
    return (
        
        <SafeAreaView style={styles.container}>
            <View style={[{paddingTop:15,paddingLeft:15,paddingBottom:5,backgroundColor:Color.backgroundMain,flexDirection:'row',justifyContent:'space-between'}]}>
                <Text style={styles.txtheader}>My Profile</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:'#fdbb29',fontSize:19,fontWeight:'500',backgroundColor:'white',paddingLeft:2}}>{(1025000).toLocaleString('en-US', {useGrouping:true, minimumFractionDigits: 0}).replace(/,/g,'.')}</Text>
                    <Image source={require('../src/images/vnd.png')} style={{height:26,width:25,borderTopRightRadius:20,borderBottomRightRadius:20,resizeMode:'center',marginRight:2}}></Image>
                    
                </View>
            </View>
            <TouchableOpacity style={{flexDirection:'row',paddingLeft:15,alignItems:'center',paddingRight:30,paddingBottom:10,backgroundColor:Color.backgroundMain,borderBottomLeftRadius:15,borderBottomRightRadius:15}} onPress={()=>{navigate('MyAccount')}}>
                <Image source={require('../src/images/sale.png')} style={styles.img}></Image>
                <View style={{flex:1,marginLeft:20}}>
                    <Text style={{color:Color.main,fontSize:23,fontWeight:'500'}}>Lê Sỹ Hội</Text>
                    <Text>0000000001</Text>
                </View>
                
                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
            </TouchableOpacity>
            <ScrollView horizontal={false} style={{backgroundColor:'#f1f1f1',paddingTop:15}}>
                <View style={{margin:15,backgroundColor:'white',borderRadius:10}}>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20}}>
                        <MaterialIcons name='payment' size={25} color={'#a9a9a9'}></MaterialIcons>
                        <View style={{ flex: 1,paddingLeft:15 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400'}}>Payment Methods</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20,paddingTop:0}} onPress={()=>{navigate('Address')}}>
                        <Ionicons name='location-outline' size={25} color={'#a9a9a9'}></Ionicons>
                        <View style={{  flex: 1,paddingLeft:15  }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400'}}>Address</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20,paddingTop:0}}>
                        <MaterialCommunityIcons name='ticket-percent-outline' size={25} color={'#a9a9a9'}></MaterialCommunityIcons>
                        <View style={{  flex: 1,paddingLeft:15  }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400'}}>My Vouchers</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20,paddingTop:0}}>
                        <Ionicons name='cart-outline' size={25} color={'#a9a9a9'}></Ionicons>
                        <View style={{ flex: 1,paddingLeft:15  }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400'}}>My Carts</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={{margin:15,backgroundColor:'white',borderRadius:10,marginBottom:50}}>
                    <TouchableOpacity style={{ flexDirection: 'row', padding: 20 }}>
                        <Ionicons name='notifications-outline' size={25} color={'#a9a9a9'}></Ionicons>
                        <View style={{backgroundColor:'red',position:'absolute',borderRadius:50,padding:2, left:35,top:12}}><Text style={{color:'white',fontWeight:'500'}}>20</Text></View>
                        <View style={{ flex: 1, paddingLeft: 15 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Notifications</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20,paddingTop:0}}>
                        <MaterialCommunityIcons name='cart-check' size={25} color={'#a9a9a9'}></MaterialCommunityIcons>
                        <View style={{ flex: 1,paddingLeft:15  }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400'}}>Purchase History</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20,paddingTop:0}}>
                        <Ionicons name='settings-outline' size={25} color={'#a9a9a9'}></Ionicons>
                        <View style={{ flex: 1,paddingLeft:15  }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400'}}>Setting</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20,paddingTop:0}}>
                        <MaterialIcons name='support-agent' size={25} color={'#a9a9a9'}></MaterialIcons>
                        <View style={{ flex: 1,paddingLeft:15  }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '400'}}>Support</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row',padding:20,paddingTop:0}}>
                        <MaterialCommunityIcons name='logout' size={25} color={'red'}></MaterialCommunityIcons>
                        <View style={{ flex: 1,paddingLeft:15  }}>
                            <Text style={{ color: 'red', fontSize: 20, fontWeight: '500'}}>Log out</Text>
                        </View>
                        <Icon name='chevron-right' size={20} color={'red'}></Icon>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
};
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:'#f1f1f1'      
    },
    txtheader: {
        color:Color.main,
        fontSize:27,
        fontWeight:'bold',
        paddingBottom:10,
    },
    titleHeader:{
        fontSize: 30,
        paddingLeft:20,
        paddingRight:30,
        paddingVertical: 10,
        fontWeight:'bold',
    },
    img:{
        height:60,
        width:60,
        borderRadius:10
    }
})