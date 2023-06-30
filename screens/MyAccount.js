import React, { useState, useEffect,useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, View, Keyboard, Alert, ScrollView, Image, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../src/Color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalVerify from './components/ModalVerify';
import ModalAvatar from './components/ModalAvatar';
import ImagePicker from 'react-native-image-crop-picker';
import { collection, query, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { ref, getStorage, getDownloadURL, putFile, uploadBytes } from 'firebase/storage';
import { UIContext } from './UITab';
import { MyContext } from '../App';
import { db, storage } from '../firebase/index'
import { Button } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { async } from '@firebase/util';
// let listuser2=[];
function dateFormater(date, separator) {
  var day = date.getDate();
  // add +1 to month because getMonth() returns month from 0 to 11
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  // show date and month in two digits
  // if month is less than 10, add a 0 before it
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  // now we have day, month and year
  // use the separator to join them
  return day + separator + month + separator + year;
}
function toDate(dateString) {
  const dateParts = dateString.split("-");
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Trừ đi 1 vì tháng trong đối tượng Date bắt đầu từ 0
  const year = parseInt(dateParts[2]);

  return new Date(year, month, day);
}
function MyAccount(props) {
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const { user } = route.params
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ten, setTen] = useState(user.ten);
  const [mk, setMk] = useState(user.matkhau);
  const [sdt, setSdt] = useState(user.sdt);
  const [email, setEmail] = useState(user.email);
  const [dates, setDates] = useState(dateFormater(toDate(user.ngaysinh), '/'));
  const [showPass, setShowPass] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAva, setVisibleAva] = useState(false);
  const [image, setImage] = useState(user.anhdaidien);
  // const {  myuser, setMyuser  } = useContext(UIContext);
  const { listdata, shop, listuser } = useContext(MyContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDates(dateFormater(date, '/'));
    hideDatePicker();
  };

  const TakePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
    // const result = await launchCamera({
    //   mediaType:'photo'
    // });
    // console.log(result)
    // setImage(result.assets[0].uri);

  }
  const ChoosePhoto = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
    // const result = await launchImageLibrary({
    //   mediaType:'photo'
    // });
    // console.log(result)
    // setImage(result.assets[0].uri);
  }
  // const getlistuser = async () => {
  //   try {
  //   //     const thucphamRef = collection(db, "KHACHHANG");
  //   //     const thucphamQuery = query(thucphamRef);
  //   //     const querySnapshot = await getDocs(thucphamQuery);
  //   //     querySnapshot.forEach((doc) => {
  //   //         listuser.push({ id: doc.id, ...doc.data() });
  //   //   });
  //   const q = query(collection(db, "KHACHHANG"));
  //       const querySnapshot = onSnapshot(q, (querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           listuser2.push({ id: doc.id, ...doc.data() });
  //           console.log("---")
  //           console.log(doc.data().anhdaidien)
  //         });
  //       });
  //     } catch (error) {
  //       console.error(error)
  //     }
  // }
  const SaveData = async () => {
    if (image != user.anhdaidien) {
      const b = await uploadpic();
      const Ref = doc(db, "KHACHHANG", user.id);
      const a = await updateDoc(Ref, {
        anhdaidien: b,
        ten: ten,
        matkhau: mk,
        sdt: sdt,
        email: email,
        ngaysinh: dates.replace(/\//g, "-"),
      });
      // await getlistuser();
      setTimeout( async() => {
        console.log("trước")
        // await setMyuser(listuser2.find((item) => { return item.uid == user.uid }))
        navigation.goBack();
      }, 2000);
      Alert.alert("lưu thành công")
    }
    else {
      const Ref = doc(db, "KHACHHANG", user.id);
      const a = await updateDoc(Ref, {
        ten: ten,
        matkhau: mk,
        sdt: sdt,
        email: email,
        ngaysinh: dates.replace(/\//g, "-"),
      });
      setTimeout(() => {
        console.log(a)
        navigation.goBack();
      }, 1000);
      Alert.alert("lưu thành công")
    }
  }
  const IsUpdate = () => {
    if (image != user.anhdaidien || ten != user.ten || mk != user.matkhau || sdt != user.sdt || email != user.email || dates != dateFormater(toDate(user.ngaysinh), '/')) {
      setVisible(true);
    }
  }

  const uploadpic = async () => {
    // const storageRef = ref(storage, `test`);
    // const imageContent = await readFile(image, 'base64');
    // const task = putString(storageRef,`data:image/jpeg;base64,${imageContent}`, 'data_url')
    // .then((snapshot) => {
    //   console.log('Uploaded a data_url string!');
    // });

    // task.on('state_changed', taskSnapshot => {
    //   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    // });
    // const storage1=getStorage();
    const storageRef = ref(storage, "avatar" + Date.now() + "aaa");
    const img = await fetch(image);
    const bytes = await img.blob();
    const task = await uploadBytes(storageRef, bytes);

    // task.on('state_changed', taskSnapshot => {
    //   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    // });
    let a;
    await getDownloadURL(storageRef).then((x) => {
      console.log(x)
      a = x;
      setImage(x)
    })
    return a;
    // await getDownloadURL(storageRef).then((x)=>{
    //   console.log(x)
    //   setImage(x)
    // })

    // 'file' comes from the Blob or File API


    // task.then(() => {
    //   console.log('Image uploaded to the bucket!');
    // }).catch(error =>{
    //   console.error(error);
    // });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#dcdcdc' }} behavior='height' enabled={true}>
      {/* <ScrollView flex={1} style={{backgroundColor: '#dcdcdc'}}> */}
      <SafeAreaView style={styles.container}>
        <ModalVerify
          visible={visible}
          onClose={() => setVisible(false)}
          onTrue={() => SaveData()}
          password={user.matkhau}
        />
        <ModalAvatar
          visible={visibleAva}
          onClose={() => setVisibleAva(false)}
          takePhoto={() => { TakePhotoFromCamera() }}
          choosePhoto={() => { ChoosePhoto() }}
        />
        <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={navigation.goBack}><Ionicons name='arrow-back' size={25} color={'black'}></Ionicons></TouchableOpacity>
          <View style={[{ backgroundColor: 'white', alignItems: 'center', flex: 1 }]}></View>
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => { uploadpic() }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: Color.main }}>upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setVisible(true) }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: Color.main }}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
          <TouchableOpacity onPress={() => { setVisibleAva(true) }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image == null ? "https://www.w3schools.com/howto/img_avatar.png" : image,
                }}
                style={{ height: 100, width: 100, blurRadius: 10 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'white', paddingTop: 15, flex: 1 }}>
          <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 5 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Họ Tên</Text>
              </View>
              <View style={{ flex: 2.7, paddingLeft: 15 }}>
                <TextInput fontSize={16} fontWeight={'500'}
                  value={ten}
                  onChangeText={(text) => {
                    setTen(text)
                  }}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 5, paddingRight: 5 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Mật khẩu</Text>
              </View>
              <View style={{ flex: 2.6, paddingLeft: 15 }}>
                <TextInput fontSize={16} secureTextEntry={!showPass} fontWeight={'500'}
                  value={mk}
                  onChangeText={(text) => {
                    setMk(text)
                  }}></TextInput>
              </View>
              <TouchableOpacity onPress={() => { setShowPass(!showPass) }}>
                <Ionicons name={showPass == false ? 'lock-closed-sharp' : 'lock-open-sharp'} size={20} color={'#a9a9a9'}></Ionicons>
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 5 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>SĐT</Text>
              </View>
              <View style={{ flex: 2.7, paddingLeft: 15 }}>
                <TextInput fontSize={16} fontWeight={'500'}
                  value={sdt}
                  onChangeText={(text) => {
                    setSdt(text)
                  }}></TextInput>
              </View>
            </View>
          </View>
          <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 5 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Email</Text>
              </View>
              <View style={{ flex: 2.7, paddingLeft: 15 }}>
                <TextInput fontSize={16} fontWeight={'500'} numberOfLines={1}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text)
                  }}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={{ margin: 15, backgroundColor: 'white', borderRadius: 8, elevation: 10, borderColor: 'black', marginVertical: 10 }}>
            <TouchableOpacity onPress={showDatePicker}
              style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 5 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Ngày sinh</Text>
              </View>
              <View style={{ flex: 2.7, paddingLeft: 15, paddingVertical: 10 }} >
                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{dates}</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/* <View style={{height:45,width:'100%',backgroundColor:'white'}}></View> */}
      </SafeAreaView>
      {/* </ScrollView> */}

    </KeyboardAvoidingView>
  )
};
export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc'
  },
  txtheader: {
    color: Color.main,
    fontSize: 27,
    fontWeight: 'bold',
  },
  titleHeader: {
    fontSize: 30,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 15
  }
})