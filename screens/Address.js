import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../src/Color'
import { collection, query, documentId, getDocs, doc, where } from "firebase/firestore";
import { db } from '../firebase/index'
import Lottie from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

function Address(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { user } = route.params
    const [isloading, setIsloading] = useState(false);
    const [listAdd, setListAdd] = useState([]);
   
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("focus")
            getlistAdd();
        });
        return unsubscribe;
    }, [navigation]);

    // useEffect(() => {
    //     getlistAdd();
    // }, [])

    const getlistAdd = async () => {
        setIsloading(true)
        try {
            console.log("getlistAdd1")
            const khachhangDocRef = doc(db, "KHACHHANG", user.id);
            const giohangCollectionRef = collection(khachhangDocRef, "DIACHIGIAOHANG");
            const querySnapshot = await getDocs(giohangCollectionRef);
            const result = await querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTimeout(() => {
                setListAdd(result);
                setIsloading(false)
            }, 1000)
        } catch (error) {
            console.error(error)
        }

    }


    return (
        <SafeAreaView>

            <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10, paddingLeft: 10, marginBottom: 20 }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }} onPress={navigation.goBack}><Ionicons name='arrow-back' size={27} color={'black'}></Ionicons></TouchableOpacity>
                <Text style={{ fontSize: 23, color: 'black' }}>Địa chỉ của Tôi</Text>
            </View>
            {isloading == false ?
                <ScrollView>
                    <View style={{ backgroundColor: Color.backgroundDefault }}>
                        {listAdd.map((add, index) => (
                            <View key={index} style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 19, color: 'black', fontWeight: '400',alignSelf:'center' }}>{add.tennguoinhan}</Text>
                                        <View style={{ width: 1.5, backgroundColor: '#d0d7de', marginHorizontal: 7,marginVertical:2 }}></View>
                                        <Text style={{ fontSize: 16, fontWeight: '400',alignSelf:'center' }}>{add.sdt}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("EditAdress",{user:user,itemAdd:add})}//navigation.navigate("EditAddress")
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: '500', color: Color.main }}>sửa</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '400', paddingHorizontal: 10 }}>{add.motachitiet}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '400', paddingHorizontal: 10 }}>{add.diachi}</Text>
                                <View style={{ height: 1, backgroundColor: '#d0d7de', marginVertical: 15 }}></View>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddAddress",{user:user})}//navigation.navigate("AddAddress")
                        style={styles.btnAddAddress}>
                        <View style={styles.iconAdd} >
                            <Ionicons style={{ textAlign: 'center' }} name='add' size={22} color={Color.main}></Ionicons>

                        </View>
                        <Text style={styles.txtAddAddress}>Thêm địa chỉ mới</Text>
                    </TouchableOpacity>
                </ScrollView>
                :
                <View style={{ width: width, height: height }}>
                    <Lottie source={require('../src/Lottie/loading.json')} autoPlay loop />
                </View>}

        </SafeAreaView>
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