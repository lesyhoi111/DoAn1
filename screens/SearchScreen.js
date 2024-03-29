import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, FlatList, Image, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Search from './components/Search';
import color from '../src/Color';
import { MyContext } from '../App';
import ItemIngredientSale from './components/ItemIngredientSale';
import {
    collection,
    db,
    setDoc,
    doc,
    getDocs
} from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { flingGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
const { width, height } = Dimensions.get('window');

function SearchScreen(props) {
    const user  = useSelector((state) => state.CurentUser)
    const { navigation } = props
    const [search, setSearch] = useState('')
    const [listdata, setListdata] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const handleGetProduct = async () => {
                const querySnapshot = await getDocs(collection(db, "THUCPHAM"));
                const newData = []
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    const dataWithId = { ...docData, id: doc.id };
                    newData.push(dataWithId);
                });
                setListdata(newData)
            }
            handleGetProduct();
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }, [])

    const searched = () => listdata.filter(item => item.ten.toLowerCase().includes(search.toLowerCase()))
    // DATA.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    const [isSearch, setIsSearch] = useState(false)
    useEffect(() => {
        setIsSearch(true);
    });
    
    if(loading){
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>

            </View>
        )
    }
    else{
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack}>
                    <Icon5 name="arrow-left" size={20} color={color.main} alignItems='center' />
                </TouchableOpacity>
                <View style={styles.SearchInput}>
                    <Search onChangeText={(text) => { setSearch(text) }} openSearch={isSearch} value={search} white={true}></Search>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => getData()}>
                    <Text style={styles.txt_btn}>Tìm</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {search.length > 0 ? searched().length > 0 ? <View style={styles.ListItem}>

                    <FlatList
                        data={searched()}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <ItemIngredientSale item={item} short={false}
                            onPressCartPlus={() => handleAddToCart(item)}
                                onPress={() => navigation.navigate('ProductDetail',
                                    {
                                        itemDetail: item,
                                        shopOfPro: {}
                                    }
                                )}></ItemIngredientSale>}
                        keyExtractor={item => item.id}
                    ></FlatList>
                </View>
                    :
                    <View style={{ alignItems: 'center', backgroundColor: 'white', width: '100%' }}>
                        <Image style={{ height: 200, width: 200 }} source={require('../src/images/notfound.jpg')}></Image>
                        <Text style={{ color: '#333', fontSize: 20, textAlign: 'center' }}>Xin lỗi, có vẻ như chúng tôi không có sản phẩm này!</Text>
                    </View>
                    :
                    <View>
                        <Text style={{ color: '#333', fontSize: 18 }}>Nhập từ khóa để tìm kiếm</Text>
                    </View>}
            </View>
            {loading == true && <View style={{ flex: 1, backgroundColor: 'red', position: 'absolute', height: height, width: width }}>
            </View>}

           
        </SafeAreaView>
    )}
};
export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        //backgroundColor:color.main,
        paddingVertical: 10
    },
    btnBack: {
        padding: 10
    },
    SearchInput: {
        flex: 1

    },
    ListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    notFoundScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: color.main,
        borderRadius: 10,
        marginRight: 5
    },
    txt_btn: {
        color: 'white',
        marginHorizontal: 20,
        marginVertical: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconRecommend: {
        color: color.main,
        fontSize: 53
      },
      txtRecommend:{
        fontSize:14,
        color:'white',
        fontWeight:'bold',
        position:'absolute',
        bottom:7,
        textAlign:'center',
        width:'100%',
        paddingRight:3
      }
})