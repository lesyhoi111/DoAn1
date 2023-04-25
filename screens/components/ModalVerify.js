import React, { useState } from 'react';
import { Modal, TextInput, Button, View,Text, TouchableOpacity, Alert,StyleSheet } from 'react-native';
import Color from '../../src/Color';

const ModalVerify = ({ visible, onClose, password, onTrue }) => {
  const [pass, setPass] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSave = () => {
    if(pass==password){
        Alert.alert("lưu thành công")
        onClose();
        onTrue();
    }else{
        setShowError(true);
    }
  };

  return (
    <Modal 
    animationType="slide"
    transparent={true}
    visible={visible} onRequestClose={onClose}>
      <View style={styles.backgroundView}>
        <View style={styles.modalContainer}>
        <Text style={styles.txtTitle}>Mời nhập mật khẩu để lưu thay đổi!</Text>
        <TextInput
          placeholder="Re-Password"
          value={pass}
          onChangeText={setPass}
          style={styles.txtInput}
        />
        {showError==true&&
        <Text>Mật khẩu không chính xác!</Text>
        }
        <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.txtBT}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.txtBT}>Hủy</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ModalVerify;
const styles = StyleSheet.create({
    backgroundView: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor:"rgba(0,0,0,0.7)"
    },
    modalContainer:{
        backgroundColor:'white',
        height:230,
        padding:15,
        alignItems:'center'
    },
    txtTitle:{
        color:'black',
        fontSize:18,
        fontWeight:'bold'
    },
    txtBT:{
        color:Color.main,
        fontSize:18,
        fontWeight:'500'
    },
    txtInput:{
        fontSize:16,
        borderColor:Color.main,
        borderWidth:1,
        width:300,
        marginVertical:10,
        borderRadius:15
    },
    button:{
        backgroundColor:Color.backgroundDefault,
        width:200,
        alignItems:'center',
        borderRadius:15,
        marginVertical:10,
        paddingVertical:7
    },
})