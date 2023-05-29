import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, StyleSheet, FlatList, View, ScrollView, ImageBackground, Dimensions, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import color from '../src/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailedInformation from './components/DetailedInformation'
import ListComment from './components/ListComment'
import ItemIngredientSale from './components/ItemIngredientSale'
import { DATA } from './components/DATA'
import { MyContext } from '../App';
import { collection, query, where, getDoc, orderBy, limit, setDoc, doc, db, updateDoc, arrayUnion, arrayRemove } from "../firebase/firebase";
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const ProductDetail = (props) => {
    const { navigation, route } = props
    const { itemDetail, shopOfPro } = route.params
    const [proOfShop, setProOfShop] = useState([]);
    const [follow, setFollow] = useState(false)
    const { listdata, shop,listuser } = useContext(MyContext);
    const [number, setNumber] = useState(1);
    const [shopPro, setShopPro] = useState(shopOfPro);
    const user = useSelector((state) => state.CurentUser)
    useEffect(() => {
        if (Object.keys(shopOfPro).length == 0) {
            console.log("getShop1")
            getShop()
        }
        else{
        console.log(listdata.length)
        setProOfShop(listdata.filter((item) => {  return item.mach == shopPro.id }))
        }
    }, [])

    const getShop = () => {
        console.log("getShop2")
        const itemThis = shop.find((itemid, index) => {
            console.log(itemDetail.mach);
            return itemDetail.mach == itemid.id
        })
        setTimeout(() => {
            console.log("getShop3")
            setShopPro(itemThis);
            setProOfShop(listdata.filter((item) => {  return item.mach == shopPro.id }))
            console.log(shopPro)
        }, 1000)
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

    const handleNumberSub = () => {
        if (number > 0) {
            setNumber(number - 1)
        }
    }

    const handleNumberPlus = () => {
        setNumber(number + 1)
    }
    useEffect(() => {
        const handleGetFollowedStore = async () => {
            const docRef = doc(db, "KHACHHANG", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const listStore = docSnap.data().cuahangdangtheodoi;
                const isFollow = listStore.find(i => i === itemDetail.mach)
                if (isFollow === itemDetail.mach) {
                    setFollow(true)
                }
                else {
                    setFollow(false)
                }
            }
        }
        handleGetFollowedStore();
    }, [])


    const handleToggleFollowedStore = async () => {
        console.log(user.uid)
        const followStoreRef = doc(db, 'KHACHHANG', user.uid);
        if (follow) {
            await updateDoc(followStoreRef, {
                cuahangdangtheodoi: arrayRemove(itemDetail.mach),
            })
            setFollow(false)
        }
        else {
            await updateDoc(followStoreRef, {
                cuahangdangtheodoi: arrayUnion(itemDetail.mach),
            })
            setFollow(true)
        }
    }
 
    const handleAddToCart = async (item) => {
        const docRef = await setDoc(doc(db, `KHACHHANG/${user.uid}/GIOHANG`, item.id), {
            image: item.image,
            soluong: number,
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
            <ScrollView style={styles.content}>
                <Image
                    style={styles.productImg}
                    resizeMode='cover'
                    source={{ uri: itemDetail.image }}
                />
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.btnIcon}
                        onPress={navigation.goBack}
                    >
                        <Icon name="arrow-left" style={styles.back_Icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIcon}>
                        <Icon name="cart-plus" style={styles.shoppingCart_Icon} />
                        <Text style={styles.quantity}>12</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', padding: 7, }}>
                    <Text umberOfLines={2} style={styles.productName}>{itemDetail.ten}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {Array(5).fill(0).map((_, id) => (<AntIcon key={id} name='star' style={[styles.star, { color: ((id + 1) <= itemDetail.sosao) ? color.colorStar : color.placeHoder }]}></AntIcon>))}
                        <Text style={{ marginLeft: 5, fontSize: 20 }}>{itemDetail.sosao.toFixed(1)}</Text>
                        <View style={{ width: 1, height: '100%', backgroundColor: '#AAAAAA', marginHorizontal: 10 }}></View>
                        <Text style={{ fontSize: 15, alignSelf: 'center', color: '#333' }}>{itemDetail.soluongdaban} Đã Bán</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{(itemDetail.giagoc * (100 - itemDetail.giamgia) / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.btnshareAndHeart}>
                                <MaterialCommunityIcons name='cart-plus' style={[styles.iconsaveAndHeart, { fontSize: 25 }]}>
                                </MaterialCommunityIcons>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnshareAndHeart}>
                                <Icon name="share" style={styles.iconsaveAndHeart} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.originalPrice}>{itemDetail.giagoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </View>
                {Object.keys(shopPro).length != 0 ?
                <TouchableOpacity style={{ backgroundColor: 'white', marginVertical: 7, padding: 10, flexDirection: 'row' }} 
                onPress={() => navigation.navigate('Store',{shop:shopPro})}>
                    <Image style={styles.imgShop} source={{ uri: shopPro.image }}></Image>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>{shopPro.ten}</Text>
                        <View flexDirection={"row"}>
                            <Text>{shopPro.sosao.toFixed(1)}</Text>
                            <Icon
                                name={"star"}
                                size={15}
                                color={'#FFD700'}
                                style={{ marginRight: 5, alignSelf: "center", marginLeft: 2 }}
                            />
                            <View style={{ width: 1, height: '100%', backgroundColor: '#AAAAAA', marginHorizontal: 5 }}></View>
                            <Text style={{ fontSize: 18, color: 'black' }}>{shopPro.sosanpham} sản phẩm</Text>
                        </View>
                    </View>
                    <View flex={1}></View>
                    <TouchableOpacity style={{ alignSelf: 'center', paddingVertical: 5, borderWidth: 1, borderColor: follow == false ? 'orange' : '#AAAAAA' }} onPress={handleToggleFollowedStore}>
                        {!follow?
                            <Text style={{ color: 'black', marginHorizontal: 15 }}>THEO DÕI</Text>
                            :
                            <Text style={{ color: 'black', marginHorizontal: 5 }}>ĐÃ THEO DÕI</Text>
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
                :
                <View style={{ backgroundColor: 'white', marginVertical: 7, padding: 10, flexDirection: 'row' }}>
                     <View style={[styles.imgShop,{backgroundColor:color.placeHoder}]} ></View>
                </View>
                }
                {/* <Text style={styles.info}>Thông tin sản phẩm:</Text>
                <Text style={styles.infoContent}>Vivamus pulvinar venenatis nunc et faucibus. Proe.</Text> */}
                <View>
                    <View style={{ backgroundColor: 'white', paddingVertical: 7 }}>
                        <Text style={{ paddingLeft: 10, fontSize: 17, color: 'black', fontWeight: '500' }}>Sản phẩm khác của cửa hàng:</Text>
                    </View>
                    {Object.keys(shopPro).length != 0 ?
                    <FlatList horizontal={true}
                        data={proOfShop}
                        renderItem={({ item }) => <ItemIngredientSale item={item} short={true}
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
                ></FlatList>    }
                </View>
                <View style={{ backgroundColor: 'white' }}>
                    <DetailedInformation item={itemDetail}></DetailedInformation>
                </View>
                <View style={{ backgroundColor: '#f2f2f2', height: 10, width: '100%' }}></View>
                <View style={{ backgroundColor: 'white' }}>
                    <ListComment item={itemDetail}></ListComment>
                </View>
                <View style={{ backgroundColor: '#f2f2f2', height: 20, width: '100%' }}></View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnaddSub}
                    onPress={handleNumberSub}>
                    <Icon name="minus" style={styles.iconAddAndSub} />
                </TouchableOpacity>
                <Text style={styles.numberOfProduct}>{number}</Text>
                <TouchableOpacity style={styles.btnaddSub}
                    onPress={handleNumberPlus}>
                    <Icon name="plus" style={styles.iconAddAndSub} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAddToCart(itemDetail)} style={styles.btnAddToCart}>
                    <Text style={styles.btnPrice}>{(itemDetail.giagoc * (100 - itemDetail.giamgia) / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    <Text style={styles.btnText}>THÊM VÀO GIỎ HÀNG</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 62,
        // backgroundColor:'#ffffff'
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
        color: color.main,
        fontSize: 22,
    },
    btnIcon: {
        paddingVertical: 12,
        paddingHorizontal: 15
    },
    shoppingCart_Icon: {
        fontSize: 19,
        color: color.main,
    },
    quantity: {
        backgroundColor: 'red',
        width: 14,
        height: 14,
        borderRadius: 7,
        textAlign: 'center',
        color: '#fff',
        position: 'absolute',
        top: 8,
        right: 12,
        fontSize: 10
    },
    content: {
        // padding:7,
    },
    imgShop: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        marginRight: 15,
        marginLeft: 5
    },
    productImg: {
        width: width,
        height: (width * 2.6) / 4,
        alignSelf: 'center',
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333'
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: 'red',//color.main,
        fontWeight: 'bold'
    },
    originalPrice: {
        fontSize: 17,
        textDecorationLine: 'line-through',
        color: color.placeHoder
    },
    iconsaveAndHeart: {
        fontSize: 18,
        paddingHorizontal: 5,
        alignSelf: 'center',
        color: '#333'
    },
    btnshareAndHeart: {
        margin: 2,
        padding: 4
    },
    info: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18,
    },
    infoContent: {
        color: '#333',
        fontSize: 18
    },
    footer: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        backgroundColor: 'white'
    },
    btnAddToCart: {
        flex: 1,
        backgroundColor: color.main,
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    btnaddSub: {
        height: 30,
        width: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 17,
        borderColor: color.main
    },
    btnPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
    },
    iconAddAndSub: {
        fontSize: 18,
        color: color.main,
    },
    numberOfProduct: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 5,
        color: '#333'
    },
    star: {
        fontSize: 15,
        marginRight: 5,
        color: color.colorStar
    },
});

export default ProductDetail;