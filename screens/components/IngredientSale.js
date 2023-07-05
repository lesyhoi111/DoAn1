import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image, Pressable, FlatList, ToastAndroid } from 'react-native';
import ItemIngredientSale from './ItemIngredientSale'
import { collection, query, where, getDocs, orderBy, limit, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/index'
import color from '../../src/Color';
import { useSelector } from 'react-redux';
import { MyContext } from '../../App';
import { useFocusEffect } from '@react-navigation/native';
function IngredientSale(props) {
    const { navigation, route, nav } = props
    const { listdata, shop, listuser } = useContext(MyContext);
    const [listRecommend, setListRecommend] = useState([])
    const user = useSelector((state) => state.CurentUser);
    // useEffect(() => {
    //     const getRecommendIng = async () => {
    //         var haveData=false;
    //         try {
    //             if (user) {
    //                 const url = `http://192.168.137.1:5000/recommend?idUser=${user.uid}`;
    //                 console.log(url);
    //                 await fetch(url)
    //                     .then(response => response.json())
    //                     .then(data => {
    //                         if(data.length<4){
    //                             haveData==false
    //                         }else{
    //                             haveData==true
    //                         }
    //                         setListRecommend(listdata.filter((item) => data.includes(item.id.trim())));
    //                     });
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         } 
    //         return haveData;
    //     };
        
    //     if (listRecommend.length < 1) {
    //         const have= getRecommendIng();
    //         if(have==false){
    //             getDataSale()
    //         }
    //     }
    // }, [listRecommend]);
    const getDataSale = async () => {
        // setLoading(true)
        const q = query(collection(db, "THUCPHAM"),
            where("giamgia", ">", 0),
            orderBy("giamgia", 'desc'),
            limit(10));
        const querySnapshot = await getDocs(q);
        const list = []
        querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() })
            console.log(doc.data().ten)
        });
        setTimeout(() => {
            setListRecommend([...listRecommend,list])
        }, 500);

    };
    
    useFocusEffect(
        useCallback(() => {
            const getRecommendIng = async () => {
                var haveData=false;
                try {
                    if (user) {
                        const url = `http://192.168.137.1:5000/recommend?idUser=${user.uid}`;
                        console.log(url);
                        await fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                if(data.length<4){
                                    haveData==false
                                }else{
                                    haveData==true
                                }
                                setListRecommend(listdata.filter((item) => data.includes(item.id.trim())));
                            });
                    }
                } catch (error) {
                    console.error(error);
                } 
                return haveData;
            };
        
            if (listRecommend.length < 1) {
                const have= getRecommendIng();
                if(have==false){
                    getDataSale()
                }
            }
        }, [listRecommend]),
    );

    
    const DATA = [
        {
            id: '002',
        },
        {
            id: '003',
        },
        {
            id: '001',
        },
    ];
    const handleAddToCart = async (item) => {
        const docRef = await setDoc(doc(db, `KHACHHANG/${user.uid}/GIOHANG`, item.id), {
            image: item.image,
            soluong: 1,
            ten: item.ten,
            giagoc: item.giagoc,
            giamgia: item.giamgia
        })
            .then(ToastAndroid.showWithGravity(
                'Đã thêm sản phẩm vào giỏ hàng',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            ))
            .catch((error) => {
                console.log(error)
            });
    }

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 10 }}>
                <Text style={styles.textHeader}>Dành cho bạn</Text>
                <Pressable>
                    <Text>Tất cả</Text>
                </Pressable>
            </View>
            {listRecommend.length > 0 ?
                <FlatList horizontal={true}
                    data={listRecommend}
                    renderItem={({ item }) => <ItemIngredientSale item={item} short={false}
                        onPressCartPlus={() => handleAddToCart(item)}
                        onPress={() => nav.navigate('ProductDetail',
                            {
                                itemDetail: item,
                                shopOfPro: {}
                            }
                        )}></ItemIngredientSale>}
                    keyExtractor={item => item.id}></FlatList>
                :
                <FlatList horizontal={true}
                    data={DATA}
                    renderItem={({ item }) => <View style={{ height: 230, width: 140, backgroundColor: 'white', borderRadius: 10, marginHorizontal: 10, elevation: 10, marginVertical: 10 }}>
                        <View style={{ width: '100%', height: '39%', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: color.placeHoder }}></View>
                        <View style={{ marginHorizontal: 5 }}>
                            <View style={{ width: 110, height: 10, backgroundColor: color.placeHoder, marginVertical: 5 }}></View>
                            <View style={{ width: 60, height: 10, backgroundColor: color.placeHoder, marginVertical: 5 }}></View>
                            <View style={{ width: 80, height: 10, backgroundColor: color.placeHoder, marginVertical: 5 }}></View>
                            <View style={{ width: 90, height: 10, backgroundColor: color.placeHoder, marginVertical: 5 }}></View>
                            <View style={{ width: 70, height: 10, backgroundColor: color.placeHoder, marginVertical: 5 }}></View>
                            <View style={{ width: 70, height: 10, backgroundColor: color.placeHoder, marginVertical: 5, alignSelf: 'center' }}></View>
                        </View>
                    </View>}
                    keyExtractor={item => item.id}
                ></FlatList>
            }
        </View>
    )
};
export default IngredientSale;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        paddingVertical: 0,
        //alignItems:'center',
    },
    textHeader: {
        fontSize: 20,
        color: 'black',
        fontWeight: 600
    },
})