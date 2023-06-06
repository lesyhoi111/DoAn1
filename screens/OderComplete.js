import React, { useState, useEffect, useContext } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Lottie from 'lottie-react-native';
import Color from '../src/Color'
import { Rating, AirbnbRating } from 'react-native-ratings';
const { width, height } = Dimensions.get('window');
const OderComplete = (props) => {
    const [showreview,setShowreview]=useState(false);
    const [rating, setRating] = useState(5);
    const [reviews, setReviews] = useState(5);
    const handleFinishRating = (value) => {
        setRating(value);
      };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.lottie}>
                <Lottie source={require('../src/Lottie/firework.json')} autoPlay loop />
            </View>
            <View style={styles.boxTxt}>
                <Text style={styles.header}>Đặt hàng thành công!</Text>
                <Text style={styles.txt}>"Đơn hàng đang chờ được xác nhận. Hãy kiểm tra đơn hàng trong lịch sử giao hàng"</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{ props.navigation.goBack()}}>
                <Text style={styles.txtButton}>Hoàn thành</Text>
            </TouchableOpacity>
        </ScrollView>
    )
} 
export default OderComplete;
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        paddingTop:50
    },
    lottie: {
        width:width,
        height:width,
    },
    boxTxt:{
        alignItems:'center',
        marginVertical:20
    },
    boxReview:{
        marginVertical:15,
        backgroundColor:Color.backgroundDefault,
        paddingHorizontal:10,
        paddingVertical:10
    },
    header:{
        fontSize:22,
        fontWeight:'bold',
        color:Color.main
    },
    txt:{
        fontSize:18,
        color:Color.placeHoder
    },
    button:{
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:5,
        borderWidth:1,
        borderColor:Color.main,
        marginVertical:30,
        marginHorizontal:50
    },
    txtButton:{
        fontSize:20,
        color:Color.main,
        fontWeight:'500'
    },
})