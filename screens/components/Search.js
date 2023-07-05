import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../../src/Color'

function Search(props) {
    const {onChangeText,white} = props

    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:white==true?"white":color.backgroundMain,borderColor:white==true?color.main:"black"}]} >
            <Image source={require('../../src/images/search.png')} style={styles.img}  />
            <TextInput placeholder='Tìm nguyên liệu' style={styles.textInput} placeholderTextColor={color.placeHoder} onChangeText={onChangeText} autoFocus={props.openSearch}></TextInput>
        </TouchableOpacity>
    )
};
export default Search;

const styles = StyleSheet.create({
    container: {
        marginHorizontal:15,
        borderRadius:17,
        flexDirection:'row',
        paddingVertical:0,
        borderWidth:1
    },
    img: {
        height:35,
        width:35,
        tintColor:color.placeHoder,
        alignSelf:'center',
    },
    textInput: {
        color:'#333',
        fontSize:20,
        flex:1,
        paddingVertical:0,
    },
    boxfilter: {
       backgroundColor:color.main,
       borderRadius:17,
       aspectRatio:1,
       alignItems:'center',
       justifyContent:'center',
       padding:5
    },
})