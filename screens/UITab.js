import React,{ createContext, useState,useContext,useEffect }  from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { collection, query, where, getDocs,orderBy,limit  }  from "firebase/firestore";
import {db} from '../firebase/index'
import {auth} from "../firebase/firebase"
import { MyContext } from '../App';
import Home from './Home'
import Cart from './Cart'
import SearchScreen from './SearchScreen'
import StackProfile from './StackProfile'
import Color from '../src/Color' 
import { useDispatch } from 'react-redux'
import { addUser } from './components/Redux/CurentUserSlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
export const UIContext = createContext();

function UITab() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getUserCredential = async () => {
        try {
            const userCredential = await AsyncStorage.getItem('user');
            if (userCredential) {
                dispatch(addUser(JSON.parse(userCredential)))
            } 
        } catch (error) {
            console.log('Error retrieving user credential:', error);
        }
    };
    getUserCredential();
}, []);
//   const [listdata, setListdata] = useState([]);
//   useEffect(()=>{
//     getData();
// },[])
// const getData= async()=>{
//     console.log("getdata ")
//     // setLoading(true)
    
//     const q = query(collection(db, "THUCPHAM"),
//       );
//       const querySnapshot = await getDocs(q);
//       const results = [];
//       querySnapshot.forEach((doc) => {
//         results.push({id:doc.id,...doc.data()});
//       });
//       setListdata(results)
//       console.log(listdata)
      
// };
const [myuser, setMyuser] = useState({
  anhdaidien: "",
  id: "",
  ten: "",
  email: "",
  password: "",
  ngaythamgia: "",
  magiamgiadadung: [],
  sdt: "00",
  ngaysinh: "",
  sotien: 0,
  uid: ""
})
const user = auth.currentUser;
const { listdata, shop, listuser } = useContext(MyContext);
useEffect(() => {
  setMyuser(listuser.find((item) => { return item.uid == user.uid }))
  // getlistuser();
})
  return (
    <UIContext.Provider value={{ myuser, setMyuser }}>
    <Tab.Navigator initialRouteName="Home"  screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        //tabBarLabelStyle:{fontSize:14, fontWeight:'bold'},
        tabBarActiveTintColor: Color.main,
        tabBarStyle:{
            backgroundColor:'white',
            height:45
        }
    }}>
      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={36} />
          ),
        }}/>

      <Tab.Screen name="SearchScreen" component={SearchScreen}  options={{
          tabBarLabel: 'SearchScreen',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={35} />
          ),
        }} />

      <Tab.Screen name="Cart" component={Cart}  options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart-plus" color={color} size={35} />
          ),
        }} />
        <Tab.Screen name="StackProfile" component={StackProfile} options={{
          tabBarLabel: 'StackProfile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={35} />
          ),
        }}/>
    </Tab.Navigator>
    </UIContext.Provider>
  );
}
export default UITab;