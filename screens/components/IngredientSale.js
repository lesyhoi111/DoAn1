import React, { useState, useEffect,useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image, Pressable, FlatList, ToastAndroid } from 'react-native';
import ItemIngredientSale from './ItemIngredientSale'
import { collection, query, where, getDocs, orderBy, limit, addDoc, doc, setDoc,updateDoc } from "firebase/firestore";
import { db } from '../../firebase/index'
import color from '../../src/Color';
import { useSelector } from 'react-redux';
import { MyContext } from '../../App';

function IngredientSale(props) {
    const { navigation, route,nav } = props
    const { listdata, shop, listuser } = useContext(MyContext);
    const [listRecommend, setListRecommend] = useState([])
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) =>state.CurentUser)

    useEffect(() => {
        getRecommendIng();

    }, [])
    const getRecommendIng=async()=>{
        const url = 'http://192.168.137.1:5000/recommend?idUser='+user.uid;
        console.log(url)
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setListRecommend(listdata.filter((item) => {  return data.includes(item.id.trim()) }))
        } catch (error) {
            console.error(error);
        }
        
    }
   
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
        const handleAddToCart = async(item)=>{
            const docRef = await setDoc(doc(db, `KHACHHANG/${user.uid}/GIOHANG`, item.id), {
                image: item.image,
                soluong: 1,
                ten:item.ten,
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
                <Text style={styles.textHeader}>Hot Sale</Text>
                <Pressable>
                    <Text>View All</Text>
                </Pressable>
            </View>
            {listRecommend.length >0 ?
                <FlatList horizontal={true}
                    data={listRecommend}
                    renderItem={({ item }) => <ItemIngredientSale item={item} short={false}
                    onPressCartPlus={()=>handleAddToCart(item)}
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