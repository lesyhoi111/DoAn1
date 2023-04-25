import React, { PureComponent, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, ViewBase, FlatList, Image, TouchableOpacity } from 'react-native'
import color from '../../src/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DATA} from './DATA'
const listTab = ['All Ingredient', 'Meat,Fish,Egg,Seafood', 'Vegetable,Mushroom,fruit', 'Spice,Cooking oil', 'Beverage,Beer', 'Milk', 'Confectionery'];
function TapRecipe(props) {
  const [tabSelect, setTabSelect] = useState(0);
  const [addcard,setAddCard] =useState(false);

  
  // const DATA = [
  //   {
  //       id: '001',
  //       name: 'Trứng gà HoHoFood 10 quả',
  //       image: '../../src/images/egg.png',
  //       percent: '10%',
  //       status: 'Available',
  //       price: 27000,
  //       starpoint: 4,
  //       promotion: 'Mua 3 tính tiền 4 giao 1'
  //   },
  //   {
  //       id: '002',
  //       name: 'Cá hồi biển AoMaCaNaDaFood 1kg',
  //       image: '../../src/images/fish.png',
  //       percent: '15%',
  //       status: 'Pre-order',
  //       price: 90000,
  //       starpoint: 4,
  //       promotion: 'Mua 3 giao hàng 3'
  //   },
  //   {
  //       id: '003',
  //       name: 'Đậu gì chả biết alolaco 0.5kg nhưng cân bị hư',
  //       image: '../../src/images/spice.png',
  //       percent: '5%',
  //       status: 'Sold-out',
  //       price: 10000,
  //       starpoint: 5,
  //       promotion: ''
  //   },
  //   {
  //     id: '004',
  //     name: 'Đậu gì chả biết alolaco 0.5kg nhưng cân bị hư',
  //     image: '../../src/images/spice.png',
  //     percent: '5%',
  //     status: 'Sold-out',
  //     price: 10000,
  //     starpoint: 5,
  //     promotion: ''
  // },
  // ];
  const renderlist = ({ item }) => {
    return (
      <View style={styles.boxitem}>
        <Image source={{uri:item.image}} style={styles.img}></Image>
        <View style={styles.titleBox}>
          <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
          <View flexDirection='row' >
            <View flex={2}>
              <Text style={styles.TextPrice}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
              <View style={styles.status}>
                <Icon name='circle' style={{ color:item.status=='Available'?'green':(item.status=='Sold-out'?'red':'orange') }}></Icon>
                <Text style={{color:item.status=='Available'?'green':(item.status=='Sold-out'?'red':'orange'), marginLeft:5,fontSize:15}}>{item.status} </Text>
              </View>
            </View>

            {/* <View style={styles.iconbox}> */}
              <View flex={1} ></View>
              <TouchableOpacity style={styles.addCart} onPress={()=>{setAddCard(!addcard)}}>
              <MaterialCommunityIcons name='cart-plus' style={{ color: 'black',fontSize:25}}></MaterialCommunityIcons>
              </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </View>
    )
  }
  return (
    <View>
      <View style={{ marginTop: 5, marginHorizontal: 5 }}>
        <ScrollView horizontal contentContainerStyle={styles.ScrollView} >
          <View style={styles.box}>
            {listTab.map((tab, id) => (
              <Pressable key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle,tabSelect == id && {backgroundColor:color.main}]}>
                <Text style={[styles.text,tab.length<10 &&{width:'auto'} ,tabSelect == id && { color: 'white',width:'auto'}]} numberOfLines={1}>{tab}</Text>
                {/* {tabSelect == id && <View style={styles.underline}></View>} */}
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      <FlatList showsVerticalScrollIndicator={false} 
      scrollEnabled={false}
      renderItem={({item})=>renderlist({item})} 
      data={DATA} 
      keyExtractor={item=>item.id}>
      </FlatList>
    </View>
  )
}

export default TapRecipe;
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  itemTitle:{
    backgroundColor:'white', 
    marginHorizontal:10,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    fontSize: 17,
    color: 'gray',
    marginHorizontal: 10,
    marginVertical:5,
    width:100,
    fontWeight:'400',
    color:'black',
    textAlign:'center'
  },
  underline: {
    height: 2,
    backgroundColor: 'green',
    width: 50,
    alignSelf: 'center',
    marginRight: 25,
    marginTop: 2,
  },
  img: {
    flex: 1,
    height: 85,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  boxitem: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    //borderWidth:1
    //width: '95%',
  },
  titleBox: {
    flex: 1.4,
  },
  textTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 5
  },
  iconbox: {
    flex: 0.3,
    backgroundColor:'red'
  },
  TextPrice: {
    color: 'red',
    fontSize: 17,
    fontWeight: '500',
    paddingLeft: 5
  },
  status: {
    color: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  addCart: {
    marginRight:5,
    justifyContent:'center',
    alignItems:'center'
  },
})
