import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Color from '../../src/Color';
import { useDispatch } from "react-redux";
import { updateAdd } from "./Redux/AddressSlice";
import Lottie from 'lottie-react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ModalAvatar = ({ visible, onClose, takePhoto, choosePhoto}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const TakePhotoFromCamera = async () => {
        setLoading(true)
        await takePhoto()
        setTimeout(() => {
            setLoading(false);
            onClose();
          }, 500);
    }
    const ChoosePhoto = async () => {
        setLoading(true)
        await choosePhoto()
        setTimeout(() => {
            setLoading(false);
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
                        <Text style={styles.txtTitle}>Tải ảnh lên</Text>
                        <Text style={styles.txtTitle_min}>Chọn ảnh từ điện thoại của bạn</Text>
                    </View>
                    <View style={styles.body}>
                        <TouchableOpacity style={styles.btn} onPress={()=>{TakePhotoFromCamera()}}>
                            <Text style={styles.txt_btn}>Chụp ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={()=>{ChoosePhoto()}}>
                            <Text style={styles.txt_btn}>Chọn từ thư viện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.txt_btn}>Thoát</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {loading==true&&<View style={{width:'100%',height:320,position:'absolute',top:44,backgroundColor:"rgba(250,250,250,0.7)",left:0}}>
                    <Lottie source={require('../../src/Lottie/loading.json')} autoPlay loop />
                        </View>}
                </View>
            </View>
        </Modal>
    );
};
export default ModalAvatar;
const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(200,200,200,0.9)"
    },
    modalContainer: {
        backgroundColor: 'white',
        height: 260,
        alignItems: 'center',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    txtTitle: {
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold',
    },
    txtTitle_min: {
        fontSize: 16,
    },
    header: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginBottom:5
    },
    txt_btn: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
    btn: {
        backgroundColor:Color.main,
        width:250,
        paddingVertical:10,
        marginVertical:7,
        alignItems:'center',
        borderRadius:10
    },
})