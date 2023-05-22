import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, query, documentId, getDocs, doc, where } from "firebase/firestore";
import { db } from '../../firebase/index'
import Color from "../../src/Color";
import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";
import color from "../../src/Color";
const { width } = Dimensions.get('window');
const DetailedInformation = (props) => {
    const { item } = props
    const [listdata, setListdata] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getList();

    },[])
    const getList = async () => {
        setLoading(true);
        try {
            const hinhanhminhhoaRef = collection(db, `THUCPHAM/A5GCt0z9LiOv8abubzmJ/hinhanhmota`);
            const querySnapshot = await getDocs(hinhanhminhhoaRef);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
            });
            setTimeout(() => {
                setListdata(results);
                setLoading(false);
              }, 500);
        } catch (error) {
            console.error(error);
        }
    }

    const [showAll, setShowAll] = useState(false);
    // const listdata = [
    //     {
    //         url: '../../src/images/fish.png',
    //         description: "- Đây là cá không phải là trứng, gởi nhầm thôi à à thôi\n- Rất là đẹp luôn"
    //     },
    //     {
    //         url: '../../src/images/spice.png',
    //         description: "Nhầm nốt"
    //     },
    //     {
    //         url: '../../src/images/egg.png',
    //         description: "Đây rồi............"
    //     }
    // ]
    return (
        <View>
            {showAll == false ?
                <View >
                    <View style={{ marginBottom: 0, marginVertical: 10, padding: 10, height: 370 }}>
                        <Text style={styles.title}>Thông tin chi tiết sản phẩm</Text>
                        <View style={styles.lineImfor}>
                            <Text style={styles.titleInfo}>Nguồn gốc: </Text>
                            <Text style={styles.Info}>{item.nguongoc}</Text>
                        </View>
                        <View style={styles.lineImfor}>
                            <Text style={styles.titleInfo}>Ngày sản xuất: </Text>
                            <Text style={styles.Info}>{item.ngaysx}</Text>
                        </View>
                        <View style={styles.lineImfor}>
                            <Text style={styles.titleInfo}>Hạn sử dụng: </Text>
                            <Text style={styles.Info}>{item.hansd}</Text>
                        </View>
                        <View style={[styles.lineImfor, { marginBottom: 15 }]}>
                            <Text style={styles.titleInfo}>Mô tả thêm: </Text>
                            <Text style={styles.Info}>{item.mota}</Text>
                        </View>
                        {loading==false?
                        <View>
                        {listdata.map((item, id) => (
                            <View key={id}>
                                <Image source={{uri:item.url}} style={styles.img}></Image>
                                <Text style={styles.InfoImage}>{item.mota}</Text>
                            </View>
                        ))}
                        </View>
                        :<View>
                            <View  style={{width: '95%',height: 200,alignSelf: "center",marginVertical: 3,backgroundColor:color.backgroundDefault}}></View>
                                <View style={{width: '95%',height: 30,alignSelf: "center",backgroundColor:color.backgroundDefault}}></View>
                        </View>}
                    </View>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(110,110,110,0.9)' }}
                        onPress={() => setShowAll(!showAll)}>

                        <Text style={{ fontSize: 18, marginVertical: 15, marginRight: 10, color: 'white', fontWeight: '500' }}>Xem thêm</Text>
                        <Ionicons name="chevron-down-circle-outline" style={{ fontSize: 20, color: 'white', fontWeight: '500' }}></Ionicons>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <View style={{ marginBottom: 0, marginVertical: 10, padding: 10 }}>
                        <Text style={styles.title}>Thông tin chi tiết sản phẩm</Text>
                        <View style={styles.lineImfor}>
                            <Text style={styles.titleInfo}>Nguồn gốc: </Text>
                            <Text style={styles.Info}>Vườn gà - 12/5, đường Hùng Vương, quận 1, TP.HCM</Text>
                        </View>
                        <View style={styles.lineImfor}>
                            <Text style={styles.titleInfo}>Ngày sản xuất: </Text>
                            <Text style={styles.Info}>20/5/2023</Text>
                        </View>
                        <View style={styles.lineImfor}>
                            <Text style={styles.titleInfo}>Hạn sử dụng: </Text>
                            <Text style={styles.Info}>5 tháng</Text>
                        </View>
                        <View style={[styles.lineImfor, { marginBottom: 15 }]}>
                            <Text style={styles.titleInfo}>Mô tả thêm: </Text>
                            <Text style={styles.Info}>Trứng gà ta, ăn không lo đau bụng</Text>
                        </View>
                        {listdata.map((item,index) => (
                            <View key={index}>
                                <Image source={{ uri: item.url }} style={styles.img}></Image>
                                <Text style={styles.InfoImage}>{item.mota}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopWidth: 2, borderTopColor: '#eff1f4', backgroundColor: 'white' }}
                        onPress={() => setShowAll(!showAll)}>
                        <Text style={{ fontSize: 18, marginVertical: 15, marginRight: 10, color: 'black' }}>Thu gọn</Text>
                        <Ionicons name="chevron-up-circle-outline" style={{ fontSize: 20, color: 'black' }}></Ionicons>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
export default DetailedInformation;
const styles = StyleSheet.create({
    img: {
        width: '95%',
        height: 200,
        alignSelf: "center",
        marginVertical: 3
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    lineImfor: {
        flexDirection: "row",
    },
    titleInfo: {
        fontWeight: '500',
        fontSize: 17,
        marginRight: 5
    },
    Info: {
        color: 'black',
        fontSize: 17,
        paddingRight: 15,
        maxWidth: 272,
    },
    InfoImage: {
        color: 'black',
        fontSize: 17,
        marginHorizontal: 10
    },
})