import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import color from '../../src/Color';
import { Colors } from 'react-native/Libraries/NewAppScreen';


function ItemIngredientSale(props) {
    const { short, item, onPress, onPressCartPlus } = props


    return (
        <TouchableOpacity
            style={{ width: short == true ? 130 : 140, elevation: 10, borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}
            onPress={onPress}>
            <View style={[styles.box, { height: short == true ? 200 : 230 }]}>
                <Image source={{ uri: item.image }} style={styles.img} />
                {item.giamgia > 0 &&
                    <View style={styles.percentTage}>
                        <Text style={{ color: 'white' }}>{item.giamgia}%</Text>
                    </View>}
                <TouchableOpacity onPress={onPressCartPlus} style={[styles.addCart, { top: short == true ? 50 : 60, left: short == true ? 95 : 105, }]}>
                    <MaterialCommunityIcons name='cart-plus' style={{ color: 'black', fontSize: 25 }}></MaterialCommunityIcons>
                </TouchableOpacity>
                <View style={styles.titleCard}>
                    <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode={'tail'}>{item.ten}</Text>
                    <View style={styles.status}>
                        <Icon name='circle' style={{ color: item.trangthai == 'Available' ? 'green' : (item.trangthai == 'Sold-out' ? 'red' : 'orange') }}></Icon>
                        <Text style={{ color: item.trangthai == 'Available' ? 'green' : (item.trangthai == 'Sold-out' ? 'red' : 'orange'), marginLeft: 5, fontSize: 14 }}>{item.trangthai} </Text>
                    </View>
                    <Text style={styles.TextPrice}>{item.giagoc}</Text>
                    <View style={styles.boxStar}>
                        {Array(5).fill(0).map((_, id) => (<AntIcon key={id} name='star' style={[styles.star, { color: ((id + 1) <= item.sosao) ? color.colorStar : color.placeHoder }]}></AntIcon>))}
                        <Text>{item.sosao}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>Đã bán: {item.soluongdaban}</Text>
                    </View>
                    <TouchableOpacity style={[styles.buttonBuy, { marginHorizontal: short == true ? 0 : 10, }]}>
                        <Text style={[styles.textTitle, { color: 'white' }]}>CHỌN MUA</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemIngredientSale;
const styles = StyleSheet.create({
    box: {
        position: 'relative',
        height: 230,
        //shadowColor:'black',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    textTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600'
    },
    TextPrice: {
        color: 'red',
        fontSize: 15,
        fontWeight: '500',
    },
    img: {
        width: '100%',
        height: '39%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardItem: {

    },
    percentTage: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 5
    },
    addCart: {
        position: 'absolute',
        top: 60,
        left: 105,
        padding: 5,
        //paddingHorizontal:5,
        backgroundColor: color.backgroundMain,
        borderRadius: 50
    },
    titleCard: {
        marginHorizontal: 5,
        height: '61%',
    },
    status: {
        color: 'green',
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxStar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    star: {
        fontSize: 14,
        marginRight: 4,
        color: color.colorStar
    },
    buttonBuy: {
        backgroundColor: color.main,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
        padding: 2,
        justifyContent: 'flex-end'
    },
})