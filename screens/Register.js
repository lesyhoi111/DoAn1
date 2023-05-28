import React, { useState, useEffect } from 'react';
import { Button, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isValidEmail, isValidRePass, isValidPass, isValidName } from '../utilies/Validatetions';
import { auth, createUserWithEmailAndPassword, collection, setDoc, db, doc } from '../firebase/firebase'
import moment from 'moment';
function Register(props) {
  //const [keyBoardIsShow,setKeyBoardIsShow]=useState(false)
  /*useEffect(()=>{
    Keyboard.addListener(('keyboardDidShow'),()=>setKeyBoardIsShow(true))
    Keyboard.addListener(('keyboardDidHide'),()=>setKeyBoardIsShow(false))
  })*/
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorRePassword, setErrorRePassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [id, setId] = useState('')
  const isValidOK = () => email.length > 0 && name.length > 0 && password > 0 && isValidEmail(email) && isValidName(name) && isValidPass(password) && password == rePassword

  const { navigation, route } = props
  const { navigate, goBack } = navigation

  handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        addUser(user.uid, name, user.email, password)
        setEmail('')
        setPassword('')
        setRePassword('')
        setName(''),
        setMessage('Đăng ký tài khoản thành công, quay lại đăng nhập để bắt đầu mua sắm ngay thôi nào!!')
        setModalVisible(true)
      })
      .catch((error) => {

        if (error.code === 'auth/email-already-in-use') {
          setMessage('Tài khoản Email này đã được đăng ký')
        } else {
          setMessage(error)
        }
        setModalVisible(true)

        // ..
      })
  }
  handleNavigate = ()=>{
    if(email){
      setModalVisible(false)
    }else{
      navigation.navigate('Login')
    }
  }
  const addUser = async (id, name, email, password) => {
    const docRef = await setDoc(doc(db, "KHACHHANG", id), {
      name: name,
      email: email,
      password: password,
      ngaythamgia: moment(Date.now()).format("DD-MM-YYYY"),
      magiamgiadadung: [],
      sdt: "",
      ngaysinh: "",
      sotien: "",
      cuahangdangtheodoi:[]
    });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ADE9FF' }} behavior='height' enabled={true}>

      <ScrollView flex={1}>
        <SafeAreaView style={styles.container}>
          <View style={styles.top}>
            <View style={{ alignItems: 'center', paddingLeft: 20 }}>
              <Text style={styles.text_top}>Here's your first step with us!</Text>
            </View>
            {/* <View flex={1.5} style={{ alignItems: 'center' }}>
              <Icon name="twitter-square" size={120} color="white" alignItems='center' />
            </View> */}
          </View>

          <View style={styles.center}>
            <View style={{ backgroundColor: 'white', paddingTop: 20, marginHorizontal: 20, borderRadius: 20, paddingBottom: 10 }}>

              <Text style={styles.text_center}>Name:</Text>
              <TextInput value={name} placeholder='Nguyễn Văn A' placeholderTextColor='#6E6E6E' style={styles.text_input}
                onChangeText={(text) => {
                  setName(text)
                  setErrorName(isValidName(text) ? '' : 'Name is required')
                }}
              ></TextInput>
              <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 15 }}></View>
              <Text style={{ color: 'red', paddingLeft: 15, marginVertical: 5 }}>{errorName}</Text>

              <Text style={styles.text_center}>Email:</Text>
              <TextInput value={email} placeholder='example@gmail.com' placeholderTextColor='#6E6E6E' style={styles.text_input}
                onChangeText={(text) => {
                  setEmail(text)
                  setErrorEmail(isValidEmail(text) ? '' : 'Email is not in correct format')
                }}
              ></TextInput>
              <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 15 }}></View>
              <Text style={{ color: 'red', paddingLeft: 15, marginVertical: 5 }}>{errorEmail}</Text>

              <Text style={styles.text_center}>Password:</Text>
              <TextInput value={password} placeholder='Enter your password' placeholderTextColor='#6E6E6E' style={styles.text_input} secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text)
                  setErrorPassword(isValidPass(text) ? '' : 'Password must be at least 6 characters')
                }}></TextInput>
              <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 15 }}></View>
              <Text style={{ color: 'red', paddingLeft: 15, marginVertical: 5 }}>{errorPassword}</Text>

              <Text style={styles.text_center}>Retype password:</Text>
              <TextInput value={rePassword} placeholder='Re-Enter your password' placeholderTextColor='#6E6E6E' style={styles.text_input} secureTextEntry={true}
                onChangeText={(text) => {
                  setRePassword(text)
                  setErrorRePassword(isValidRePass(password, text) ? '' : 'Password must be confirmed')
                }}></TextInput>
              <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 15 }}></View>
              <Text style={{ color: 'red', paddingLeft: 15, marginVertical: 5 }}>{errorRePassword}</Text>
              <TouchableOpacity style={[styles.button, { backgroundColor: isValidOK() == true ? '#FA6D21' : '#5DCCF5' }]} disabled={isValidOK() == false}
                onPress={handleRegister}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', marginVertical: 7 }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottom}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <View style={{ backgroundColor: 'white', height: 1, flex: 1 }}></View>
              <Text style={[styles.text_center, { color: 'white', fontWeight: 'bold' }]}>Use other method?</Text>
              <View style={{ backgroundColor: 'white', height: 1, flex: 1 }}></View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginBottom: 20 }}>
              <Icon name="facebook-official" size={50} color="blue" style={{ marginHorizontal: 15 }}></Icon>
              <Icon name="google-plus-official" size={50} color='red'></Icon>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{message}</Text>
                  <Pressable
                    style={[styles.buttonM, styles.buttonClose]}
                    onPress={handleNavigate}>
                    <Text style={styles.textStyle}>Xác nhận</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
        <View flex={0.1}></View>
      </ScrollView>

    </KeyboardAvoidingView>

  );
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text_top: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: 10,
    color: 'white',
    textAlign: 'center'
  },
  text_center: {
    fontSize: 17,
    color: '#5DCCF5',
    paddingLeft: 15,
  },
  text_input: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 15,
    // marginVertical: 2
  },
  button: {
    color: 'white',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    borderRadius: 20,
    marginTop: 5
  },
  top: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  center: {
    flex: 2,
  },
  bottom: {
    flex: 0.9,
    //paddingTop:15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonM: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#503EBF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
});

