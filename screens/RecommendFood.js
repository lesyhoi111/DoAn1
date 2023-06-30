import React, { useState, useEffect, useContext } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../src/Color'
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get('window');
const RecommendFood = (props) => {
    const { navigation, route } = props
    const [listFood,setListFood]=useState([])
    const itemFood = useSelector(state => state.cart.items);
    useEffect(() => {
        get()
    }, [])
    const get = async () => {
        // try {
        //     const data = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients', {
        //         params: {
        //             ingredients: 'apples,flour,sugar',
        //             number: '5',
        //             ignorePantry: 'true',
        //             ranking: '1'
        //         },
        //         headers: {
        //             'X-RapidAPI-Key': '7461b0dbf716c9bca0aec66dabcb59f9',
        //             'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        //         }
        //     })
        //     console.log(data)
        // } catch (error) {
        //     console.log(error)
        // }
        let strIng=""
        itemFood.forEach((item) => {
            if(strIng==""){
                strIng=item.product.keyword
            }else{
                strIng=strIng+",+"+item.product.keyword
            }
        })
        const url = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=66fb37a492054912a2793de4cd7ec613&ingredients='+strIng+'&number=5&sort=max-used-ingredients';
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '7461b0dbf716c9bca0aec66dabcb59f9',
        //         'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        //     }
        // };

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setTimeout(()=>{
                setListFood(data)
            },1000)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                <TouchableOpacity
                onPress={()=>navigation.goBack()}
                    style={styles.btnBack}>
                    <Icon name="arrow-left" style={styles.iconBack} />
                </TouchableOpacity>
                <Text style={styles.header_login}>Gợi ý món ăn</Text>
                <View></View>
            </View>
            <ScrollView style={styles.container}>
                {listFood.length>0?
                listFood.map((itemFood,i)=>
                <TouchableOpacity style={styles.boxItem} onPress={()=>{navigation.navigate('RecommendFoodDetail',{ItemFood:itemFood})}} key={i}>
                    <Image source={{uri:itemFood.image}} style={styles.imgItem}></Image>
                    <View style={styles.boxTitle}>
                        <Text style={styles.titleItem}>{itemFood.title}</Text>
                    </View>
                </TouchableOpacity>)
                :<View>
                    <Text style={styles.titleItem}>Loading</Text>
                    </View>}
            </ScrollView>
            
        </SafeAreaView>
    )
}
export default RecommendFood;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    header: {
        height: 55,
        backgroundColor: Color.main,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    bottom: {
        backgroundColor: Color.backgroundMain,
    },
    btnBack: {
        padding: 5
    },
    iconBack: {
        color: '#fff',
        fontSize: 20
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
    imgItem: {
        height:180,
        width:width-100,
        resizeMode:'cover',
        borderRadius:10
    },
    boxTitle: {
       backgroundColor:"rgba(10,10,10,0.6)",
       position:'absolute',
       bottom:0,
       left:0,
       borderBottomLeftRadius:10,
       borderBottomRightRadius:10,
       width:width-100,
       justifyContent:'center',
       alignItems:'center'
    },
    titleItem: {
        fontSize: 18,
        color:'white',
        fontWeight:'bold',
        marginVertical:2,
        textAlign:'center'
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
    titleitem: {
        fontSize: 19,
        color: 'black',
        fontWeight: '500',
        marginVertical: 5
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