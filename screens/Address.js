import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from './components/Search'
import IngredientSale from './components/IngredientSale'
import TapRecipe from './components/TapRecipe'
import SliderImage from './components/SliderImage'
import Color from '../src/Color'

function Address(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const addres = [
        {
            name: 'lê sỹ hội',
            address: 'quảng nam',
            street: 'ql 1a',
            numphone: '01 213 21 32',
            isdefault: true
        },
        {
            name: 'lê sỹ hội',
            address: 'quảng nam',
            street: 'ql 1a',
            numphone: '01 213 21 32',
            isdefault: true
        },
    ];

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10, paddingLeft: 10, marginBottom: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }} onPress={navigation.goBack}><Ionicons name='arrow-back' size={27} color={'black'}></Ionicons></TouchableOpacity>
                    <Text style={{ fontSize: 23, color: 'black' }}>Địa chỉ của Tôi</Text>
                </View>
                <View style={{ backgroundColor: Color.backgroundDefault }}>
                    {addres.map((add, index) => (
                        <View key={index} style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal:10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 18, color: 'black', fontWeight: '400' }}>{add.name}</Text>
                                    <View style={{ width: 1.5, backgroundColor: '#d0d7de', marginHorizontal: 10 }}></View>
                                    <Text style={{ fontSize: 18, fontWeight: '400' }}>{add.numphone}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("EditAdress")}//navigation.navigate("EditAddress")
                                >
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: Color.main }}>sửa</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '400', paddingHorizontal:10}}>{add.street}</Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', paddingHorizontal:10}}>{add.address}</Text>
                            <View style={{ height: 1, backgroundColor: '#d0d7de', marginVertical: 15 }}></View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddAddress")}//navigation.navigate("AddAddress")
                    style={styles.btnAddAddress}>
                    <View style={styles.iconAdd} >
                        <Ionicons style={{ textAlign: 'center' }} name='add' size={22} color={Color.main}></Ionicons>

                    </View>
                    <Text style={styles.txtAddAddress}>Thêm địa chỉ mới</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
    )
};
export default Address;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnAddAddress: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: Color.backgroundMain,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    iconAdd: {
        borderWidth: 1,
        borderColor: Color.main,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14

    },
    txtAddAddress: {
        fontSize: 18,
        padding: 10,
        color: Color.main
    }

})