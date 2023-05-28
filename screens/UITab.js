import React,{ createContext, useState,useEffect }  from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { collection, query, where, getDocs,orderBy,limit  }  from "firebase/firestore";
import {db} from '../firebase/index'
import Home from './Home'
import Cart from './Cart'
import SearchScreen from './SearchScreen'
import StackProfile from './StackProfile'
import Color from '../src/Color' 
import { useDispatch } from 'react-redux'
import { addUser } from './components/Redux/CurentUserSlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
// export const MyContext = createContext();

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
  return (
    // <MyContext.Provider value={{ listdata, setListdata }}>
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
    // </MyContext.Provider>
  );
}
export default UITab;