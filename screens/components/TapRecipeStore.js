import React, { PureComponent, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, ViewBase, FlatList, Image, TouchableOpacity } from 'react-native'
import color from '../../src/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DATA } from './DATA';
import ItemIngredientSale from './ItemIngredientSale';
import { SafeAreaView } from 'react-native-safe-area-context';
function TapRecipe(props) {
    const [tabSelect, setTabSelect] = useState(0);

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{ marginTop: 5, marginHorizontal: 5 }}>
                <ScrollView horizontal contentContainerStyle={styles.ScrollView} >
                    <View style={styles.box}>
                        {props.listTab.map((tab, id) => (
                            <Pressable key={id} onPress={() => setTabSelect(id)} style={[styles.itemTitle, tabSelect == id && { backgroundColor: color.main }]}>
                                <Text style={[styles.text, tab.length < 10 && { width: 'auto' }, tabSelect == id && { color: 'white', width: 'auto' }]} numberOfLines={1}>{tab}</Text>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.content}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA}
                numColumns={2}
                renderItem={({ item }) => <ItemIngredientSale source={item.image} title={item.name} percent={item.percent} status={item.status} starpoint={item.starpoint} price={item.price} promotion={item.promotion} short={false}></ItemIngredientSale>}
                keyExtractor={item => item.id}
            ></FlatList>
            </View>
        </SafeAreaView>
    )
}

export default TapRecipe;
const styles = StyleSheet.create({
    content: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    itemTitle: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 17,
        color: 'gray',
        marginHorizontal: 10,
        marginVertical: 5,
        width: 100,
        fontWeight: '400',
        color: 'black',
        textAlign: 'center'
    },
    underline: {
        height: 2,
        backgroundColor: 'green',
        width: 50,
        alignSelf: 'center',
        marginRight: 25,
        marginTop: 2,
    },
    img: {
        flex: 1,
        height: 85,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    boxitem: {
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        //borderWidth:1
        //width: '95%',
    },
    titleBox: {
        flex: 1.4,
    },
    textTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 5
    },
    iconbox: {
        flex: 0.3,
        backgroundColor: 'red'
    },
    TextPrice: {
        color: 'red',
        fontSize: 17,
        fontWeight: '500',
    },
    status: {
        color: 'orange',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addCart: {
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
