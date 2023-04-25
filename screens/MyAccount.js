import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, View, Keyboard, Alert, ScrollView, Image,Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../src/Color'
import babelConfig from '../babel.config';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalVerify from './components/ModalVerify';
import { isValidEmail, isValidRePass } from '../utilies/Validatetions';
function dateFormater(date, separator) {
    var day = date.getDate();
    // add +1 to month because getMonth() returns month from 0 to 11
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
  
    // show date and month in two digits
    // if month is less than 10, add a 0 before it
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
  
    // now we have day, month and year
    // use the separator to join them
    return day + separator + month + separator + year;
  }
function MyAccount(props) {
    const {navigation,route}=props
    const {navigate,goBack}=navigation
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [email, setEmail] = useState('lesyhoi0129@gmail.com');
    const [dates, setDates] = useState(dateFormater(new Date(),'/'));
    const [showPass, setShowPass] = useState(false);
    const [visible, setVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        setDates(dateFormater(date, '/'));
        hideDatePicker();
      };
    return (
<KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#dcdcdc' }} behavior='height' enabled={true}>
<ScrollView flex={1} style={{backgroundColor: '#dcdcdc'}}>
        <SafeAreaView style={styles.container}>
        <ModalVerify
            visible={visible}
            onClose={() => setVisible(false)}
            onTrue={()=>navigation.goBack()}
            password={"123"}
        />
            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10 }}>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={navigation.goBack}><Ionicons name='arrow-back' size={25} color={'black'}></Ionicons></TouchableOpacity>
                <View style={[{ backgroundColor: 'white', alignItems: 'center', flex: 1 }]}></View>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={()=>{setVisible(true)}}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: Color.main }}>Save</Text>
                    </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                <Image source={require('../src/images/sale.png')} style={styles.img}></Image>
                <TouchableOpacity style={{ position: 'absolute', left: 203, top: 80 }}>
                    <Ionicons name='add-circle' color='#00cc88' size={25}></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'white', paddingTop: 15, flex: 1 }}>
                <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems:'center', paddingVertical:5}}>
                    <View style={{ flex: 1}}>
                            <Text style={{  fontSize: 20, fontWeight: '500' }}>Họ Tên</Text>
                        </View>
                        <View style={{ flex: 2, paddingLeft: 15 }}>
                            <TextInput fontSize={20} fontWeight={'500'}>Lê Sỹ Hội</TextInput>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 ,alignItems:'center', paddingVertical:5, paddingRight:5}}>
                    <View style={{ flex: 1}}>
                            <Text style={{  fontSize: 20, fontWeight: '500' }}>Mật khẩu</Text>
                        </View>
                        <View style={{ flex: 1.9, paddingLeft: 15 }}>
                            <TextInput fontSize={20} secureTextEntry={!showPass} fontWeight={'500'}>Password</TextInput>
                        </View>
                        <TouchableOpacity onPress={()=>{setShowPass(!showPass)}}>
                            <Ionicons name={showPass==false?'lock-closed-sharp':'lock-open-sharp'} size={20} color={'#a9a9a9'}></Ionicons>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 20 ,alignItems:'center', paddingVertical:5}}>
                    <View style={{ flex: 1}}>
                            <Text style={{  fontSize: 20, fontWeight: '500' }}>SĐT</Text>
                        </View>
                        <View style={{ flex: 2, paddingLeft: 15 }}>
                            <TextInput fontSize={20} fontWeight={'500'}>08291212527</TextInput>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Email</Text>
                        </View>
                        <View style={{ flex: 2, paddingLeft: 15 }}>
                            <TextInput fontSize={20} fontWeight={'500'}  onChangeText={(text) => {
                  setEmail(text)}}>{email}</TextInput>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
                    <TouchableOpacity onPress={showDatePicker}
                    style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Ngày sinh</Text>
                        </View>
                        <View style={{ flex: 2, paddingLeft: 15, paddingVertical: 10 }} >
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>{dates}</Text>
                        </View>
                    </TouchableOpacity>
                   
                </View>
            </View>
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={{height:45,width:'100%',backgroundColor:'white'}}></View>
        </SafeAreaView>
        </ScrollView>
       
        </KeyboardAvoidingView>
    )
};
export default MyAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc'
    },
    txtheader: {
        color: Color.main,
        fontSize: 27,
        fontWeight: 'bold',
    },
    titleHeader: {
        fontSize: 30,
        paddingLeft: 20,
        paddingRight: 30,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 15
    }
})