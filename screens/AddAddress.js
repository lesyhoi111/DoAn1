import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MapView, { Marker } from 'react-native-maps';
import { collection, query, documentId, getDocs, doc, where, addDoc } from "firebase/firestore";
import { db } from '../firebase/index'
import Lottie from 'lottie-react-native';
import { Picker } from '@react-native-picker/picker';
import color from '../src/Color';
import axios from 'axios';
function AddAddress(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { user } = route.params
    const [isEnabled, setIsEnabled] = useState(false);
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const [provinceCode, setProvinceCode] = useState()
    const [districtCode, setDistrictCode] = useState()
    const [wardCode, setWardCode] = useState()
    const [provinceName, setProvinceName] = useState('')
    const [districtName, setDistrictName] = useState('')
    const [wardName, setWardName] = useState('')
    const [address, setAdress] = useState('')
    const [addressDetail, setAdressDetail] = useState('')
    const [name, setName] = useState('')
    const [numphone, setNumphone] = useState('')
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [pickerFocused, setPickerFocused] = useState(false)
    const [isloading, setIsloading] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const getProvince = () => {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then(response => {
                setProvince(response.data)
            })
            .catch(error => {
                console.log('lỗi:', error);
            });

    }

    const getDistrict = () => {
        if (provinceCode) {
            axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
                .then(response => setDistrict(response.data.districts))
                .catch(error => {
                    console.log('lỗi:', error);
                });
        }
    }
    const getWard = () => {
        if (districtCode) {
            axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then(response => setWards(response.data.wards))
                .catch(error => {
                    console.log('lỗi:', error);
                });
        }
    }
    useEffect(() => {

        if (provinceCode && districtCode && wardCode) {

            const pvname = province.filter(item => item.code === provinceCode)
            setProvinceName(pvname[0].name)
            const dtname = district.filter(item => item.code === districtCode)
            setDistrictName(dtname[0].name)
            const wname = wards.filter(item => item.code === wardCode)
            setWardName(wname[0].name)
        }
    }, [provinceCode, districtCode, wardCode])

    const addAddress = async () => {
        if (name.trim() == '' || numphone.trim() == '' || address.trim() == '' || addressDetail.trim() == '') {
            Alert.alert("Cảnh báo!", "Mời nhập đầy đủ thông tin")
        } else {
            setIsloading(true)
            try {
                console.log("addAddress")
                const khachhangDocRef = doc(db, "KHACHHANG", user.id);
                const giohangCollectionRef = collection(khachhangDocRef, "DIACHIGIAOHANG");
                const docRef = await addDoc(giohangCollectionRef, {
                    diachi: address,
                    macdinh: false,
                    motachitiet: addressDetail,
                    sdt: numphone,
                    tennguoinhan: name,
                });
                setTimeout(() => {
                    // setListAdd(result);
                    setIsloading(false);
                    Alert.alert("Thông báo!", "Thêm thành công");
                    navigation.goBack();
                }, 1000)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleSubmit = () => {
        if (provinceCode && districtCode && wardCode) {
            setShowModalAddress(false);
            setAdress(wardName + ', ' + districtName + ', ' + provinceName)
        }
        else {
            Alert.alert('Vui lòng chọn đầy đủ thông tin')
        }
    }
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10, paddingLeft: 10, marginBottom: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }} onPress={() => navigation.goBack()}><Ionicons name='arrow-back' size={27} color={'black'}></Ionicons></TouchableOpacity>
                    <Text style={{ fontSize: 23, color: 'black' }}>Thêm địa chỉ</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Liên hệ</Text>
                    <TextInput style={styles.TextInput} placeholder='Họ và tên' placeholderTextColor={color.placeHoder} onChangeText={(text) => { setName(text) }} value={name} />
                    <TextInput style={styles.TextInput} placeholder='Số điện thoại' placeholderTextColor={color.placeHoder} onChangeText={(text) => { setNumphone(text) }} value={numphone} />
                    <Text style={styles.title}>Địa chỉ</Text>
                    <View style={styles.TextInput}>
                        <Text style={{ fontSize: 16, color: address ? '#333' : color.placeHoder, paddingVertical: 13 }} onPress={() => setShowModalAddress(true)}>{address || 'Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã'}</Text>
                        <Ionicons name='chevron-forward-outline' size={22} color={'black'}></Ionicons>

                    </View>
                    <TextInput style={[styles.TextInput,{borderBottomColor:'black',borderBottomWidth:1}]} placeholder='Tên đường, Tòa nhà, Số nhà' placeholderTextColor={color.placeHoder} onChangeText={(text) => { setAdressDetail(text) }} value={addressDetail}></TextInput>
                    <Modal
                        visible={showModalAddress}
                        transparent
                        animationType="slide"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.textModal}>Tỉnh/ Thành phố</Text>
                                <Picker
                                    dropdownIconColor={'#FF6868'}
                                    dropdownIconRippleColor={'#FF6868'}
                                    prompt='--Chọn tỉnh/ Thành phố--'
                                    placeholder='--Chọn tỉnh/ Thành phố--'
                                    placeholderStyle={{
                                        color: "grey",
                                    }}
                                    style={{ color: '#333', backgroundColor: '#EEEEEE' }}
                                    onFocus={getProvince}
                                    onBlur={() => setPickerFocused(false)}
                                    selectedValue={provinceCode}
                                    onValueChange={i => {
                                        setProvinceCode(i);
                                        setDistrict([])
                                        setWards([])
                                        setDistrictCode(null),
                                            setWardCode(null)
                                    }
                                    } >
                                    {province.map(item => <Picker.Item style={{ backgroundColor: '#FFFFFF', color: '#000000' }} label={province.length > 0 ? item.name : placeholder} value={item.code} key={item} enabled={!pickerFocused} />)}
                                </Picker>
                                <Text style={styles.textModal}>Quận/Huyện</Text>
                                <Picker
                                    prompt='--Chọn Quận/ Huyện--'
                                    placeholder='--Chọn Quận/ Huyện--'
                                    placeholderStyle={{
                                        color: "grey",
                                    }}
                                    dropdownIconColor={'#FF6868'}
                                    dropdownIconRippleColor={'#FF6868'}
                                    onFocus={getDistrict}
                                    style={{ color: '#333', backgroundColor: '#EEEEEE' }}
                                    selectedValue={districtCode}
                                    onValueChange={i => {
                                        setDistrictCode(i);
                                        setWards([])
                                        setWardCode(null)
                                    }
                                    } >
                                    {provinceCode ? district.map(item => <Picker.Item style={{ backgroundColor: '#FFFFFF', color: '#000000' }} label={item.name} value={item.code} key={item} />) : null}
                                </Picker>
                                <Text style={styles.textModal}>Phường/Xã</Text>
                                <Picker
                                    prompt='--Chọn Phường/ Xã--'
                                    placeholder='--Chọn Phường/ Xã--'
                                    placeholderStyle={{
                                        color: "grey",
                                    }}
                                    dropdownIconColor={'#FF6868'}
                                    dropdownIconRippleColor={'#FF6868'}
                                    onFocus={getWard}
                                    style={{ color: '#333', backgroundColor: '#EEEEEE' }}
                                    selectedValue={wardCode}
                                    onValueChange={i => setWardCode(i)
                                    } >
                                    {districtCode ? wards.map(item => <Picker.Item style={{ backgroundColor: '#FFFFFF', color: '#000000' }} label={item.name} value={item.code} key={item} />) : null}
                                </Picker>
                                <Button
                                    title="Xác nhận"
                                    onPress={handleSubmit}
                                />
                                <Button
                                    title="Hủy"
                                    onPress={() => setShowModalAddress(false)}
                                />
                            </View>
                        </View>
                    </Modal>
                    {/* <Text style={styles.title}>Cài đặt</Text>
                    <View style={styles.defaltAddress}>
                        <Text style={styles.txtdefaltAddress}>
                            Đặt làm địa chỉ mặc định
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}></Switch>
                    </View> */}
                </View>
                <TouchableOpacity style={styles.btnComplete} onPress={() => { addAddress() }}>
                    <Text style={styles.txtComplete}>Hoàn thành</Text>
                </TouchableOpacity>
                {isloading == true && 
                <View style={{ width: '100%', height: '100%',  backgroundColor: "rgba(250,250,250,0.7)",position:'absolute'}}>
                    <Lottie source={require('../src/Lottie/loading.json')} autoPlay loop />
                </View>}
            </SafeAreaView>
        </ScrollView>
    )
};
export default AddAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        backgroundColor: '#DDDDDD',
        paddingLeft: 10,
        color: '#333',
        paddingVertical: 7,
        fontSize: 16

    },
    TextInput: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingLeft: 10,
        fontSize: 16
    },
    defaltAddress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingVertical: 10
    },
    txtdefaltAddress: {
        fontSize: 16,
        color: '#333',
        marginLeft: 16,
    },
    btnComplete: {
        backgroundColor: color.main,
        padding: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    txtComplete: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    btnAddAddress: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: color.backgroundMain,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconAdd: {
        borderWidth: 1,
        borderColor: color.backgroundMain,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14

    },
    txtAddAddress: {
        fontSize: 18,
        padding: 10,
        color: color.backgroundMain
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        padding: 20,
        borderRadius: 5,
    },
    textModal: {
        fontSize: 16,
        color: '#333'
    }
});