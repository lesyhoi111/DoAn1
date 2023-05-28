import React, { PureComponent, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, ViewBase, FlatList, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import color from '../../src/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, query, where, getDocs, orderBy, limit, setDoc, doc } from "firebase/firestore";
import { db } from '../../firebase/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
const listTab = ['Tất cả', 'Thịt,cá,trứng,hải sản', 'Rau,củ,quả,trái cây', 'Dầu ăn,nước chấm,gia vị', 'Nước ngọt,bia,sữa', 'Gạo,bột,đồ khô', 'Kem,thực phẩm đông lạnh'];
function TapRecipe(props) {
  const { navigation } = props
  const [tabSelect, setTabSelect] = useState(0);
  const [addcard, setAddCard] = useState(false);

  const [listdata, setListdata] = useState([])
  const [listdataDis, setListdataDis] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    switch (tabSelect) {
      case 0:
        setListdataDis(listdata)
        break;
      case 1:
        setListdataDis(listdata.filter((item) => { return item.maloaitp == "tp01" }))
        break;
      case 2:
        setListdataDis(listdata.filter((item) => { return item.maloaitp == "tp02" }))
        break;
      case 3:
        setListdataDis(listdata.filter((item) => { return item.maloaitp == "tp03" }))
        break;
      case 4:
        setListdataDis(listdata.filter((item) => { return item.maloaitp == "tp04" }))
        break;
      case 5:
        setListdataDis(listdata.filter((item) => { return item.maloaitp == "tp05" }))
        break;
      case 6:
        setListdataDis(listdata.filter((item) => { return item.maloaitp == "tp06" }))
        break;
      default:
        setListdataDis(listdata)
    }

  }, [tabSelect])

  const getData = async () => {
    setLoading(true)
    const q = query(collection(db, "THUCPHAM"),
      // where("soluongcon", ">", 0), 
      orderBy("sosao", 'desc'),
      // orderBy("sosao",'desc')
      limit(15)
    );
    const querySnapshot = await getDocs(q);
    const list = []
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    });
    setTimeout(() => {
      setListdata(list)
      setListdataDis(list)
      setLoading(false);
    }, 3000);
    setTabSelect(0)
  };
  const DATA = [
    {
      id: '002',
    },
    {
      id: '003',
    },
    {
      id: '001',
    },
  ];

  const renderlist = ({ item,onPressCartPlus }) => {
    return (
      <TouchableOpacity
        style={styles.boxitem}
        onPress={() => navigation.navigate('ProductDetail',
          {
            itemDetail: item,
            shopOfPro: {}
          }
        )}>
        <Image source={{ uri: item.image }} style={styles.img}></Image>
        <View style={styles.titleBox}>
          <View style={{ height: 40, justifyContent: 'center' }}>
            <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode={'tail'}>{item.ten}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 2 }}>
            <View flex={2}>
              <Text style={styles.TextPrice}>{item.giagoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
              <View style={styles.status}>
                <Icon name='circle' style={{ color: item.trangthai == 'Available' ? 'green' : (item.trangthai == 'Sold-out' ? 'red' : 'orange') }}></Icon>
                <Text style={{ color: item.trangthai == 'Available' ? 'green' : (item.trangthai == 'Sold-out' ? 'red' : 'orange'), marginLeft: 5, fontSize: 15 }}>{item.trangthai} </Text>
              </View>
            </View>

            {/* <View style={styles.iconbox}> */}
            <View flex={1} ></View>
            <TouchableOpacity style={styles.addCart} onPress={() => { setAddCard(!addcard) }}>
              <MaterialCommunityIcons onPress={onPressCartPlus} name='cart-plus' style={{ color: 'black', fontSize: 25 }}></MaterialCommunityIcons>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const user = useSelector((state) =>state.CurentUser)
  const handleAddToCart = async(item)=>{
    const docRef = await setDoc(doc(db, `KHACHHANG/${user.uid}/GIOHANG`, item.id), {
        image: item.image,
        soluong: 1,
        ten:item.ten,
        giagoc: item.giagoc,
        giamgia: item.giamgia
      })
      .then(ToastAndroid.showWithGravity(
        'Đã thêm sản phẩm vào giỏ hàng',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
    ))
      .catch((error) => {
        console.log(error)
      });
}
  return (
    <View>
      <View style={{ marginTop: 5, marginHorizontal: 5 }}>
        <ScrollView horizontal contentContainerStyle={styles.ScrollView} >
          <View style={styles.box}>
            {listTab.map((tab, id) => (
              <Pressable key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle, tabSelect == id && { backgroundColor: color.main }]}>
                <Text style={[styles.text, tab.length < 10 && { width: 'auto' }, tabSelect == id && { color: 'white', width: 'auto' }]} numberOfLines={1}>{tab}</Text>
                {/* {tabSelect == id && <View style={styles.underline}></View>} */}
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      {loading == false ?
        <FlatList showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => renderlist({item, onPressCartPlus: () => handleAddToCart(item)})}
          data={listdataDis}
          keyExtractor={item => item.id}>
        </FlatList>
        :
        <FlatList showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={() =>
            <View style={[styles.boxitem, { backgroundColor: 'white' }]}>
              <View style={styles.img}></View>
              <View style={styles.titleBox}></View>
            </View>
          }
          data={DATA}
          keyExtractor={item => item.id}>
        </FlatList>
      }
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
  itemTitle: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    color: 'gray',
    marginHorizontal: 10,
    marginVertical: 5,
    width: 100,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center'
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
    // borderWidth:1,
    backgroundColor: 'white',
    elevation: 10
    //width: '95%',
  },
  titleBox: {
    flex: 1.4,
  },
  textTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 5
  },
  iconbox: {
    flex: 0.3,
    backgroundColor: 'red'
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
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
