import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { addCart,deleteCart } from "./Redux/CartSlice";
import CheckBox from '@react-native-community/checkbox';
import Color from "../../src/Color";
import { SwipeListView } from 'react-native-swipe-list-view';
const { width } = Dimensions.get('window');
const ProductItemHz = (props) => {
    const { discount, name, price, sale, uri, onPress, status,id } = props
    const [number, setNumber] = useState(1)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const handleNumberPlus = () => {
        setNumber(number + 1)
    }
    useEffect(() => {
        if (number < 1) {
            setAddtoCart(null)
        }
    }, [number])
    const handleNumberSub = () => {
        if (number > 0) {
            setNumber(number - 1)
        }
    }
    const dispatch = useDispatch();
    const onChangeCheck = (valueCheck) => {
        setToggleCheckBox(valueCheck)
        if(valueCheck){
        dispatch(
            addCart({
                idCart: id,
                name: name,
                image: uri,
                percent: discount,
                sale: sale,
                status: status,
                price: price,
                num: number
          })
        );}else{
            dispatch(
                deleteCart(id))
        }
      };

      const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return (
          <TouchableOpacity  activeOpacity={0.6}>
            <View style={styles.deleteBox}>
              <Animated.Text style={{transform: [{scale: scale}]}}>
                Delete
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      };
    
    return (
        // <Swipeable renderLeftActions={leftSwipe}>
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.info} >
                <View style={styles.header}>
                    <Icon name='store' style={{ fontSize: 20, color: 'black', marginRight: 10 }}></Icon>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.NameShop}>Tên của shop</Text>
                    </View>
                    <View style={{
                        justifyContent: "center"
                    }}>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => onChangeCheck(newValue)}
                            tintColors={{ true: Color.main, false: 'black' }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.leftPath}>
                        <Text style={styles.discount}>{discount}</Text>
                        <Image
                            style={styles.img}
                            source={{ uri: uri }}
                        />
                    </View>
                    <View style={styles.rightPath}>
                        <Text numberOfLines={1} style={styles.name}>{name}</Text>
                        <View style={styles.status}>
                            <FontAwesome name='circle' style={{ color: status == 'Available' ? 'green' : (status == 'Sold-out' ? 'red' : 'orange') }}></FontAwesome>
                            <Text style={{ color: status == 'Available' ? 'green' : (status == 'Sold-out' ? 'red' : 'orange'), marginLeft: 5, fontSize: 15 }}>{status} </Text>
                        </View>
                        <View style={styles.money}>
                            <View>
                                <Text style={styles.price}>{sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                <Text style={styles.sale}>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                            </View>
                            <View style={styles.ChangeNumber}>
                                <TouchableOpacity
                                    onPress={handleNumberSub}
                                    style={styles.btnaddSub} >
                                    <Icon name="minus" style={styles.iconAddAndSub} />
                                </TouchableOpacity>
                                <Text style={styles.numberOfProduct}>{number}</Text>
                                <TouchableOpacity
                                    onPress={handleNumberPlus}
                                    style={styles.btnaddSub} >
                                    <Icon name="plus" style={styles.iconAddAndSub} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        // </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        borderBottomWidth: 1,
        borderColor: Color.placeHoder,
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal:15,
        backgroundColor:'white'
    },
    header: {
        flexDirection: "row",
        marginBottom: 5
    },
    NameShop: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    leftPath: {
        flex: 0.3
    },
    rightPath: {
        flex: 0.7,
        paddingLeft: 8
    },
    discount: {
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        paddingHorizontal: 5,
        borderBottomRightRadius: 5,
        fontSize: 14 * 1.1,
        fontWeight: 'bold',
        color: 'white'
    },
    info: {
        flex: 1,
    },

    img: {
        width: '100%',
        height: 100,
        marginBottom: 7,
        alignSelf: 'center'
    },
    name: {
        fontSize: 16,
        width: '100%',
        fontWeight: '500',
        color: '#333'
    },
    money: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'red'
    },
    sale: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: Color.placeHoder
    },
    btn: {
        backgroundColor: Color.placeHoder,
        width: 140,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    textbtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.main
    },
    ChangeNumber: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btnaddSub: {
        height: 25,
        width: 25,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Color.main
    },
    iconAddAndSub: {
        fontSize: 18,
        color: Color.main,
    },
    numberOfProduct: {
        color: '#333',
        fontSize: 16
    },
    status: {
        color: 'green',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconTrash: {
        fontSize: 16,
        color: '#AAAAAA',
    }


})
export default ProductItemHz;