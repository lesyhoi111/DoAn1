import React, { useState, useEffect, useContext } from 'react';
import { Text, Animated, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductItemHz from './components/ProductItemHz';
import { useSelector } from "react-redux";
import { SwipeListView } from 'react-native-swipe-list-view';
// import { DATA } from './components/DATA';
import color from '../src/Color';
import { collection, query, documentId, getDocs, doc, where } from "firebase/firestore";
import { db } from '../firebase/index'
import { MyContext } from '../App';
import { async } from '@firebase/util';
let result=[];
const Cart = (props) => {
  const { navigation } = props
  // const [listId, setListId] = useState([]);
  const { listdata,shop,listuser } = useContext(MyContext);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const items = useSelector(state => state.cart.items);

  const total = items.reduce((acc, item) => acc + ((item.product.giagoc*(100-item.product.giamgia)/100)*item.num), 0);

  useEffect(() => {
    console.log("use")
    getlistmatp();
    // getdata();
    // getListShop();
  }, [])

  const getlistmatp = async () => {
    setLoading(true)
    try {
      console.log("getlistmatp1")
      const khachhangDocRef = doc(db, "KHACHHANG", "R3XHZJR4TzNnEMm7ldOX");
      const giohangCollectionRef = collection(khachhangDocRef, "GIOHANG");
      const querySnapshot = await getDocs(giohangCollectionRef);
      result = await querySnapshot.docs.map((doc) => doc.data());
     
        setTimeout(() => {
          getdata(result);
          // setLoading(false)
          },3000)
    } catch (error) {
      console.error(error)
    }

  }

  // const getListShop = async () => {
  //   try {
  //     const matpList = listId.map((item) => item.matp);
  //     console.log(matpList)
  //     const thucphamRef = collection(db, "CUAHANG");
  //     const thucphamQuery = query(thucphamRef,);
  //     const querySnapshot = await getDocs(thucphamQuery);
  //     const results = [];
  //     querySnapshot.forEach((doc) => {
  //       results.push({ id: doc.id, ...doc.data() });
  //       console.log(doc.id)
  //   });
  //     setShop(results)
  //     console.log(Data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const getdata = async (listId) => {
    try {
     setLoading(true)
      const matpList = listId.map((item) => item.matp);
      console.log(matpList)
      const thucphamRef = collection(db, "THUCPHAM");
      const thucphamQuery = query(
        thucphamRef,
        where(documentId(), "in", matpList)
      );
      const querySnapshot = await getDocs(thucphamQuery);
      const thucphamList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setTimeout(() => {
        setData(thucphamList);
        console.log(Data)
        setLoading(false)
        },1000)
    } catch (error) {
      console.error(error)
    }
  }

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue
    } = props;

    return (
      <Animated.View style={styles.rowBack}>

        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => { }}>
          <Animated.View
            style={
              {
                alignItems: 'center',
                transform: [
                  {
                    scale: swipeAnimatedValue.interpolate({
                      inputRange: [-75, 0],
                      outputRange: [1, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }
            }>
            <AntDesign name="delete" style={{ fontSize: 23, color: 'white', marginBottom: 5 }}></AntDesign>
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

  const getNameShop = (item) => {
    const itemThis = shop.find((itemid, index) => {
      return item.mach == itemid.id
    })
    return itemThis
  }

  const soluong = (item) => {
    const itemThis =  result.find((itemid, index) => {
      return item.id == itemid.matp
    })
    return itemThis.soluong
  }

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
          {loading==false?  Data.length > 0 ?
            <SwipeListView
              data={Data}
              showsVerticalScrollIndicator={false}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-75}
              disableRightSwipe
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              renderItem={({ item }) => <ProductItemHz
                onPress={() => navigation.navigate('ProductDetail',
                  {itemDetail : item ,
                  shopOfPro:getNameShop(item)
                    }
                )}
                item={item}
                num={soluong(item)}
                shop={getNameShop(item)}
              />}
              keyExtractor={item => item.id}
            />
            :
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Image style={{ height: 150, width: 150 }} source={require('../src/images/NotMyCart.png')}></Image>
              <Text style={{ color: '#333', fontSize: 20, textAlign: 'center' }}>Giỏ hàng của bạn hiện không có sản phẩm nào!</Text>
            </View>
            :
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text style={{ color: '#333', fontSize: 20, textAlign: 'center' }}>Loading</Text>
            </View>
          }
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_money}>
          <Text style={styles.totalOfMoney}>Tổng tiền</Text>
          <Text style={styles.money}>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity style={styles.btnAddToCart} onPress={() => navigation.navigate('Order')}>
            <Text style={styles.btnText}>ĐẶT HÀNG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: 'white'
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: '100%'
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
    fontWeight: '500',
    fontSize: 20
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
    flex: 0.5,
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
    width: 180
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