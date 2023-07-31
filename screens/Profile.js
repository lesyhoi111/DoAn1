import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, View, ImageBackground, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import Color from '../src/Color'
import { MyContext } from '../App';
import { UIContext } from './UITab';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { SignOut } from './components/Redux/CurentUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
function Profile(props) {
    const navigationBottom = useNavigation();
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { loading, setLoading } = useState(true)
    const dispatch = useDispatch()
 

    const user = useSelector((state) => state.CurentUser)
    const { listdata, shop, listuser } = useContext(MyContext);
    const [myuser, setMyuser] = useState({
        cuahangdangtheodoi:[],
        anhdaidien: null,
        id: "",
        ten: "",
        email: "",
        password: "",
        ngaythamgia: "",
        magiamgiadadung: [],
        sdt: "00",
        ngaysinh: "",
        sotien: 0
      })
    // const { myuser, setMyuser } = useContext(UIContext);
    // getlistuser;
    // console.log("...().....")
    // useEffect(() => {
    //     setMyuser(listuser.find((item) => { return item.uid == user.uid }))
    //     // getlistuser();
    // })
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("123")
            getlistuser();
        });
        return unsubscribe;
    }, [navigation]);

    const getlistuser = async () => {
        try {
            // setLoading(true);
            const q = query(collection(db, "KHACHHANG"));
            const listU = [];
            const querySnapshot = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    listU.push({ id: doc.id, ...doc.data() });
                    console.log(doc.data())
                });
            });
            setTimeout(() => {
                setMyuser(listU.find((item) => { console.log(item.id); return item.id == user.uid }))
                console.log(user.uid)
                console.log(myuser.id)
                // setLoading(false)
            }, 2000)

        } catch (error) {
            console.error(error)
        }
    }

    const removeItemFromStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            dispatch(SignOut(null));
            console.log('Item removed successfully.');
            navigation.navigate('Login')
        } catch (error) {
            console.log('Error removing item from AsyncStorage:', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <ImageBackground source={require('../src/images/ronaldo.jpeg')} resizeMode="cover" style={{ height: 160 }}>
                        <Lottie source={require('../src/Lottie/wave3.json')} autoPlay loop speed={1.5} style={{ height: height * 1.1, width: width * 1.1, position: 'absolute', top: -15 }} />
                        <Lottie source={require('../src/Lottie/wave4.json')} autoPlay loop speed={1} style={{ height: height, width: width, position: 'absolute', top: -30 }} />
                        <Text style={{ color: 'white', fontSize: 27, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Thông tin tài khoản</Text>

                    </ImageBackground>

                    <ScrollView horizontal={false} style={{ backgroundColor: '#f1f1f1', paddingTop: 15 }}>
                        <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20 }} onPress={()=>{navigate('RecommendFood')}}>
                                <MaterialIcons name='payment' size={25} color={'#a9a9a9'}></MaterialIcons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Payment Methods</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }}
                                onPress={() => {
                                    navigate('Address', {
                                        user: myuser
                                    })
                                }}>
                                <Ionicons name='location-outline' size={25} color={'#a9a9a9'}></Ionicons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Address</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }}
                                onPress={() => {
                                    navigate('Voucher', {
                                        user: myuser
                                    })
                                }}>
                                <MaterialCommunityIcons name='ticket-percent-outline' size={25} color={'#a9a9a9'}></MaterialCommunityIcons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>My Vouchers</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }}
                                onPress={() => { navigationBottom.navigate('Cart') }}>
                                <Ionicons name='cart-outline' size={25} color={'#a9a9a9'}></Ionicons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>My Carts</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, marginBottom: 50 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20 }} >
                                <Ionicons name='notifications-outline' size={25} color={'#a9a9a9'}></Ionicons>
                                <View style={{ backgroundColor: 'red', position: 'absolute', borderRadius: 50, padding: 2, left: 35, top: 12 }}><Text style={{ color: 'white', fontWeight: '500' }}>20</Text></View>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Notifications</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }} onPress={() => navigate('History')}>
                                <MaterialCommunityIcons name='cart-check' size={25} color={'#a9a9a9'}></MaterialCommunityIcons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Purchase History</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }}>
                                <Ionicons name='settings-outline' size={25} color={'#a9a9a9'}></Ionicons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Setting</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }}>
                                <MaterialIcons name='support-agent' size={25} color={'#a9a9a9'}></MaterialIcons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Support</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => removeItemFromStorage('user')}
                                style={{ flexDirection: 'row', padding: 20, paddingTop: 0 }}>
                                <MaterialCommunityIcons name='logout' size={25} color={'red'}></MaterialCommunityIcons>
                                <View style={{ flex: 1, paddingLeft: 15 }}>
                                    <Text style={{ color: 'red', fontSize: 20, fontWeight: '500' }}>Log out</Text>
                                </View>
                                <Icon name='chevron-right' size={20} color={'red'}></Icon>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    {/* avatar */}
                    <TouchableOpacity style={{ position: 'absolute', top: 100, left: 40, height: 90, width: 280, backgroundColor: 'rgba(11,171,230,1)', borderBottomLeftRadius: 60, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomRightRadius: 30, flexDirection: 'row' }}
                        onPress={() => {
                            navigate('MyAccount', {
                                user: myuser
                            })
                        }}>
                        <View style={{ width: 120 }}></View>
                        <View style={{ marginRight: 5, flex: 1, justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', marginBottom: 2 }}>{myuser.ten}</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>(+84) {myuser.sdt.slice(1)}</Text>
                        </View>
                    </TouchableOpacity>
                    <Lottie source={require('../src/Lottie/wave.json')} autoPlay loop speed={2} style={{ height: 150, width: 150, position: 'absolute', top: 27, left: 17 }} />
                    <TouchableOpacity style={{ position: 'absolute', top: 80, left: 50 }}
                        onPress={() => {
                            navigate('MyAccount', {
                                user: myuser
                            })
                        }}>
                        <Image source={{ uri: myuser.anhdaidien == null ? "https://www.w3schools.com/howto/img_avatar.png" : myuser.anhdaidien }} resizeMode="cover" style={styles.img}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', right: 0 }}>
                        <Lottie source={require('../src/Lottie/setting.json')} autoPlay loop style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                </View>
        </SafeAreaView>

    )
};
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    txtheader: {
        color: Color.main,
        fontSize: 27,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    titleHeader: {
        fontSize: 30,
        paddingLeft: 20,
        paddingRight: 30,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Color.backgroundDefault
    },
})