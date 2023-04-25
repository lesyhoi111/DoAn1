import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProductItemHz from './components/ProductItemHz';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DATA } from './components/DATA';
import color from '../src/Color';
const Cart = (props) => {
  const { navigation } = props
  const [totalOfMoney, setTotalOfMoney] = useState(8000000)
  const items = useSelector(state => state.cart.items);
  // useEffect(() => {
  //   const sum = DATA.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue.price;
  //   }, 0);
  //   setTotalOfMoney(sum)
  // }, [])
  const total = items.reduce((acc, item) => acc + item.sale, 0);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}>
          <Icon name="arrow-left" style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.header_login}>Giỏ hàng của bạn</Text>
        <View></View>
      </View>
      <View style={styles.content}>
        <View style={styles.FlatList}>
          {DATA.length>0 ?
          <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ProductItemHz
              onPress={() => navigation.navigate('ProductDetail', {
                discount: item.percent,
                name: item.name,
                price: item.price,
                sale: item.sale,
                uri: item.image,
                descrt: item.description,
                status: item.status,
              })}
              id={item.id}
              discount={item.percent}
              name={item.name}
              price={item.price}
              sale={item.sale}
              uri={item.image} 
              status={item.status}/>}
            keyExtractor={item => item.name}
          />
          :
          <View style={{alignItems:'center',width:'100%'}}>
            <Image style={{height:150,width:150}} source={require('../src/images/NotMyCart.png')}></Image>
            <Text style={{ color: '#333', fontSize: 20,textAlign:'center' }}>Giỏ hàng của bạn hiện không có sản phẩm nào!</Text> 
          </View>
          }
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_money}>
          <Text style={styles.totalOfMoney}>Tổng tiền</Text>
          <Text style={styles.money}>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
        </View>
        <View style={{flex: 1,alignItems:'center'}}>
        <TouchableOpacity style={styles.btnAddToCart}>
          <Text style={styles.btnText}>ĐẶT HÀNG</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 55,
    backgroundColor: color.backgroundMain,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  header_login: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: color.backgroundMain
  },
  footer_money: {
    flex:0.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  totalOfMoney: {
    fontSize: 16,
    color: '#333'
  },
  money: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.main
  },
  btnAddToCart: {
    backgroundColor: color.main,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width:180
  },
  btnText: {
    fontSize: 19,
    color: '#fff',
    fontWeight: 'bold'
  },
  btnBack: {
    padding: 5
  },
  iconBack: {
    color: '#fff',
    fontSize: 20
  },
});

export default Cart;