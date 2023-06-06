import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, VirtualizedList, ScrollView, Image } from 'react-native';
import Search from './components/Search'
import IngredientSale from './components/IngredientSale'
import TapRecipe from './components/TapRecipe'
import SliderImage from './components/SliderImage'
import Color from '../src/Color'
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { SignOut } from './components/Redux/CurentUserSlice';
import { auth, updateProfile,sendEmailVerification  } from '../firebase/firebase';
const { width, height } = Dimensions.get('window');
function Home(props) {
    const {navigation,route}=props
    const {navigate,goBack}=navigation
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const removeItemFromStorage =  () => {
        const user = auth.currentUser;
        console.log(user.emailVerified)
    };
   
    return (
        <ScrollView horizontal={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    
                <Lottie source={require('../src/Lottie/home2.json')} autoPlay loop speed={1}  style={{position:'absolute', height:100, width:100,top:-10,right:-13}}/>
                <Lottie source={require('../src/Lottie/home1.json')} autoPlay loop speed={1}  style={{position:'absolute', height:300, width:300,top:-45,left:-40}}/>
                
                <View style={{ marginVertical: 0,flex:4 }}>
                        <Text style={styles.txtheader}>Xin chào!</Text>
                        <Text style={styles.txtheaderbottom}>Bạn muốn mua thực phẩm gì?</Text>
                    </View>
                    <View style={{ flex:1,flexDirection:'row', paddingRight:5, alignItems:'center' }}>
                        <View flex={1}></View>
                        <TouchableOpacity style={{}}>
                            <Image source={require('../src/images/sale.png')} style={styles.img}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{}}>
                    
                <SliderImage></SliderImage>
                
                </View>
                    <Search white={false}></Search>   
                    <TouchableOpacity style={{ height:35,width:330,position:'absolute',left:15,top:213}} onPress={removeItemFromStorage}>
                        </TouchableOpacity>      
                <IngredientSale nav={navigation}></IngredientSale>
                <TapRecipe nav={navigation}></TapRecipe>

            {/* <View style={{position:'absolute',height:height,width:width,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                <Lottie source={require('../src/Lottie/loading2.json')} autoPlay speed={1.5}/>
            </View>} */}
            </SafeAreaView>
        </ScrollView>
     
    )
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        flexDirection:'row',
        marginTop:10
    },
    txtheader: {
        color: Color.main,
        fontSize: 26,
        paddingLeft: 15,
        fontWeight: '600'
    },
    txtheaderbottom: {
        fontSize: 20,
        paddingLeft: 15,
        fontWeight: '400'
    },
    titleHeader: {
        fontSize: 30,
        paddingLeft: 20,
        paddingRight: 30,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 50,
    }
})