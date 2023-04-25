import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert, FlatList } from "react-native";
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Color from "../../src/Color";
const { width } = Dimensions.get('window');
const ListComment = (props) => {
    const [like, setLike] = useState(false)
    const [showAll, setShowAll] = useState(false);
    const data = [
        {id:1,
        name:"helo"
    }, {id:2,
        name:"helo"
    },{id:3,
        name:"helo"
    },{id:4,
        name:"helo"
    },{id:5,
        name:"helo"
    },]
    const itemComment = () => {
        return (
            <View style={{ padding: 10, borderBottomColor: 'silver', borderBottomWidth: 1, }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require('../../src/images/147140.png')} style={{ height: 27, width: 27, borderRadius: 20 }}></Image>
                    <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 15 }}>Lê Sỹ Hội</Text>
                </View>
                <View style={[styles.boxStar, { marginLeft: 30 }]}>
                    {Array(5).fill(3).map((item,id) => (<AntIcon key={id} name='star' style={styles.star}></AntIcon>))}
                </View>
                <Text style={{ marginVertical: 7, fontSize: 15 }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</Text>
                <View style={styles.footer}>
                    <MaterialCommunityIcons name="clock-time-four" style={{ fontSize: 17, marginRight: 3 }}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 15 }}>20/11/2022</Text>
                    <TouchableOpacity onPress={() => setLike(!like)}>
                        <AntIcon name="like1" style={{ fontSize: 17, marginRight: 3, marginLeft: 25, color: like == false ? 'black' : 'green' }}></AntIcon>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', marginRight: 3, fontSize: 15 }}>10</Text>
                    <Text style={{ fontSize: 15 }}>Thích</Text>
                </View>
            </View>
        )
    }
    return (
        <View>
            {showAll == false ?
            <View>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Đánh Giá Sản Phẩm</Text>
                <View style={styles.boxStar}>
                    {Array(5).fill(3).map((item,id) => (<AntIcon key={id} name='star' style={styles.star}></AntIcon>))}
                    <Text style={{ color: 'red', marginRight: 10 }}>5.0/5</Text>
                    <Text>(200 đánh giá)</Text>
                </View>
            </View>
            <View style={{height:370}}>
                <FlatList
                    scrollEnabled={false}
                    data={data}
                    renderItem={itemComment}
                    keyExtractor={(item) => item.id}
                ></FlatList>
            </View>
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(110,110,110,0.9)' }}
                onPress={() => setShowAll(!showAll)}>

                <Text style={{ fontSize: 18, marginVertical: 15, marginRight: 10, color: 'white', fontWeight: '500' }}>Xem thêm</Text>
                <Ionicons name="chevron-down-circle-outline" style={{ fontSize: 20, color: 'white', fontWeight: '500' }}></Ionicons>
            </TouchableOpacity>
            </View>
            :
            <View>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Đánh Giá Sản Phẩm</Text>
                <View style={styles.boxStar}>
                    {Array(5).fill(3).map((item,id) => (<AntIcon key={id} name='star' style={styles.star}></AntIcon>))}
                    <Text style={{ color: 'red', marginRight: 10 }}>5.0/5</Text>
                    <Text>(200 đánh giá)</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={itemComment}
                    keyExtractor={(item) => item.id}
                ></FlatList>
            </View>
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopWidth: 3, borderTopColor: '#eff1f4', backgroundColor: 'white' }}
                        onPress={() => setShowAll(!showAll)}>
                        <Text style={{ fontSize: 18, marginVertical: 15, marginRight: 10, color: 'black' }}>Thu gọn</Text>
                        <Ionicons name="chevron-up-circle-outline" style={{ fontSize: 20, color: 'black' }}></Ionicons>
                    </TouchableOpacity>
            </View>
            }
        </View >
    )
}
export default ListComment;
const styles = StyleSheet.create({
    txtheader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 3
    },
    header: {
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    boxStar: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 16,
        marginRight: 2,
        color: Color.colorStar
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
})