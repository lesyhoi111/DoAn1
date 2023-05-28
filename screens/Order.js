import React, { useState, useEffect, useContext } from 'react';
import { Text, FlatList, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAddress from './components/ModalAddress';
import ModalVoucher from './components/ModalVoucher';
import Color from '../src/Color';
import { MyContext } from '../App';
import { useSelector } from "react-redux";
import { collection, query, documentId, getDocs, doc, where } from "firebase/firestore";
import { auth } from '../firebase/firebase'
import { db } from '../firebase/index'
let itemAddress;
let itemVoucher;
const Order = (props) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [checked, setChecked] = useState('Tien');
    const [visible, setVisible] = useState(false);
    const [isloading, setIsloading] = useState(false);
    const [visibleVoucher, setVisibleVoucher] = useState(false);
    const [listAdd, setListAdd] = useState([]);
    const [listVou, setListVou] = useState([]);

    const [myuser,setMyuser]=useState({
        id:"",
        ten: "",
        email: "",
        password: "",
        ngaythamgia: "",
        magiamgiadadung: [],
        sdt: "00",
        ngaysinh: "",
        sotien: 0,
        uid:""
      })
    const user = auth.currentUser;
    const { listdata,shop,listuser } = useContext(MyContext);

    useEffect(()=>{
        getlistVou();
        getlistAdd();
    },[])

    const getlistVou = async () => {
        await setMyuser( listuser.find((item)=>{console.log(item); return item.uid==user.uid}))
        const dataFb = myuser.magiamgiadadung;
        const listid = Object.keys(dataFb);
        try {
          const CollectionRef = collection(db, "MAGIAMGIA");
          const Query = query(CollectionRef);
          const querySnapshot = await getDocs(Query);
          const result = await querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setTimeout(() => {
            setListVou(result.filter((item) => { console.log(item) ;return listid.includes(item.id) }))
            // setLoading(false)
          }, 2000)
        } catch (error) {
          console.error(error)
        }
      }
    
    const getlistAdd = async () => {
        try {
          const khachhangDocRef = doc(db, "KHACHHANG", "R3XHZJR4TzNnEMm7ldOX");
          const giohangCollectionRef = collection(khachhangDocRef, "DIACHIGIAOHANG");
          const querySnapshot = await getDocs(giohangCollectionRef);
          const result = await querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setListAdd(result);
        } catch (error) {
          console.error(error)
        }
    
      }
      
    //redux address
    itemAddress = useSelector(state => state.address);
    //redux item foods
    const itemFood = useSelector(state => state.cart.items);
    const total = itemFood.reduce((acc, item) => acc + ((item.product.giagoc*(100-item.product.giamgia)/100)*item.num), 0);

    itemVoucher=useSelector(state => state.cart.voucher);

    const [addressSelect, setAddressSelect] = useState();
    const [voucherSelect, setVoucherSelect] = useState(itemVoucher);

    const updateAdd=(itemAddress)=>{
        setAddressSelect(itemAddress)
    }
    const updateVou=(itemVoucher)=>{
        setVoucherSelect(itemVoucher)
    }

    
    const Item = (item,index) => {
        return (
            <View style={styles.boxItem} key={index}>
                <TouchableOpacity style={{ flex: 0.13, alignItems: 'center', marginTop: 10 }}>
                    <Icon name="trash-alt" style={{ fontSize: 22 }}></Icon>
                </TouchableOpacity>
                <View style={{ flex: 0.87 }}>
                    <Text style={styles.txt_header} numberOfLines={2} ellipsizeMode={'tail'}>{item.product.ten}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{}}>{(item.product.giagoc*(100-item.product.giamgia)/100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                        <View flex={1}></View>
                        <Text>x{item.num}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View flex={1}></View>
                        <Text style={{ alignSelf: 'flex-end', color: 'red', fontWeight: '500' }}>={((item.product.giagoc*(100-item.product.giamgia)/100)*item.num).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>

                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btnBack}>
                    <Icon name="arrow-left" style={styles.iconBack} />
                </TouchableOpacity>
                <Text style={styles.header_login}>Thanh toán</Text>
                <View></View>
            </View>
            <ModalAddress
            visible={visible}
            listAddres={listAdd}
            onClose={() => setVisible(false)}
            onTrue={()=>{updateAdd(itemAddress)}}
        />
        <ModalVoucher
            visible={visibleVoucher}
            onClose={() => setVisibleVoucher(false)}
            onTrue={()=>{updateVou(itemVoucher)}}
            listVou={listVou}
        />
            <ScrollView style={{ backgroundColor: 'white' }}>
                <TouchableOpacity style={styles.boxLocation} onPress={()=>setVisible(true)}>
                    <View style={{ flexDirection: 'row',flex:1 }}>
                        <View style={{flex:0.05}}>
                        <MaterialIcons name="location-pin" style={{ color: 'black', fontSize: 20 }}></MaterialIcons>
                        </View>
                        {addressSelect?
                        <View style={{ marginLeft: 5,flex:0.85 }}>
                            <Text style={styles.txt_Location}>Địa chỉ nhận hàng</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.txt_Location}>{addressSelect.tennguoinhan}</Text>
                                <View style={{ width: 1.5, backgroundColor: 'black', marginHorizontal: 10, marginVertical: 3 }}></View>
                                <Text style={styles.txt_Location} numberOfLines={1} ellipsizeMode={'tail'}>{addressSelect.sdt}</Text>
                            </View>
                            <Text style={styles.txt_Location} numberOfLines={1} ellipsizeMode={'tail'}>{addressSelect.motachitiet}</Text>
                            <Text style={styles.txt_Location} numberOfLines={1} ellipsizeMode={'tail'}>{addressSelect.diachi}</Text>
                        </View>
                        :
                        <View style={{ marginLeft: 5,flex:0.85 }}>
                            <Text style={styles.txt_Location}>Địa chỉ nhận hàng?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.txt_Location}></Text>
                                <Text style={styles.txt_Location} numberOfLines={1} ellipsizeMode={'tail'}></Text>
                            </View>
                            <Text style={[styles.txt_Location,{fontSize:18,alignSelf:'center'}]} numberOfLines={1} ellipsizeMode={'tail'}>Mời chọn địa chỉ nhận hàng</Text>
                            <Text style={styles.txt_Location} numberOfLines={1} ellipsizeMode={'tail'}></Text>
                        </View>}
                        <View style={{alignItems:'center',justifyContent:'center',flex:0.1}}>
                        {addressSelect&&<Icon name='chevron-right' size={20} color={'#a9a9a9'}></Icon>}
                        </View>
                    </View>
                </TouchableOpacity>
                {itemFood.map((item,index)=>Item(item,index))}

                <View style={{ height: 10, backgroundColor: Color.backgroundDefault }}></View>
                
                <View style={styles.box_TT}>
                    <Text style={[styles.txt_header, { fontWeight: 'bold',marginBottom:5 }]}>Chọn hình thức thanh toán</Text>
                    <View style={[styles.item_TT,{borderColor:checked === 'Tien'?Color.main:Color.backgroundDefault}]}>
                        <RadioButton
                            value="Tien"
                            status={checked === 'Tien' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Tien')}
                            color={Color.main}
                            uncheckedColor={Color.main}
                        />
                        <Ionicons name="wallet-outline" style={{ fontSize: 23, marginHorizontal: 12 }}></Ionicons>
                        <Text style={{ fontSize: 17, color: 'black' }}>Tiền mặt khi nhận hàng</Text>
                    </View>
                    <View style={[styles.item_TT,{borderColor:checked === 'The'?Color.main:Color.backgroundDefault}]}>
                        <RadioButton
                            value="The"
                            status={checked === 'The' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('The')}
                            color={Color.main}
                            uncheckedColor={Color.main}
                        />
                        <Ionicons name="card-outline" style={{ fontSize: 23, marginHorizontal: 12 }}></Ionicons>
                        <Text style={{ fontSize: 17, color: 'black' }}>Cà thẻ khi nhận hàng</Text>
                    </View>
                    <View style={[styles.item_TT,{borderColor:checked === 'Banking'?Color.main:Color.backgroundDefault}]}>
                        <RadioButton
                            value="Banking"
                            status={checked === 'Banking' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Banking')}
                            color={Color.main}
                            uncheckedColor={Color.main}
                        />
                        <MaterialIcons name="atm" style={{ fontSize: 32, marginHorizontal: 7, color: 'blue' }}></MaterialIcons>
                        <Text style={{ fontSize: 17, color: 'black' }}>Thẻ ATM (liên kết thẻ ngân hàng)</Text>
                    </View>
                </View>

                <View style={{ height: 10, backgroundColor: Color.backgroundDefault }}></View>

                <TouchableOpacity style={styles.box_voucher} onPress={()=>setVisibleVoucher(true)}>
                    <MaterialCommunityIcons name='ticket-percent-outline' size={25} color={Color.main}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 17, color: Color.main,marginLeft:10}}>Phiếu giảm giá</Text>
                    <View flex={1}></View>
                    <Icon name='chevron-right' size={20} color={Color.main}></Icon>
                </TouchableOpacity>

                <View style={{ height: 10, backgroundColor: Color.backgroundDefault }}></View>

                <View style={styles.box_HD}>
                    <Text style={[styles.txt_header, { fontWeight: 'bold',marginBottom:5 }]}>THÔNG TIN HÓA ĐƠN</Text>
                    <View style={styles.row_HD}>
                        <Text style={styles.txt_title}>Tiền hàng</Text>
                        <Text style={styles.txt_title}>{(total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <View style={styles.row_HD}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.txt_title}>Phí giao hàng</Text>
                        <TouchableOpacity>
                        <MaterialCommunityIcons name="help-circle-outline" style={{fontSize:15,color:'black',marginLeft:3}}></MaterialCommunityIcons>
                        </TouchableOpacity>
                        </View>
                        <Text style={styles.txt_title}>{(15000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <View style={styles.row_HD}>
                        <Text style={styles.txt_title}>Mã giảm giá</Text>
                        <Text style={styles.txt_title}>-{(voucherSelect.priceOf).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <View style={styles.row_HD}>
                        <Text style={styles.txt_title}>Tổng đơn hàng:</Text>
                        <Text style={[styles.txt_title,{fontWeight:'bold'}]}>{(total-voucherSelect.priceOf+15000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                </View>

                <View style={{ height: 10, backgroundColor: Color.backgroundDefault }}></View>
                
                <View style={styles.box_HD}>
                    <Text style={[styles.txt_header, { fontWeight: '500',marginBottom:5 }]}>Tin nhắn:</Text>
                    <TextInput multiline placeholder="Yêu cầu khác (nếu có)" style={{borderWidth:2,borderColor:Color.backgroundDefault,borderRadius:5,height:100,textAlignVertical:'top'}}></TextInput>
                </View>
            </ScrollView>
            <View style={{backgroundColor:'white'}}>
            <TouchableOpacity style={styles.footer}>   
                <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>HOÀN TẤT MUA</Text>
                <Text style={{color:Color.main,fontSize:15}}>{(total-voucherSelect.priceOf+15000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>             
            </TouchableOpacity>
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
    boxLocation: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: Color.backgroundDefault
    },
    txt_Location: {
        fontSize: 15,
        color: 'black',
        fontWeight: '400',
    },
    boxItem: {
        borderBottomWidth: 1,
        borderBottomColor: Color.backgroundMain,
        marginHorizontal: 15,
        marginVertical: 10,
        paddingBottom: 5,
        flexDirection: 'row',
        flex: 1
    },
    txt_header: {
        color: 'black',
        fontSize: 17,
        fontWeight: '500'
    },
    box_TT: {
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    item_TT: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7,
        backgroundColor: Color.backgroundDefault,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth:1,
        borderColor:Color.backgroundDefault
    },
    box_voucher:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:12
    },
    box_HD:{
        paddingHorizontal:15,
        paddingVertical:10
    },
    row_HD:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    txt_title:{
        color:'black'
    },
    footer:{
        alignItems:'center',
        paddingVertical:3,
        backgroundColor:Color.backgroundMain,
        marginHorizontal:20,
        borderRadius:10,
        marginTop:3
    }
});

export default Order;