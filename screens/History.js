import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView, FlatList,Alert } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../src/Color'
import { Dimensions } from 'react-native';
import { collection, query, doc, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/index'
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get('window');
let listdh = [];
let listTP = [];
const listTab = ['Tất cả', 'Chờ xác nhận', 'Hoàn thành', 'Đã hủy']
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function History(props) {
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const [tabSelect, setTabSelect] = useState(0);
  const [loading, setLoading] = useState(true)
  const [loadingCan, setLoadingCan] = useState(false)
  const [oder, setOrder] = useState([])
  const [thucpham, setThucpham] = useState([])
  const [listdataDis, setListdataDis] = useState([])
  const user = useSelector((state) => state.CurentUser)
  useEffect(() => {
    switch (tabSelect) {
      case 0:
        setListdataDis(listdh)
        break;
      case 1:
        setListdataDis(listdh.filter((item) => { return item.trangthai == "Chờ xác nhận" }))
        break;
      case 2:
        setListdataDis(listdh.filter((item) => { return item.trangthai == "Hoàn thành" }))
        break;
      case 3:
        setListdataDis(listdh.filter((item) => { return item.trangthai == "Đã hủy" }))
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
    const khachhangDocRef = doc(db, "KHACHHANG", user.uid);
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
      setThucpham(listTP);
      setListdataDis(listdh);
      console.log(oder + "bb")
      console.log(thucpham + "aa")
      setLoading(false);
    }, 7000)
    // return listdh
  }
  const handleCancel = async (idDonHang) => {
    setLoadingCan(true)
    try {
      const khachhangDocRef = doc(db, "KHACHHANG", user.uid);
      const donhangDocRef = doc(khachhangDocRef, "DONHANG", idDonHang);
      const docRef1 = await updateDoc(donhangDocRef, {
        trangthai: "Đã hủy"
      });
      setTimeout(()=>{
        setLoadingCan(false)
        Alert.alert("Thông báo!","Hủy đơn hàng thành công");
        navigation.goBack();
      },1000)
    } catch (error) {
      console.error(error)
    }
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

          <FlatList style={{ marginBottom: 200 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({ item, id }) =>
              <View key={id} style={{ marginVertical: 15, marginHorizontal: 10, backgroundColor: 'white', paddingHorizontal: 10, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 18 }}>Tình trạng đơn hàng:</Text>
                  <Text style={{ fontSize: 18, color: item.trangthai == "Hoàn thành" ? 'green' : (item.trangthai == "Đã hủy" ? 'red' : Color.colorStar), fontWeight: '500' }}>{item.trangthai}</Text>
                </View>
                <View style={{ borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, width: "100%" }}>
                  {thucpham.filter((itemtp, ind) => { return item.id == itemtp.id })
                    .map((itemTPh, i) => (
                      <View key={i} style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor: Color.backgroundDefault }}>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Color.backgroundDefault, borderBottomWidth: 1, marginVertical: 10, paddingBottom: 5 }}>
                  <Text style={{ fontSize: 18 }}>Tổng tiền:</Text>
                  <Text style={{ fontSize: 18, color: 'red' }}>{item.tongtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </View>
                {item.trangthai == 'Chờ xác nhận' &&
                  <View style={{ backgroundColor: Color.main }} >
                    {loadingCan==false?
                    <TouchableOpacity style={{ width: "100%", alignItems: 'center', paddingVertical: 7 }} onPress={() => { handleCancel(item.id) }}>
                      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Hủy đơn hàng</Text>
                    </TouchableOpacity>
                    :
                    <View style={{ width: "100%", alignItems: 'center', paddingVertical: 7 }} >
                      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Loading...</Text>
                    </View>}
                  </View>
                }
                {item.trangthai == 'Hoàn thành' && item.danhgia == false &&
                  <View style={{ backgroundColor: Color.main }} >
                    <TouchableOpacity style={{ width: "100%", alignItems: 'center', paddingVertical: 7 }}
                      onPress={() => { navigate("ReviewPro", { listItem: thucpham.filter((itemtp, ind) => { return item.id == itemtp.id }), idDonHang: item.id }) }}>
                      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Đánh giá</Text>
                    </TouchableOpacity>
                  </View>
                }
                {item.trangthai == 'Hoàn thành' && item.danhgia == true &&
                  <View >
                    <View style={{ width: "100%", alignItems: 'center', paddingBottom: 7 }}>
                      <Text style={{ fontSize: 18 }}>Đã hoàn thành</Text>
                    </View>
                  </View>
                }
              </View>
            }
            data={listdataDis}
            keyExtractor={item => item.diachigiao}>
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