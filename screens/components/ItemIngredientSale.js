import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import color from '../../src/Color';
import { Colors } from 'react-native/Libraries/NewAppScreen';


function ItemIngredientSale(props) {
    const {short}=props
    const colorstatus = [
        {
            id: 'Available',
            color1: Colors.main
        },
        {
            id: 'Pre-oder',
            color1:Colors.main
        },
      ];
      
    return (
        <TouchableOpacity style={{ width:short==true?130 : 140, elevation: 10,borderRadius:10, marginHorizontal:10,marginVertical:10 }}>
            <View style={[styles.box,{height:short==true?200:230}]}>
                <Image source={{ uri: props.source }} style={styles.img} />
                {props.percent!='0%'&&
                <View style={styles.percentTage}>
                    <Text style={{ color: 'white' }}>{props.percent}</Text>
                </View>}
                <TouchableOpacity style={[styles.addCart,{top:short==true?50 : 60,left:short==true?95 : 105,}]}>
                    <MaterialCommunityIcons name='cart-plus' style={{ color: 'black',fontSize:25}}></MaterialCommunityIcons>
                </TouchableOpacity>
                <View style={styles.titleCard}>
                    <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode={'tail'}>{props.title}</Text>
                    <View style={styles.status}>
                        <Icon name='circle' style={{color:props.status=='Available'?'green':(props.status=='Sold-out'?'red':'orange')}}></Icon>
                        <Text style={{color:props.status=='Available'?'green':(props.status=='Sold-out'?'red':'orange'), marginLeft:5,fontSize:15}}>{props.status} </Text>
                    </View>
                    <Text style={styles.TextPrice}>{props.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    <View style={styles.boxStar}>
                        {Array(5).fill(0).map((item,id)=>(<AntIcon key={id} name='star' style={styles.star}></AntIcon>))}
                    </View>
                    {short==false&&<View><Text numberOfLines={1} ellipsizeMode={'tail'}>{props.promotion}</Text></View>}
                    <TouchableOpacity style={[styles.buttonBuy,{marginHorizontal:short==true?0: 10,}]}>
                        <Text style={[styles.textTitle,{color:'white'}]}>CHỌN MUA</Text>
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
        backgroundColor:'white',     
        borderRadius:10,
    },
    textTitle:{
        color:'black',
        fontSize:15,
        fontWeight:'600'
    },
    TextPrice:{
        color:'red',
        fontSize:15,
        fontWeight:'500',
    },
    img: { 
        width: '100%',
        height: '39%',
        borderTopLeftRadius:10, 
        borderTopRightRadius:10, 
    },
    cardItem: {

    },
    percentTage: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor:'red',
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        paddingVertical:2,
        paddingHorizontal:5
    },
    addCart: {
        position: 'absolute',
        top: 60,
        left: 105,
        padding:5,
        //paddingHorizontal:5,
        backgroundColor:color.backgroundMain,
        borderRadius:50
    },
    titleCard:{
        marginHorizontal:5
    },
    status:{
        color:'green',
        flexDirection:'row',
        alignItems:'center',
    },
    boxStar:{
        flexDirection:'row',
    },
    star:{
        fontSize:16,
        marginRight:5,
        color:color.colorStar
    },
    buttonBuy:{
        backgroundColor:color.main,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:1,
        padding:2
    },
})