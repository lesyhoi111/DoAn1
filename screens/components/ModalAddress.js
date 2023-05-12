import React, { useEffect, useState } from 'react';
import { Modal, TextInput, Button, View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import Color from '../../src/Color';
import { useDispatch } from "react-redux";
import { updateAdd } from "./Redux/AddressSlice";
import Lottie from 'lottie-react-native';

const ModalAddress = ({ visible, onClose, onTrue }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const addres = [
        {
            id: '001',
            name: 'lê sỹ hội',
            address: 'quảng nam',
            street: 'ql 1a',
            numphone: '01 213 21 32',
            isdefault: true
        },
        {
            id: '002',
            name: 'Nguyễn văn B',
            address: 'quảng nam',
            street: 'ql 1a',
            numphone: '01 213 21 32',
            isdefault: false
        },
        {
            id: '003',
            name: 'lê sỹ ',
            address: 'tp.hcm',
            street: 'ql 1a',
            numphone: '01 288 21 84',
            isdefault: false
        },
    ];
    const handleUpdate = async (item) => {
        setLoading(true)
        
        
        await dispatch(
            updateAdd({
                id: item.id,
                name: item.name,
                address: item.address,
                street: item.street,
                numphone: item.numphone,
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
            <TouchableOpacity style={{flex:1}} onPress={()=>{onClose()}}></TouchableOpacity>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.txtTitle}>Chọn địa chỉ nhận hàng</Text>
                        <TouchableOpacity style={styles.BT_exit} onPress={() => onClose()}>
                            <Text style={styles.txtBT}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                        
                    <ScrollView style={{ width: '100%' }}>
                        {addres.map((add, index) => (
                            <View key={index} style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, color: 'black', fontWeight: '400' }}>{add.name}</Text>
                                        <View style={{ width: 1.5, backgroundColor: '#d0d7de', marginHorizontal: 10 }}></View>
                                        <Text style={{ fontSize: 16, fontWeight: '400' }} numberOfLines={1} ellipsizeMode={'tail'}>{add.numphone}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => { handleUpdate(add) }}//navigation.navigate("EditAddress")
                                    >
                                        <Text style={{ fontSize: 17, fontWeight: '500', color: Color.main }}>Chọn</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '400', paddingHorizontal: 10 }} numberOfLines={1} ellipsizeMode={'tail'}>{add.street}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '400', paddingHorizontal: 10 }} numberOfLines={1} ellipsizeMode={'tail'}>{add.address}</Text>
                                <View style={{ height: 1, backgroundColor: 'black', marginVertical: 15 }}></View>
                            </View>
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
export default ModalAddress;
const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0,0,0,0.7)"
    },
    modalContainer: {
        backgroundColor: 'white',
        height: 350,
        alignItems: 'center',
        
    },
    txtTitle: {
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold',

    },
    header: {
        width: '100%',
        backgroundColor: Color.backgroundMain,
        alignItems: 'center',
        paddingVertical: 10,
    },
    txtBT: {
        color: Color.main,
        fontSize: 18,
        fontWeight: '500'
    },
    BT_exit: {
        position: 'absolute',
        top: 12,
        right: 15
    },
})