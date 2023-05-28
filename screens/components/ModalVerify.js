import React, { useState } from 'react';
import { Modal, TextInput, Button, View,Text, TouchableOpacity, Alert,StyleSheet } from 'react-native';
import Color from '../../src/Color';

const ModalVerify = ({ visible, onClose, password, onTrue }) => {
  const [pass, setPass] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSave = () => {
    if(pass==password){
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
      <TouchableOpacity style={{flex:1}} onPress={()=>{onClose()}}></TouchableOpacity>
        <View style={styles.modalContainer}>
        <Text style={styles.txtTitle}>Xác thực mật khẩu!</Text>
        <Text style={styles.txtTitle_min}>Nhập đúng mật khẩu để lưu những thay đổi</Text>
        <TextInput
        secureTextEntry
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
        height:260,
        padding:10,
        alignItems:'center',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    txtTitle:{
        color:'black',
        fontSize:20,
        fontWeight:'bold',
    },
    txtTitle_min: {
      fontSize: 16,
      marginBottom:10,
  },
    txtBT:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    },
    txtInput:{
        fontSize:16,
        borderColor:Color.main,
        borderWidth:1,
        width:300,
        marginVertical:15,
        borderRadius:15,
        textAlign:'center'
    },
    button:{
        backgroundColor:Color.main,
        width:250,
        alignItems:'center',
        borderRadius:10,
        marginTop:10,
        paddingVertical:10
    },
})