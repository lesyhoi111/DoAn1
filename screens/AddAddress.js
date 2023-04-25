import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, Image, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MapView, { Marker } from 'react-native-maps';
import Color from '../src/Color';
import { Picker } from '@react-native-picker/picker';
import color from '../src/Color';
const cityData = ['Hà Nội', 'TP.HCM', 'Đà Nẵng'];
const districtData = {
    'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Tây Hồ'],
    'TP.HCM': ['Quận 1', 'Quận 2', 'Quận 3'],
    'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Sơn Trà'],
};
const wardData = {
    'Ba Đình': ['Phúc Xá', 'Ngọc Hà', 'Liễu Giai'],
    'Hoàn Kiếm': ['Hàng Bài', 'Hàng Trống', 'Cửa Đông'],
    'Tây Hồ': ['Quảng An', 'Xuân La', 'Tứ Liên'],
    'Quận 1': ['Bến Nghé', 'Bến Thành', 'Cầu Kho'],
    'Quận 2': ['Thảo Điền', 'An Phú', 'Bình An'],
    'Quận 3': ['Nguyễn Thông', 'Võ Thị Sáu', 'Nam Kỳ Khởi Nghĩa'],
    'Hải Châu': ['Thanh Bình', 'Thanh Lộc', 'Hòa Cường Bắc'],
    'Thanh Khê': ['Thanh Khê Tây', 'Thanh Khê Đông', 'An Khê'],
    'Sơn Trà': ['Mân Thái', 'An Hải Bắc', 'An Hải Đông'],
};
function AddAddress(props) {
    const { navigation, route } = props
    const [isEnabled, setIsEnabled] = useState(false);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [address, setAdress] = useState('')
    const [focus, setFocus] = useState(false)

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const handleCityChange = (city) => {
        setCity(city);
        setDistrict('');
        setWard('');
    };

    const handleDistrictChange = (district) => {
        setDistrict(district);
        setWard('');
    };

    const handleWardChange = (ward) => {
        setWard(ward);
    };

    const handleSave = () => {
        setShowModal(false);
        setAdress(`${ward}, ${district}, ${city}`);
        setCity('');
        setDistrict('');
        setWard('');
        console.log(address);
    };
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10, paddingLeft: 10, marginBottom: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }} onPress={() => navigation.goBack()}><Ionicons name='arrow-back' size={27} color={'black'}></Ionicons></TouchableOpacity>
                    <Text style={{ fontSize: 23, color: 'black' }}>Thêm địa chỉ</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Liên hệ</Text>
                    <TextInput style={styles.TextInput} placeholder='Họ và tên' placeholderTextColor={color.placeHoder} />
                    <TextInput style={styles.TextInput} placeholder='Số điện thoại' placeholderTextColor={color.placeHoder} />
                    <Text style={styles.title}>Địa chỉ</Text>
                    <View style={styles.TextInput}>
                        <Text style={{ fontSize: 16, color:address?'#333':color.placeHoder,paddingVertical:13 }} onPress={()=>setShowModal(true)}>{address || 'Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã'}</Text>
                        <Ionicons name='chevron-forward-outline' size={22} color={'black'}></Ionicons>

                    </View>
                    <TextInput style={styles.TextInput} placeholder='Tên đường, Tòa nhà, Số nhà' placeholderTextColor={color.placeHoder} />
                    <Modal
                        visible={showModal}
                        transparent
                        animationType="slide"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text>Tỉnh/ Thành phố</Text>
                                <Picker
                                    selectedValue={city}
                                    onValueChange={(itemValue) => handleCityChange(itemValue)}
                                >
                                    {cityData.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                                <Text>Quận/Huyện</Text>
                                <Picker
                                    selectedValue={district}
                                    onValueChange={(itemValue) => handleDistrictChange(itemValue)}
                                >
                                    {districtData[city]?.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                                <Text>Phường/Xã</Text>
                                <Picker
                                    selectedValue={ward}
                                    onValueChange={(itemValue) => handleWardChange(itemValue)}
                                >
                                    {wardData[district]?.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                                <Button
                                    title="Xác nhận"
                                    onPress={handleSave}
                                />
                                <Button
                                    title="Hủy"
                                    onPress={() => setShowModal(false)}
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
                <TouchableOpacity style={styles.btnComplete}>
                    <Text style={styles.txtComplete}>Hoàn thành</Text>
                </TouchableOpacity>
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
});