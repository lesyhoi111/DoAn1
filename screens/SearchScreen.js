import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from './components/Search';
import color from '../src/Color';
import {DATA} from './components/DATA'
import ItemIngredientSale from './components/ItemIngredientSale';

function SearchScreen() {
    const [search, setSearch] = useState('')
    let productData = [];
    const searched = () => DATA.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    const [isSearch, setIsSearch]=useState(false)
    useEffect(()=>{
        setIsSearch(true);
    });
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack}>
                    <Icon name="arrow-left" size={25} color={color.backgroundMain} alignItems='center' />
                </TouchableOpacity>
                <View style={styles.SearchInput}>
                    <Search onChangeText={(text) => { setSearch(text) }} openSearch={isSearch}></Search>
                </View>
            </View>
            <View style={styles.content}>
                {search.length > 0 ? searched().length > 0 ? <View style={styles.ListItem}>

                    <FlatList
                        data={searched()}
                        numColumns={2}
                        renderItem={({ item }) => <ItemIngredientSale source={item.image} title={item.name} percent={item.percent} status={item.status} starpoint={item.starpoint} price={item.price} promotion={item.promotion} short={false}></ItemIngredientSale>}
                        keyExtractor={item => item.id}
                    ></FlatList>
                </View> : 
                <View style={{alignItems:'center',backgroundColor:'white',width:'100%'}}>
                    <Image style={{height:200,width:200}} source={require('../src/images/notfound.jpg')}></Image>
                <Text style={{ color: '#333', fontSize: 20,textAlign:'center' }}>Xin lỗi, có vẻ như chúng tôi không có sản phẩm này!</Text> 
                </View>
                :
                    <View>
                        <Text style={{ color: '#333', fontSize: 18 }}>Nhập từ khóa để tìm kiếm</Text>
                    </View>}
            </View>


        </SafeAreaView>
    )
};
export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    btnBack: {
        padding: 10
    },
    SearchInput: {
        flex: 1

    },
    ListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    notFoundScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})