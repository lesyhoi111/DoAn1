import React, { useState } from 'react';
import { Text,Image, StyleSheet, FlatList, View,ScrollView, ImageBackground,Dimensions, TextInput, TouchableOpacity } from 'react-native';
import color from '../src/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailedInformation from './components/DetailedInformation'
import ListComment from './components/ListComment'
import ItemIngredientSale from './components/ItemIngredientSale'
import {DATA} from './components/DATA'
const { width } = Dimensions.get('window');
const ProductDetail = (props) => {
    const { navigation } = props
    const [rating, setRating] = useState(0);
    const [follow,setFollow] =useState(false)
    const handleRating = (value) => {
        setRating(value);
    }

   

  return (
      <View style={styles.container}>
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
          <ScrollView style={styles.content}>
              <Image
                  style={styles.productImg}
                  resizeMode='cover'
                  source={{ uri: 'https://cdn.tgdd.vn/Products/Images/7460/286302/bhx/loc-10-tang-2-banh-flan-caramel-trung-sua-yess-hu-nho-50g-202209011058345825_300x300.png' }}
              />
              <View style={{backgroundColor:'white',padding:7,}}>
              <Text umberOfLines={2} style={styles.productName}>Bánh đậu xanh cao cấp</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((item) => (
                      <TouchableOpacity key={item} onPress={() => handleRating(item)}>
                          <Icon
                              name={"star"}
                              size={20}
                              color={rating >= item ? '#FFD700' : '#D3D3D3'}
                              style={{ marginRight: 5 }}
                          />
                      </TouchableOpacity>
                  ))}
                  <Text style={{ marginLeft: 5,fontSize:20 }}>{rating}</Text>
                  <View style={{width:1,height:'100%',backgroundColor:'#AAAAAA',marginHorizontal:10}}></View>
                  <Text style={{fontSize:15,alignSelf:'center'}}>9000 Đã Bán</Text>
              </View>
              <View style={styles.priceRow}>
                  <Text style={styles.price}>139.000đ</Text>   
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                      <TouchableOpacity style={styles.btnshareAndHeart}>
                      <MaterialCommunityIcons name='cart-plus' style={[styles.iconsaveAndHeart,{fontSize:25}]}>
                        </MaterialCommunityIcons>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnshareAndHeart}>
                          <Icon name="share" style={styles.iconsaveAndHeart} />
                      </TouchableOpacity>
                  </View>
              </View>
              <Text style={styles.originalPrice}>209.000đ</Text>
              </View>
              <TouchableOpacity style={{backgroundColor:'white',marginVertical:10,padding:10,flexDirection:'row'}} onPress={()=>navigation.navigate('Store')}>
                    <Image style={styles.imgShop} source={require('../src/images/sale.png')}></Image>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'black'}}>Shop AbC</Text>
                        <View flexDirection={"row"}>
                            <Text>4.9</Text>
                            <Icon
                              name={"star"}
                              size={15}
                              color={'#FFD700'}
                              style={{ marginRight: 5,alignSelf:"center" }}
                          />
                          <View style={{width:1,height:'100%',backgroundColor:'#AAAAAA',marginHorizontal:5}}></View>
                          <Text>99 Sản Phẩm</Text>
                        </View>
                    </View>
                    <View flex={1}></View>
                    <TouchableOpacity style={{alignSelf:'center',paddingVertical:5,borderWidth:1,borderColor:follow==false?'orange':'#AAAAAA'}} onPress={()=>setFollow(!follow)}>
                        {follow==false?
                        <Text style={{color:'black',marginHorizontal:15}}>THEO DÕI</Text>
                        :
                        <Text style={{marginHorizontal:5}}>ĐÃ THEO DÕI</Text>
                    }
                    </TouchableOpacity>
              </TouchableOpacity>
              {/* <Text style={styles.info}>Thông tin sản phẩm:</Text>
                <Text style={styles.infoContent}>Vivamus pulvinar venenatis nunc et faucibus. Proe.</Text> */}
                <View>
                    <Text style={{paddingLeft:10,fontSize:17,color:'black',fontWeight:'500'}}>Sản phẩm khác của cửa hàng:</Text>
                <FlatList horizontal={true}
            data={DATA}
            renderItem={({item})=><ItemIngredientSale source={item.image} title={item.name} percent={item.percent} status={item.status} starpoint={item.starpoint} price={item.price} promotion={item.promotion} short={true}></ItemIngredientSale>}
            keyExtractor={item=>item.id}></FlatList>
                </View>
                <View style={{backgroundColor:'white'}}>
                    <DetailedInformation></DetailedInformation>
                </View>
                <View style={{backgroundColor:'#f2f2f2',height:10,width:'100%'}}></View>
                <View style={{backgroundColor:'white'}}>
                    <ListComment></ListComment>
                </View>
                <View style={{backgroundColor:'#f2f2f2',height:20,width:'100%'}}></View>
          </ScrollView>
          <View style={styles.footer}>
              <TouchableOpacity style={styles.btnaddSub} >
                  <Icon name="minus" style={styles.iconAddAndSub} />
              </TouchableOpacity>
              <Text style={styles.numberOfProduct}>1</Text>
              <TouchableOpacity style={styles.btnaddSub} >
                  <Icon name="plus" style={styles.iconAddAndSub} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAddToCart}>
                  <Text style={styles.btnPrice}>165.000đ</Text>
                  <Text style={styles.btnText}>THÊM VÀO GIỎ HÀNG</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:62,
        // backgroundColor:'#ffffff'
    },
    header: {
        backgroundColor: color.backgroundMain,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    back_Icon: {
        color: '#fff',
        fontSize: 22,
    },
    btnIcon: {
        padding: 17,
    },
    shoppingCart_Icon: {
        fontSize:19,
        color: '#fff'
    },
    quantity: {
        backgroundColor: 'red',
        width: 14,
        height: 14,
        borderRadius: 7,
        textAlign: 'center',
        color: '#fff',
        position: 'absolute',
        top: 12,
        right: 17,
        fontSize: 10
    },
    content:{
        // padding:7,
    },
    imgShop:{
        height:60,
        width:60,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#AAAAAA',
        marginRight:15,
        marginLeft:5
    },
    productImg:{
        width:(width/2+10),
        height: (width/2+10),
        alignSelf:'center',
        margin:20
    },
    productName:{
        fontSize:22,
        fontWeight:'bold',
        color:'#333'
    },
    priceRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    price:{
        fontSize:20,
        color:'red',//color.main,
        fontWeight:'bold'
    },
    originalPrice:{
        fontSize:17,
        textDecorationLine:'line-through',
        color:color.placeHoder
    },
    iconsaveAndHeart:{
        fontSize:18,
        paddingHorizontal:5,
        alignSelf:'center'
    },
    btnshareAndHeart:{
        margin:2,
        padding:4
    },
    info:{
        color:'#333',
        fontWeight:'bold',
        fontSize:18,
    },
    infoContent:{
        color:'#333',
        fontSize:18
    },
    footer:{
        height:65,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:7,
        backgroundColor:'white'
    },
    btnAddToCart:{
        flex:1,
        backgroundColor:color.main,
        height:'90%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7
    },
    btnaddSub:{
        height:30,
        width:30,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:17,
        borderColor:color.main
    },
    btnPrice:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
    },
    btnText:{
        fontSize:16,
        color:'#fff',
    },
    iconAddAndSub:{
        fontSize:18,
        color:color.main,
    },
    numberOfProduct:{
        fontSize:18,
        fontWeight:'bold', 
        marginHorizontal:5,
        color:'#333'
    }
});

export default ProductDetail;