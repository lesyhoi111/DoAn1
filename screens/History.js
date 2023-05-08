import React, { useState, useEffect } from 'react';
import {  StyleSheet, Text,SafeAreaView,View,TouchableOpacity, ScrollView,FlatList  } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../src/Color'
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const listTab=['Chờ xác nhận','Hoàn thành','Đã hủy']
const list=[1,2,3,4,5,6,7,8,9]
function History(props) {
    const [tabSelect, setTabSelect] = useState(0);

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={()=>props.navigation.goBack()}>
                    <Icon name="arrow-left" style={styles.iconBack} />
                </TouchableOpacity>
                <Text style={styles.header_login}>Lịch sử mua hàng</Text>
                <View></View>
            </View>
            <View style={styles.box_recipe}>
                {listTab.map((tab, id) => (
                <TouchableOpacity key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle,{borderBottomWidth: tabSelect==id? 5:0 }]}>
                    <Text style={[styles.text_title,{color: tabSelect==id? 'black':'white' }]} numberOfLines={1}>{tab}</Text>
                </TouchableOpacity>
                ))}
            </View>
           
            <FlatList showsVerticalScrollIndicator={false} 
      scrollEnabled={false}
      renderItem={({item,id})=>
        <View key={id} style={{height:50,marginHorizontal:15,marginTop:20}}>
        <Text>heloo</Text>
    </View>
      } 
      data={list} 
      keyExtractor={item=>item}>
      </FlatList>
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
      box_recipe:{
        backgroundColor:Color.main,
        flexDirection:'row'
      },
      itemTitle:{
        paddingHorizontal:17.45,
        paddingVertical:8,
        borderBottomColor:Color.backgroundMain
      },
      text_title:{
        fontSize:18,
        color:'white',
        fontWeight:'500'
      }
      
})