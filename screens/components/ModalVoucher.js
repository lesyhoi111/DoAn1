import React, { useState } from 'react';
import { Modal, TextInput, Button, View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import Color from '../../src/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from "react-redux";
import { addVoucher } from "./Redux/CartSlice";
import Lottie from 'lottie-react-native';

const ModalVoucher = ({ visible, onClose, onTrue }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addres = [
    {
      id: '001',
      name: 'Miễn phí vận chuyển',
      num: 20,
      dateStart: '20/10/2022',
      dateEnd: '20/10/2023',
      type: 'freeship',
      priceOf: 20000,
      condition: 100000,
      remain: 18,
    },
    {
      id: '002',
      name: 'Giảm 10.000đ',
      num: 20,
      dateStart: '20/10/2022',
      dateEnd: '5/5/2023',
      type: 'discount',
      priceOf: 10000,
      condition: 110000,
      remain: 18,
    },
    {
      id: '002',
      name: 'Miễn phí vận chuyển',
      num: 20,
      dateStart: '20/10/2022',
      dateEnd: '19/7/2023',
      type: 'freeship',
      priceOf: 25000,
      condition: 0,
      remain: 18,
    },
  ];

  const handleUpdate = async (item) => {
    setLoading(true)
    
    
    await dispatch(
        addVoucher({
          id: item.id,
          name: item.name,
          num: item.num,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          type: item.type,
          priceOf: item.priceOf,
          condition: item.condition,
          remain: item.remain,
        })
    )
    setTimeout(() => {
        setLoading(false);
        onTrue();
        onClose();
      }, 500);
}

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible} onRequestClose={onClose}>
      <View style={styles.backgroundView}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.txtTitle}>Chọn mã giảm giá</Text>
            <TouchableOpacity style={styles.BT_exit} onPress={() => onClose()}>
              <Text style={styles.txtBT}>Hủy</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ width: '100%' }}>
            {addres.map((item, index) => (
              <TouchableOpacity key={index} style={{ marginHorizontal: 10, borderWidth: 1, borderColor: '#d0d7de', flexDirection: 'row', marginTop: 10 }}  
                onPress={() => { handleUpdate(item) }}>
                {item.type=='freeship'?
                <View style={{ height: 100,backgroundColor:'lightseagreen',width:110 }}>
                  <Text style={{color:'white',fontSize:20,fontWeight:'bold',marginTop:15,alignSelf:'center',fontStyle:'italic'}}>FREE</Text>
                  <Text style={{color:'white',fontSize:20,fontWeight:'bold',marginBottom:8,alignSelf:'center',fontStyle:'italic'}}>SHIP</Text>
                  <Text style={{color:'white',fontSize:15,fontWeight:'500',alignSelf:'center'}}>Mã vận chuyển</Text>
                </View>
                :
                <View style={{ height: 100,backgroundColor:'tomato',width:110 }}>
                  <Icon name='shopping-bag' style={{fontSize:50,color:'white',alignSelf:'center',marginTop:15,marginBottom:8}}></Icon>
                  <Text style={{color:'tomato',fontSize:20,fontWeight:'bold',position:'absolute',top:40,left:43}}>HD</Text>
                  <Text style={{color:'white',fontSize:15,fontWeight:'500',alignSelf:'center'}}>Mã giảm giá</Text>
                </View>
                }
                <View style={{paddingVertical:10,paddingLeft:10,justifyContent:'center'}}>
                  <Text style={{color:'black',fontSize:18,fontWeight:'500'}} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                  <Text style={[styles.content_mini,{fontSize:15}]}>Đơn hàng tối thiểu {item.condition.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                 <View style={{flexDirection:'row'}}>
                  <Text style={styles.content_mini}>BĐ: {item.dateEnd}</Text>
                  <Text style={styles.content_mini}>KT: {item.dateEnd}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {loading==true&&<View style={{width:'100%',height:320,position:'absolute',top:44,backgroundColor:"rgba(250,250,250,0.7)",left:0}}>
                    <Lottie source={require('../../src/Lottie/loading.json')} autoPlay loop />
                        </View>}
        </View>
      </View>
    </Modal>
  );
};
export default ModalVoucher;
const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 350,
    alignItems: 'center'
  },
  txtTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',

  },
  header: {
    width: '100%',
    backgroundColor: Color.backgroundMain,
    alignItems: 'center',
    paddingVertical: 10
  },
  txtBT: {
    color: Color.main,
    fontSize: 18,
    fontWeight: '500'
  },
  BT_exit: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  content_mini:{
    color:'black',
    fontSize:14,
    marginRight:10
  },
})