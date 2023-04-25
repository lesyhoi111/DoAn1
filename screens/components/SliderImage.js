import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,  View,  Alert, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../../src/Color'
import { SliderBox } from "react-native-image-slider-box"

function SliderImage() {
    const listImages=[
        "https://vtv1.mediacdn.vn/thumb_w/650/2022/11/9/photo-1-1667961619245852683374-crop-16679617132131736899560.jpg",
        "https://s3.ap-southeast-1.amazonaws.com/adpia.vn/photos/shares/PC/AT11/lazada-sale-giua-thang-11.jpg",
        "https://www.studytienganh.vn/upload/2021/06/105472.jpg",
        "https://i.ytimg.com/vi/3jhfjCMTiYo/maxresdefault.jpg",
    ]

    return (
        <View style={styles.container}>
            
            {/* <View style={{flex:0.7,backgroundColor:'#eef0f2'}}></View> */}
            <View style={{flex:1.9,backgroundColor:Color.main,justifyContent:'center',alignItems:'center',borderTopLeftRadius:20,borderBottomLeftRadius:0}}>
                <AntDesign name="doubleright" style={{fontSize:25,color:'white'}}></AntDesign>
                <Text style={{fontSize:19,color:'white',fontWeight:'500'}}>Xem</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:'500'}}>thêm</Text>
            </View>
            <View style={{flex:8,borderRadius:20}}>
            <SliderBox  images={listImages} 
            dotColor={Color.main}
            inactiveDotColor="#90A4AE"
            imageLoadingColor={Color.backgroundMain}
            resizeMode="stretch"
            autoplay={true}
            autoplayInterval={2000}
            circleLoop={true}
            onCurrentImagePressed={(index)=>Alert.alert(index+1)}
            firsItem={1}
            ></SliderBox>
            </View>
            <View style={{flex:0.7,backgroundColor:Color.backgroundDefault}}></View>
        </View>
    )
};
export default SliderImage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eef0f2',
        marginVertical:10,
        height:120,
        flexDirection:'row',
        marginLeft:20,
        borderTopLeftRadius:20
        //width:'80%',
        //height:40,
    },
})