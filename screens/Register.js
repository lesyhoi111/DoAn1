import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isValidEmail, isValidRePass } from '../utilies/Validatetions';
import { isValidPass } from '../utilies/Validatetions';


function Register(props) {
  //const [keyBoardIsShow,setKeyBoardIsShow]=useState(false)
  /*useEffect(()=>{
    Keyboard.addListener(('keyboardDidShow'),()=>setKeyBoardIsShow(true))
    Keyboard.addListener(('keyboardDidHide'),()=>setKeyBoardIsShow(false))
  })*/
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorRePassword, setErrorRePassword] = useState('')

  const isValidOK = () => email.length > 0 && password > 0 && isValidEmail(email) && isValidPass(password) && password == rePassword
  
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ADE9FF' }} behavior='height' enabled={true}>

      <ScrollView flex={1}>
        <SafeAreaView style={styles.container}>
          <View style={styles.top}>
            <View flex={2} style={{ alignItems: 'center', paddingLeft: 20 }}>
              <Text style={styles.text_top}>Here's your first step with us!</Text>
            </View>
            <View flex={1.5} style={{ alignItems: 'center' }}>
              <Icon name="twitter-square" size={120} color="white" alignItems='center' />
            </View>
          </View>

          <View style={styles.center}>
            <View style={{ backgroundColor: 'white', paddingVertical: 20, marginHorizontal: 20, borderRadius: 20 }}>

              <Text style={styles.text_center}>Email:</Text>
              <TextInput placeholder='example@gmail.com' placeholderTextColor='#6E6E6E' style={styles.text_input}
                onChangeText={(text) => {
                  setEmail(text)
                  setErrorEmail(isValidEmail(text) ? '' : 'Email is not in correct format')
                }}
              ></TextInput>
              <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 15 }}></View>
              <Text style={{ color: 'red', paddingLeft: 15, marginVertical: 5 }}>{errorEmail}</Text>

              <Text style={styles.text_center}>Password:</Text>
              <TextInput placeholder='Enter your password' placeholderTextColor='#6E6E6E' style={styles.text_input} secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text)
                  setErrorPassword(isValidPass(text) ? '' : 'Password must be at least 3 characters')
                }}></TextInput>
              <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 15 }}></View>
              <Text style={{ color: 'red', paddingLeft: 15, marginVertical: 5 }}>{errorPassword}</Text>

              <Text style={styles.text_center}>Retype password:</Text>
              <TextInput placeholder='Re-Enter your password' placeholderTextColor='#6E6E6E' style={styles.text_input} secureTextEntry={true}
                onChangeText={(text) => {
                  setRePassword(text)
                  setErrorRePassword(isValidRePass(password, text) ? '' : 'Password must be confirmed')
                }}></TextInput>
              <View style={{ height: 1, backgroundColor: '#5DCCF5', marginHorizontal: 15 }}></View>
              <Text style={{ color: 'red', paddingLeft: 15, marginVertical: 5 }}>{errorRePassword}</Text>
              <TouchableOpacity style={[styles.button, { backgroundColor: isValidOK() == true ? '#FA6D21' : '#5DCCF5' }]} disabled={isValidOK() == false} onPress={() => { Alert.alert('success'); goBack('Login') }}>
                <Text style={{ fontSize: 27, fontWeight: 'bold', color: 'white', marginVertical: 7 }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottom}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <View style={{ backgroundColor: 'white', height: 1, flex: 1 }}></View>
              <Text style={[styles.text_center, { color: 'white', fontWeight: 'bold' }]}>Use other method?</Text>
              <View style={{ backgroundColor: 'white', height: 1, flex: 1 }}></View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
              <Icon name="facebook-official" size={50} color="blue" style={{ marginHorizontal: 15 }}></Icon>
              <Icon name="google-plus-official" size={50} color='red'></Icon>
            </View>
          </View>
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
    color: 'white'
  },
  text_center: {
    fontSize: 17,
    color: '#5DCCF5',
    paddingLeft: 15,
  },
  text_input: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 15,
    marginVertical: 2
  },
  button: {
    color: 'white',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 41,
    borderRadius: 20,
    marginTop: 5
  },
  top: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
    paddingBottom: 35
  },
  center: {
    flex: 2,
  },
  bottom: {
    flex: 0.9,
    //paddingTop:15,
  },
});

