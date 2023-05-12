import React, { useState, useEffect } from 'react';
import { Text, Animated, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductItemHz from './components/ProductItemHz';
import { useSelector } from "react-redux";
import { SwipeListView } from 'react-native-swipe-list-view';
import { DATA } from './components/DATA';
import color from '../src/Color';
const Cart = (props) => {
  const { navigation } = props
  const [totalOfMoney, setTotalOfMoney] = useState(8000000)
  const items = useSelector(state => state.cart.items);
  
  const total = items.reduce((acc, item) => acc + item.sale*item.num, 0);


  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue
    } = props;

    return (
      <Animated.View style={styles.rowBack}>
              
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={()=>{}}>
              <Animated.View
                style={
                  {alignItems:'center',
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-75, 0],
                          outputRange: [1,0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  }
                }>
                 <AntDesign name="delete" style={{fontSize:23,color:'white',marginBottom:5}}></AntDesign>
                            <Text style={styles.backTextWhite}>Xóa</Text>
              </Animated.View>
            </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };


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
        <View style={styles.flatList}>
          {DATA.length>0 ?
          <SwipeListView
            data={DATA}
            showsVerticalScrollIndicator={false}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            disableRightSwipe
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
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
        <TouchableOpacity style={styles.btnAddToCart} onPress={()=>navigation.navigate('Order')}>
          <Text style={styles.btnText}>ĐẶT HÀNG</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList:{
    backgroundColor:'white'
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height:'100%'
    //marginTop:15,
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
},
backTextWhite: {
  color: 'white',
  fontWeight:'500',
  fontSize:20
},
  container: {
    flex: 1,
  },
  header: {
    height: 55,
    backgroundColor: color.main,
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