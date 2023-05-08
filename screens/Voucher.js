import React, { useState, useEffect } from 'react';
import {  StyleSheet, Text,SafeAreaView,View,TouchableOpacity, ScrollView,FlatList  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../src/Color'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const listTab=['Phiếu vận chuyển','Phiếu giảm giá']
const list=[1,2,3,4,5,6,7,8,9]
function Voucher(props) {
    const [tabSelect, setTabSelect] = useState("");

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

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={()=>props.navigation.goBack()}>
                    <Icon name="arrow-left" style={styles.iconBack} />
                </TouchableOpacity>
                <Text style={styles.header_login}>Phiếu giảm giá</Text>
                <View></View>
            </View>
            <View style={styles.box_recipe}>
                {listTab.map((tab, id) => (
                <TouchableOpacity key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle,{borderBottomWidth: tabSelect==id? 5:0 }]}>
                    <Text style={[styles.text_title,{color: tabSelect==id? 'black':'white' }]} numberOfLines={1}>{tab}</Text>
                </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={{ width: '100%' }}>
                {addres.filter((item,index)=> {return item.type==(tabSelect==0?"freeship":"discount")})
                .map((item, index) => (
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
      box_recipe:{
        backgroundColor:Color.main,
        flexDirection:'row'
      },
      itemTitle:{
        width:width/2,
        paddingVertical:8,
        borderBottomColor:Color.backgroundMain,
        alignItems:'center'
      },
      text_title:{
        fontSize:18,
        color:'white',
        fontWeight:'500'
      }
      
})