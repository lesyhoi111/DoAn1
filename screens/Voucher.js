import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../src/Color'
import { collection, query, documentId, getDocs, doc, where } from "firebase/firestore";
import { db } from '../firebase/index'
import Lottie from 'lottie-react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const listTab = ['Phiếu vận chuyển', 'Phiếu giảm giá']
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function Voucher(props) {
  const [tabSelect, setTabSelect] = useState("");
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const { user } = route.params
  const [isloading, setIsloading] = useState(false);
  const [listVou, setListVou] = useState([]);


  useEffect(() => {
    getlistVou();
  }, [])

  const getlistVou = async () => {
    setIsloading(true);
    const dataFb = user.magiamgiadadung;
    const listid = Object.keys(dataFb);
    console.log(dataFb)
    console.log(listid)
    try {
      console.log("getvou")
      const CollectionRef = collection(db, "MAGIAMGIA");
      const Query = query(CollectionRef);
      const querySnapshot = await getDocs(Query);
      const result = await querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTimeout(() => {
        setListVou(result.filter((item) => { console.log(item.id); return listid.includes(item.id.trim()) }))
        setIsloading(false)
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => goBack()}>
          <Icon name="arrow-left" style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.header_login}>Phiếu giảm giá</Text>
        <View></View>
      </View>
      <View style={styles.box_recipe}>
        {listTab.map((tab, id) => (
          <TouchableOpacity key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle, { borderBottomWidth: tabSelect == id ? 5 : 0 }]}>
            <Text style={[styles.text_title, { color: tabSelect == id ? 'black' : 'white' }]} numberOfLines={1}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isloading==false?
      <ScrollView style={{ width: '100%' }}>
        {listVou.filter((item, index) => { return item.loaigiamgia == (tabSelect == 0 ? "freeship" : "discount") })
          .map((item, index) => (
            <TouchableOpacity key={index} style={{ marginHorizontal: 10, borderWidth: 1, borderColor: '#d0d7de', flexDirection: 'row', marginTop: 10 }}
              onPress={() => { }}>
              {item.loaigiamgia == 'freeship' ?
                <View style={{ height: 100, backgroundColor: 'lightseagreen', width: 110 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 15, alignSelf: 'center', fontStyle: 'italic' }}>FREE</Text>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8, alignSelf: 'center', fontStyle: 'italic' }}>SHIP</Text>
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', alignSelf: 'center' }}>Mã vận chuyển</Text>
                </View>
                :
                <View style={{ height: 100, backgroundColor: 'tomato', width: 110 }}>
                  <Icon name='shopping-bag' style={{ fontSize: 50, color: 'white', alignSelf: 'center', marginTop: 15, marginBottom: 8 }}></Icon>
                  <Text style={{ color: 'tomato', fontSize: 20, fontWeight: 'bold', position: 'absolute', top: 40, left: 43 }}>HD</Text>
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', alignSelf: 'center' }}>Mã giảm giá</Text>
                </View>
              }
              <View style={{ paddingVertical: 10, paddingLeft: 10, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }} numberOfLines={2} ellipsizeMode={'tail'}>{item.tenma}</Text>
                <Text style={[styles.content_mini, { fontSize: 15 }]}>Đơn hàng tối thiểu {item.dieukiendonhang.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.content_mini}>BĐ: {item.ngaybatdau}</Text>
                  <Text style={styles.content_mini}>KT: {item.ngayketthuc}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      :
      <View style={{ width: width, height: height-100 }}>
                    <Lottie source={require('../src/Lottie/loading.json')} autoPlay loop />
                </View>}
    </SafeAreaView>
  )
};
export default Voucher;

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: Color.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: Color.main,
    flexDirection: 'row'
  },
  itemTitle: {
    width: width / 2,
    paddingVertical: 8,
    borderBottomColor: Color.backgroundMain,
    alignItems: 'center'
  },
  text_title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500'
  }

})