import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MapView, { Marker } from 'react-native-maps';
import Color from '../src/Color';
import { Picker } from '@react-native-picker/picker';
import color from '../src/Color';
import axios from 'axios';
function EditAddress(props) {
    const { navigation, route } = props
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
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [pickerFocused, setPickerFocused] = useState(false)
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
                    <Text style={{ fontSize: 23, color: 'black' }}>Sửa địa chỉ</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Liên hệ</Text>
                    <TextInput style={styles.TextInput} placeholder='Họ và tên' placeholderTextColor={color.placeHoder} value='Nguyễn Viết Đức' />
                    <TextInput style={styles.TextInput} placeholder='Số điện thoại' placeholderTextColor={color.placeHoder} value='0333848984' />
                    <Text style={styles.title}>Địa chỉ</Text>
                    <View style={styles.TextInput}>
                    <Text style={{ fontSize: 16, color:address?'#333':color.placeHoder,paddingVertical:13 }} onPress={()=>setShowModalAddress(true)}>{address || 'Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã'}</Text>
                        <Ionicons name='chevron-forward-outline' size={22} color={'black'}></Ionicons>

                    </View>
                    <TextInput style={styles.TextInput} placeholder='Tên đường, Tòa nhà, Số nhà' placeholderTextColor={color.placeHoder} value='đường Tạ Quang Bửu, khu phố Tân Hòa' />
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
                    <Text style={styles.title}>Cài đặt</Text>
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
                    </View>
                </View>
                <TouchableOpacity style={styles.btnAddAddress}>
                    <View style={styles.iconAdd} >
                        <Ionicons style={{ textAlign: 'center' }} name='remove-outline' size={22} color={color.backgroundMain}></Ionicons>

                    </View>
                    <Text style={styles.txtAddAddress}>Xóa địa chỉ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnComplete}>
                    <Text style={styles.txtComplete}>Hoàn thành</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
};
export default EditAddress;

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
        backgroundColor: color.backgroundMain,
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