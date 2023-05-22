import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image, Pressable, FlatList } from 'react-native';
import ItemIngredientSale from './ItemIngredientSale'
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from '../../firebase/index'
import color from '../../src/Color';


function IngredientSale(props) {
    const { navigation } = props
    const [listdata, setListdata] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()

    }, [])
    const getData = async () => {
        setLoading(true)
        const q = query(collection(db, "THUCPHAM"),
            where("giamgia", ">", 0),
            // where("soluongcon", ">", 0), 
            orderBy("giamgia", 'desc'),
            // orderBy("sosao",'desc')
            limit(10));
        const querySnapshot = await getDocs(q);
        const list = []
        querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() })
            console.log(doc.data().ten)
        });
        setListdata(list)
        setTimeout(() => {
            setLoading(false);
        }, 500);

    };
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

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 10 }}>
                <Text style={styles.textHeader}>Hot Sale</Text>
                <Pressable>
                    <Text>View All</Text>
                </Pressable>
            </View>
            {loading == false ?
                <FlatList horizontal={true}
                    data={listdata}
                    renderItem={({ item }) => <ItemIngredientSale item={item} short={false}
                        onPress={() => navigation.navigate('ProductDetail',
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