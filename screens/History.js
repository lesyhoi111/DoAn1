import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../src/Color'
import { Dimensions } from 'react-native';
import { collection, query, doc, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/index'
import { async } from '@firebase/util';
const { width, height } = Dimensions.get('window');
let listdh = [];
let listTP = [];
const listTab = ['Tất cả', 'Chờ xác nhận', 'Hoàn thành', 'Đã hủy']
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function History(props) {
  const [tabSelect, setTabSelect] = useState(0);
  const [loading, setLoading] = useState(true)
  const [oder, setOrder] = useState([])
  const [thucpham, setThucpham] = useState([])
  const [listdataDis, setListdataDis] = useState([])
  let a=0;
  useEffect(() => {
    switch (tabSelect) {
      case 0:
        setListdataDis(listdh)
        break;
      case 1:
        setListdataDis(listdh.filter((item) => { return item.trangthai == "Chờ xác nhận" }))
        break;
      case 2:
        setListdataDis(listdh.filter((item) => { return item.maloaitp == "Hoàn thành" }))
        break;
      case 3:
        setListdataDis(listdh.filter((item) => { return item.maloaitp == "Đã hủy" }))
        break;
      default:
        setListdataDis(listdh)
    }

  }, [tabSelect])

  useEffect(() => {

    getListOder();
  }, [])

  
  const getListOder = async () => {
    setLoading(true);
    const khachhangDocRef = doc(db, "KHACHHANG", "R3XHZJR4TzNnEMm7ldOX");
    const giohangCollectionRef = collection(khachhangDocRef, "DONHANG");

    const q = query(giohangCollectionRef);
    listdh = [];
    listTP = [];
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        console.log("123456")
        
        await listdh.push({ id: doc.id, ...doc.data() })
        const thucPhamRef = collection(doc.ref, 'THUCPHAM');
        const q2 = query(thucPhamRef);
        await onSnapshot(q2, (snapshot) => {
          snapshot.forEach(async (doc2) => {
            console.log(doc2.data())
            await listTP.push({ id: doc.id, ...doc2.data() })
            console.log(listdh)

          });
        })
      
        // setTimeout(async () => {
        //   console.log(listTP);
        //   console.log(listdh[0].listThucPham)
        //   console.log(listdh)
        // }, 500)

      });
    })
    setTimeout(() => {
      // setOrder(listdh)
      // console.log("111"+ oder[0].listThucPham)
      // console.log("111" +oder[0].listThucPham[0].giatien)
      setOrder(listdh);
      setThucpham(listdh);
      console.log(oder+"bb")
      console.log(thucpham+"aa")
      setLoading(false);
    }, 7000)
    // return listdh
  }

  return (
    <SafeAreaView>
      {loading == false ?
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => props.navigation.goBack()}>
              <Icon name="arrow-left" style={styles.iconBack} />
            </TouchableOpacity>
            <Text style={styles.header_login}>Lịch sử mua hàng</Text>
            <View></View>
          </View>
          <ScrollView style={styles.box_recipe} horizontal>
            {listTab.map((tab, id) => (
              <TouchableOpacity key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle, { borderBottomWidth: tabSelect == id ? 5 : 0 }]}>
                <Text style={[styles.text_title, { color: tabSelect == id ? 'black' : 'white' }]} numberOfLines={1}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FlatList showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item, id }) =>
              <View key={id} style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: 'white', paddingHorizontal: 10, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 18 }}>Tình trạng đơn hàng:</Text>
                  <Text style={{ fontSize: 18, color: 'red', fontWeight: '500' }}>{item.trangthai}</Text>
                </View>
                <View style={{ borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, width: "100%" }}>
                  {listTP.filter((itemtp, ind) => {  return item.id == itemtp.id })
                    .map((itemTPh, i) => (
                      <View key={i} style={{  marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between',marginHorizontal:10,borderBottomWidth:1,borderBottomColor:Color.backgroundDefault }}>
                        <Text style={{ fontSize: 18, color: 'black', flex: 1 }} numberOfLines={2} ellipsizeMode={'tail'}>
                          {itemTPh.ten}</Text>
                        <View style={{}}>
                          <Text style={{ fontSize: 18, color: 'black' }}>{itemTPh.giatien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                          <View style={{ alignItems: 'flex-end' }}>
                            <Text>x{itemTPh.soluong}</Text>
                          </View>
                        </View>
                        
                      </View>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, marginVertical:10,paddingBottom:5 }}>
                  <Text style={{ fontSize: 18 }}>Tổng tiền:</Text>
                  <Text style={{ fontSize: 18, color: 'red' }}>{item.tongtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </View>
                {item.trangthai=='Chờ xác nhận' &&
                <View >
                  <TouchableOpacity style={{width:"100%",alignItems:'center',paddingBottom:5}}>
                      <Text style={{ fontSize: 18 }}>Hủy đơn hàng</Text>
                  </TouchableOpacity>
                </View>
                }
              </View>
            }
            data={listdataDis}
            keyExtractor={item => item}>
          </FlatList>
        </View> :
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 25 }}>loading</Text>
        </View>}
    </SafeAreaView>
  )
};
export default History;

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