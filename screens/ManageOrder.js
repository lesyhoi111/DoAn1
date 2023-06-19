import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../src/Color'
import {
  collection,
  db,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  query
} from "../firebase/firebase";
import Lottie from 'lottie-react-native';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignOut } from './components/Redux/CurentUserSlice';
const listTab = ['Tất cả', 'Chờ xác nhận', 'Hoàn thành', 'Đã hủy']
function ManageOrder(props) {
  const {navigation}= props
  const [tabSelect, setTabSelect] = useState(0);
  const [order, setOrder] = useState([])
  const [thucpham, setThucpham] = useState([])
  const [listdataDis, setListdataDis] = useState([])
  const [isloading, setIsloading] = useState(false)
  let a = 0;
  const { width, height } = Dimensions.get('window')
  const dispatch = useDispatch()
  useEffect(() => {
    switch (tabSelect) {
      case 0:
        setListdataDis(order)
        break;
      case 1:
        setListdataDis(order.filter((item) => { return item.trangthai == "Chờ xác nhận" }))
        break;
      case 2:
        setListdataDis(order.filter((item) => { return item.trangthai == "Hoàn thành" }))
        break;
      case 3:
        setListdataDis(order.filter((item) => { return item.trangthai == "Đã hủy" }))
        break;
      default:
        setListdataDis(order)
    }
    setIsloading(false);
  }, [tabSelect, order])
  useEffect(() => {
    getListorder()
  }, [])
  const getListorder = async () => {
    const querySnapshot = await getDocs(collection(db, "KHACHHANG"));
    const Listdh = [];
    const ListTP = [];
    for (const doc of querySnapshot.docs) {
      const querySnapshot1 = await getDocs(collection(doc.ref, "DONHANG"));
      for (const innerDoc of querySnapshot1.docs) {
        Listdh.push({ id: innerDoc.id, ...innerDoc.data(), idUser: doc.id });
        const querySnapshot2 = await getDocs(collection(innerDoc.ref, "THUCPHAM"));
        for (const tpDoc of querySnapshot2.docs) {
          ListTP.push({ id: tpDoc.id, idDonHang: innerDoc.id, ...tpDoc.data() });
        }
      }
    }
    setOrder(Listdh);
    setThucpham(ListTP)
  }
  const handleConfirmOrder = async (idUser, idOrder) => {
    try {
      setIsloading(true)
      const orderRef = doc(db, `KHACHHANG/${idUser}/DONHANG/${idOrder}`);
      await updateDoc(orderRef, {
        trangthai: "Hoàn thành"
      });
      getListorder()
    } catch (error) {
      console.log(error)
    }
  }
  const removeItemFromStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        dispatch(SignOut(null));
        console.log('Item removed successfully.');
        navigation.navigate('Login')
    } catch (error) {
        console.log('Error removing item from AsyncStorage:', error);
    }
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {order.length > 0 && thucpham.length > 0 ?

        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {isloading ? <View style={{ width: width, height: height, position: 'absolute', zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <Lottie source={{ uri: 'https://assets10.lottiefiles.com/packages/lf20_rwq6ciql.json' }} autoPlay loop />
          </View> : null}
          <TouchableOpacity onPress={()=>removeItemFromStorage('user')} style={{ width: 40, height: 40, position: 'absolute', zIndex: 1, top: 10, right: 10, borderRadius: 20, backgroundColor: 'rgba(0,255,255,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="logout" style={{ fontSize: 20, color: '#fff', marginLeft: 3 }}></MaterialCommunityIcons>
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.header_login}>Xác nhận đơn hàng</Text>
            <View></View>
          </View>
          <View style={styles.box_recipe}>
            <ScrollView horizontal>
              {listTab.map((tab, id) => (
                <TouchableOpacity key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle, { borderBottomWidth: tabSelect == id ? 5 : 0 }]}>
                  <Text style={[styles.text_title, { color: tabSelect == id ? 'black' : 'white' }]} numberOfLines={1}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <FlatList showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              <View keyExtractor={item => item.id} style={{
                backgroundColor: 'white',
                padding: 15,
                borderWidth: 0.5,
                borderColor: Color.main,
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 5,
                shadowColor: Color.main,
                elevation: 5,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 10,
                shadowOpacity: 0.7
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 18, color: '#333' }}>Tình trạng đơn hàng:</Text>
                  <Text style={{ fontSize: 18, color: item.trangthai == "Hoàn thành" ? 'green' : (item.trangthai == "Đã hủy" ? 'red' : Color.colorStar), fontWeight: '500' }}>{item.trangthai}</Text>
                </View>
                <View style={{ borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, width: "100%" }}>
                  {thucpham
                    .filter((itemtp) => itemtp.idDonHang === item.id)
                    .map((itemTPh) => (
                      <View key={itemTPh.id} style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor: Color.backgroundDefault }}>
                        <Text style={{ fontSize: 18, color: 'black', flex: 1 }} numberOfLines={2} ellipsizeMode="tail">
                          {itemTPh.ten}
                        </Text>
                        <View>
                          <Text style={{ fontSize: 18, color: 'black' }}>{itemTPh.giatien}</Text>
                          <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 18, color: 'black' }}>x{itemTPh.soluong}</Text>
                          </View>
                        </View>
                      </View>
                    ))}

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, marginVertical: 10, paddingBottom: 5 }}>
                  <Text style={{ fontSize: 18, color: '#333' }}>Tổng tiền:</Text>
                  <Text style={{ fontSize: 18, color: 'red' }}>{item.tongtien/* .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) */}</Text>
                </View>
                {item.trangthai == 'Chờ xác nhận' &&
                  <View >
                    <TouchableOpacity
                      onPress={() => handleConfirmOrder(item.idUser, item.id)}
                      style={{ width: "100%", alignItems: 'center', padding: 10, backgroundColor: Color.main, borderRadius: 10, }}>
                      <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Xác nhận đơn hàng</Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            }
            data={listdataDis}
            keyExtractor={item => item.id}>
          </FlatList>
        </View> :
        <View style={{ flex: 1 }}>
          <Lottie source={{ uri: 'https://assets10.lottiefiles.com/packages/lf20_rwq6ciql.json' }} autoPlay loop />
        </View>}
    </SafeAreaView>
  )
};
export default ManageOrder;

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: Color.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  btnBack: {
    padding: 5
  },
  iconBack: {
    color: '#fff',
    fontSize: 20
  },
  header_login: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  box_recipe: {
    height: 60,
    backgroundColor: Color.main,
    flexDirection: 'row',
  },
  itemTitle: {
    paddingHorizontal: 17.45,
    paddingVertical: 8,
    borderBottomColor: Color.backgroundMain
  },
  text_title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500'
  }

})