import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert, FlatList } from "react-native";
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs, } from "firebase/firestore";
import { db } from '../../firebase/index'
import Color from "../../src/Color";
import color from "../../src/Color";
const { width } = Dimensions.get('window');
const ListComment = (props) => {
    const { item } = props

    const [listdata, setListdata] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getList();

    }, [])
    const getList = async () => {
        setLoading(true);
        try {
            const hinhanhminhhoaRef = collection(db, `THUCPHAM/A5GCt0z9LiOv8abubzmJ/danhgiasanpham`);
            const querySnapshot = await getDocs(hinhanhminhhoaRef);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
            });
            setTimeout(() => {
                setListdata(results);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    }

    const [like, setLike] = useState(false)
    const [showAll, setShowAll] = useState(false);

    const data = [
        {
            id: 1,
            name: "helo"
        }, {
            id: 2,
            name: "helo"
        }, {
            id: 3,
            name: "helo"
        }, {
            id: 4,
            name: "helo"
        }, {
            id: 5,
            name: "helo"
        },]
    const itemComment = (itemCom) => {
        return (
            <View style={{ padding: 10, borderBottomColor: 'silver', borderBottomWidth: 1, }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require('../../src/images/147140.png')} style={{ height: 27, width: 27, borderRadius: 20 }}></Image>
                    <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 15 }}>Lê Sỹ Hội</Text>
                </View>
                <View style={[styles.boxStar, { marginLeft: 30 }]}>
                    {Array(5).fill(0).map((_, id) => (<AntIcon key={id} name='star' style={[styles.star, { color: ((id + 1) <= itemCom.sosao) ? Color.colorStar : Color.placeHoder }]}></AntIcon>))}
                </View>
                <Text style={{ marginVertical: 7, fontSize: 15 }}>{itemCom.noidung}</Text>
                <View style={styles.footer}>
                    <MaterialCommunityIcons name="clock-time-four" style={{ fontSize: 17, marginRight: 3 }}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 15 }}>{itemCom.ngaydg}</Text>
                    <TouchableOpacity onPress={() => setLike(!like)}>
                        <AntIcon name="like1" style={{ fontSize: 17, marginRight: 3, marginLeft: 25, color: like == false ? 'black' : 'green' }}></AntIcon>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', marginRight: 3, fontSize: 15 }}>{itemCom.luotthich}</Text>
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
                            {Array(5).fill(3).map((item, id) => (<AntIcon key={id} name='star' style={styles.star}></AntIcon>))}
                            <Text style={{ color: 'red', marginRight: 10 }}>{item.sosao.toFixed(1)}/5</Text>
                            <Text>({item.luotdanhgia} đánh giá)</Text>
                        </View>
                    </View>
                    {loading == false ?
                        <View style={{ height: 300 }}>
                            {listdata.map((itemCom, id) => (
                                <View key={id} style={{ padding: 10, borderBottomColor: 'silver', borderBottomWidth: 1, }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={require('../../src/images/147140.png')} style={{ height: 27, width: 27, borderRadius: 20 }}></Image>
                                        <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 15 }}>Lê Sỹ Hội</Text>
                                    </View>
                                    <View style={[styles.boxStar, { marginLeft: 30 }]}>
                                        {Array(5).fill(0).map((_, id) => (<AntIcon key={id} name='star' style={[styles.star, { color: ((id + 1) <= itemCom.sosao) ? Color.colorStar : Color.placeHoder }]}></AntIcon>))}
                                    </View>
                                    <Text style={{ marginVertical: 7, fontSize: 15 }}>{itemCom.noidung}</Text>
                                    <View style={styles.footer}>
                                        <MaterialCommunityIcons name="clock-time-four" style={{ fontSize: 17, marginRight: 3 }}></MaterialCommunityIcons>
                                        <Text style={{ fontSize: 15 }}>{itemCom.ngaydg}</Text>
                                        <TouchableOpacity onPress={() => setLike(!like)}>
                                            <AntIcon name="like1" style={{ fontSize: 17, marginRight: 3, marginLeft: 25, color: like == false ? 'black' : 'green' }}></AntIcon>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', marginRight: 3, fontSize: 15 }}>{itemCom.luotthich}</Text>
                                        <Text style={{ fontSize: 15 }}>Thích</Text>
                                    </View>
                                </View>
                            ))}
                            {/* <FlatList
                    scrollEnabled={false}
                    data={listdata}
                    renderItem={(item)=>{itemComment(item)}}
                    keyExtractor={(item) => item.id}
                ></FlatList> */}
                        </View>
                        :
                        <View style={{ height: 300 }}>
                            {data.map((itemCom, id) => (
                                <View key={id} style={{ padding: 10, borderBottomColor: 'silver', borderBottomWidth: 1, }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ height: 27, width: 27, borderRadius: 20, backgroundColor: color.backgroundDefault }}></View>
                                        <View style={{ backgroundColor: color.backgroundDefault, marginHorizontal: 10, height: 15, width: 100 }}></View>
                                    </View>
                                    <View style={{ marginLeft: 30, backgroundColor: color.backgroundDefault, height: 15, width: 100 }}>
                                    </View>
                                    <View style={{ marginVertical: 7, backgroundColor: color.backgroundDefault, height: 15, width: 200 }}></View>
                                    <View style={styles.footer}>
                                        <MaterialCommunityIcons name="clock-time-four" style={{ fontSize: 17, marginRight: 3 }}></MaterialCommunityIcons>
                                        <Text style={{ fontSize: 15 }}>20-6-2023</Text>
                                        <TouchableOpacity >
                                            <AntIcon name="like1" style={{ fontSize: 17, marginRight: 3, marginLeft: 25, color: like == false ? 'black' : 'green' }}></AntIcon>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', marginRight: 3, fontSize: 15 }}>0</Text>
                                        <Text style={{ fontSize: 15 }}>Thích</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    }
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
                            {Array(5).fill(3).map((item, id) => (<AntIcon key={id} name='star' style={styles.star}></AntIcon>))}
                            <Text style={{ color: 'red', marginRight: 10 }}>5.0/5</Text>
                            <Text>(200 đánh giá)</Text>
                        </View>
                    </View>
                    <View>
                        {listdata.map((itemCom, id) => (
                            <View key={id} style={{ padding: 10, borderBottomColor: 'silver', borderBottomWidth: 1, }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={require('../../src/images/147140.png')} style={{ height: 27, width: 27, borderRadius: 20 }}></Image>
                                    <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 15 }}>Lê Sỹ Hội</Text>
                                </View>
                                <View style={[styles.boxStar, { marginLeft: 30 }]}>
                                    {Array(5).fill(0).map((_, id) => (<AntIcon key={id} name='star' style={[styles.star, { color: ((id + 1) <= itemCom.sosao) ? Color.colorStar : Color.placeHoder }]}></AntIcon>))}
                                </View>
                                <Text style={{ marginVertical: 7, fontSize: 15 }}>{itemCom.noidung}</Text>
                                <View style={styles.footer}>
                                    <MaterialCommunityIcons name="clock-time-four" style={{ fontSize: 17, marginRight: 3 }}></MaterialCommunityIcons>
                                    <Text style={{ fontSize: 15 }}>{itemCom.ngaydg}</Text>
                                    <TouchableOpacity onPress={() => setLike(!like)}>
                                        <AntIcon name="like1" style={{ fontSize: 17, marginRight: 3, marginLeft: 25, color: like == false ? 'black' : 'green' }}></AntIcon>
                                    </TouchableOpacity>
                                    <Text style={{ color: 'black', marginRight: 3, fontSize: 15 }}>{itemCom.luotthich}</Text>
                                    <Text style={{ fontSize: 15 }}>Thích</Text>
                                </View>
                            </View>
                        ))}

                        {/* <FlatList
                    data={listdata}
                    renderItem={(item)=>itemComment(item)}
                    keyExtractor={(item) => item.id}
                ></FlatList> */}
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