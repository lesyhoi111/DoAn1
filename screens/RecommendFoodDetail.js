import React, { useState, useEffect, useContext } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../src/Color'
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get('window');
const RecommendFoodDetail = (props) => {
    const { navigation, route } = props
    const {ItemFood}=route.params
    const [listIngHad,setListIngHad]=useState([])
    const [listIngNotHad,setListIngNotHad]=useState([])
    useEffect(()=>{
        setListIngHad(ItemFood.usedIngredients)
        setListIngNotHad(ItemFood.missedIngredients)
    },[ItemFood])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                    <Image
                        style={styles.productImg}
                        resizeMode='cover'
                        source={{ uri: ItemFood.image }}
                    />
                    <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.btnIcon}
                        onPress={navigation.goBack}
                    >
                        <Icon name="arrow-left" style={styles.back_Icon} />
                    </TouchableOpacity>
                </View>
                    <View style={styles.boxTitle}>
                        <View style={styles.boxTitleTop}>
                        <Text style={styles.titleItem} numberOfLines={2}>{ItemFood.title}</Text>
                        </View>
                        <View style={styles.boxTitleBot}>
                            <Text style={styles.titleItemBot}>Có sẵn: {ItemFood.usedIngredientCount}</Text>
                            <Text style={styles.titleItemBot}>Thiếu: {ItemFood.missedIngredientCount}</Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <AntDesign name='like1' size={17} style={{marginRight:3}}></AntDesign>
                                <Text style={styles.titleItemBot}>{ItemFood.likes}</Text>
                            </View>
                        </View>
                    </View>
                    {listIngHad.length>0||listIngNotHad.length>0?
                    <View style={{marginTop:50}}>
                        <Text style={{fontSize:20,color:'black',fontWeight:'500',marginLeft:20}}>Nguyên liệu</Text>
                        {listIngHad.map((itemIng,i)=>
                            <View style={styles.lineIng} key={i}>
                                <Image source={{uri:itemIng.image}} style={[styles.imgIng, {borderColor:'green'}]}></Image>
                                <Text style={[styles.txtLineIng,{color:'green'}]} numberOfLines={2}>{itemIng.originalName}</Text>
                                <Text style={[styles.txtNumLineIng,{color:'green'}]} numberOfLines={2}>{itemIng.amount} {itemIng.unitLong}</Text>
                            </View>)}
                        {listIngNotHad.map((itemIngMiss,iM)=>
                            <View style={styles.lineIng} key={iM}>
                                <Image source={{uri:itemIngMiss.image}} style={styles.imgIng}></Image>
                                <Text style={styles.txtLineIng} numberOfLines={2}>{itemIngMiss.originalName}</Text>
                                <Text style={styles.txtNumLineIng} numberOfLines={2}>{itemIngMiss.amount} {itemIngMiss.unitLong}</Text>
                            </View>)}
                    </View>
                    :
                    <View style={{marginTop:50}}>
                        <Text>Loading...</Text>
                    </View>}
            </ScrollView>
            
        </SafeAreaView>
    )
}
export default RecommendFoodDetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        width: width
    },
    back_Icon: {
        color: 'white',
        fontSize: 20,
    },
    btnIcon: {
        marginVertical: 7,
        marginHorizontal: 10,
        paddingVertical:4,
        paddingHorizontal:10,
        backgroundColor:Color.backgroundMain,
        borderRadius:15
    },
    bottom: {
        backgroundColor: Color.backgroundMain,
    },
    productImg: {
        width: width,
        height: (width * 2.3) / 4,
        alignSelf: 'center',
    },
    header_login: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    lottie: {
        width: width,
        height: width,
        backgroundColor: 'red'
    },
    boxItem: {
        height:180,
        width:width-100,
        marginHorizontal:50,
        marginVertical:20,
        borderRadius:10
    },
    imgIng: {
        height:50,
        width:50,
        resizeMode:'cover',
        borderRadius:10,
        borderWidth:1,
        borderColor:'black'
    },
    boxTitle: {
       backgroundColor:Color.main,
       position:'absolute',
       top:(width * 1.6) / 4,
       left:0,
       borderRadius:10,
       width:(width*1.4)/2,
       marginHorizontal:(width*0.6)/4,
       height:95
    },
    boxTitleTop: {
        justifyContent:'center',
        alignItems:'center',
        height:65,
        paddingHorizontal:10,
        borderBottomColor:Color.backgroundMain,
        borderBottomWidth:1
     },
     boxTitleBot: {
        height:30,
        flexDirection:'row',
        paddingHorizontal:8,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:Color.backgroundMain,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
     },
    titleItem: {
        fontSize: 20,
        color:'white',
        fontWeight:'500',
        marginVertical:2,
        textAlign:'center'
    },
    titleItemBot: {
        fontSize: 15,
        color:'black',
        fontWeight:'500',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Color.main,
        marginVertical: 5,
        marginHorizontal: 50
    },
    txtButton: {
        fontSize: 20,
        color: Color.main,
        fontWeight: '500'
    },
    txtLineIng:{
        fontSize: 16,
        color:'black',
        marginHorizontal:5,
        width:width-160,
    },
    txtNumLineIng:{
        fontSize: 14,
        width:70,
        textAlign:'right'
    },
    lineIng: {
        width:width-30,
        marginHorizontal:15,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10
    },
    txtReview: {
        fontSize: 18,
        color: 'black',
        backgroundColor: Color.backgroundDefault,
        borderRadius: 5,
        height: 80,
        borderColor: 'black',
        borderWidth: 1,
        textAlignVertical: 'top'
    },
    boxLoading: {
        height: height,
        width: width,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0.7)"
    }
})