import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isValidEmail, isValidRePass } from '../utilies/Validatetions';
import { isValidPass } from '../utilies/Validatetions';
import Lottie from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { signInWithEmailAndPassword, auth} from '../firebase/firebase'
const { width, height } = Dimensions.get('window');

function Login(props) {
    // const [keyBoardIsShow, setKeyBoardIsShow] = useState(false)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     Keyboard.addListener(('keyboardDidShow'), () => setKeyBoardIsShow(true))
    //     Keyboard.addListener(('keyboardDidHide'), () => setKeyBoardIsShow(false))
    // })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorRePassword, setErrorRePassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const isValidOK = () => email.length > 0 && password > 0 && isValidEmail(email) && isValidPass(password) 

    const {navigation,route}=props
    const {navigate,goBack}=navigation

    const handleLogin =()=>{
    signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setPassword('')
                setLoading(true);
                setTimeout(() => {
                    navigate('UITab')
                    setLoading(false);
                }, 1000);
                // ...
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password'){
                    setMessage('Mật khẩu không đúng, vui lòng kiểm tra lại')
                }else if (error.code === 'auth/user-not-found'){
                    setMessage('Email không đúng, vui lòng kiểm tra lại')
                }else{
                    setMessage(error.code)
                }
                setModalVisible(true)
            });
        }
    
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }} behavior='height' enabled={true}>

        <ScrollView flex={1}>
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <View flex={2} style={{ alignItems: 'center' }}>
                    <Text style={styles.text_top}>Already have a Account?</Text>
                </View>
                <View flex={1.5} style={{ alignItems: 'center' }}>
                    <Icon name="twitter-square" size={100} color="#5DCCF5" alignItems='center' />
                    {/* <Image source={require("../src/images/logo.png")} style={{height:10,width:130,resizeMode:'cover'}}></Image> */}
                </View>
            </View>

            <View style={styles.center}>
                <Text style={styles.text_center}>Email:</Text>
                <TextInput placeholder='example@gmail.com' placeholderTextColor='#6E6E6E' style={styles.text_input}
                    onChangeText={(text) => {
                        setEmail(text)
                        setErrorEmail(isValidEmail(text) ? '' : 'Email is not in correct format')
                    }}
                ></TextInput>
                <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 20 }}></View>
                <Text style={{ color: 'red', paddingLeft: 20, marginVertical: 7 }}>{errorEmail}</Text>
                <Text style={styles.text_center}>Password:</Text>
                <TextInput placeholder='Enter your password' placeholderTextColor='#6E6E6E' style={styles.text_input} secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text)
                        setErrorPassword(isValidPass(text) ? '' : 'Password must be at least 6 characters')
                    }}></TextInput>
                <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 20 }}></View>
                <Text style={{ color: 'red', paddingLeft: 20, marginVertical: 7 }}>{errorPassword}</Text>

                <TouchableOpacity style={[styles.button, { backgroundColor: isValidOK() == true ? '#FA6D21' : '#5DCCF5' }]} disabled={isValidOK() == false} 
                onPress={handleLogin}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: 'white', marginVertical: 7 }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20,marginTop:20 }} onPress={()=>{navigate('Register')}}>
                    <Text style={styles.text_center}>New user? Register now</Text>
                </TouchableOpacity>
            </View>
            {/* {!keyBoardIsShow && */}
                <View style={styles.bottom}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                        <View style={{ backgroundColor: '#5DCCF5', height: 1, flex: 1 }}></View>
                        <Text style={[styles.text_center, { color: '#5DCCF5', fontWeight: 'bold' }]}>Use other method?</Text>
                        <View style={{ backgroundColor: '#5DCCF5', height: 1, flex: 1 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                        <Icon name="facebook-official" size={50} color="blue" style={{ marginHorizontal: 15 }}></Icon>
                        <Icon name="google-plus-official" size={50} color='red'></Icon>
                    </View>
                </View>
            {/* } */}
            {loading==true&&
            <View style={{position:'absolute',height:height,width:width,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                <Lottie source={require('../src/Lottie/loading2.json')} autoPlay speed={1.5}/>
            </View>}
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
                    onPress={() =>setModalVisible(false)}>
                    <Text style={styles.textStyle}>Xác nhận</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
        </ScrollView>
           
    </KeyboardAvoidingView>
    );
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_top: {
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingLeft: 20,
        color: '#5DCCF5',
    },
    text_center: {
        fontSize: 17,
        color: '#5DCCF5',
        paddingLeft: 20,
    },
    text_input: {
        fontSize: 20,
        color: 'black',
        paddingLeft: 20,
        marginVertical: 2
    },
    button: {
        color: 'white',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 41,
        borderRadius: 20,
        marginTop: 40
    },
    top: {
        flex: 1.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 35,
        paddingBottom: 35
    },
    center: {
        flex: 2,
        marginTop:10
    },
    bottom: {
        flex: 0.8,
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

