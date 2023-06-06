import React, { useState, useEffect, useContext } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../src/Color'
import { Rating, AirbnbRating } from 'react-native-ratings';
import color from '../src/Color';
import { collection, query, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/index'
import moment from 'moment';
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get('window');
let listRV = []
const ReviewPro = (props) => {
    const { navigation, route } = props
    const { listItem, idDonHang } = route.params
    const [isloading, setIsloading] = useState(false);
    const user = useSelector((state) => state.CurentUser)
    console.log(listItem)
    const listTp = [
        {
            id: "1201202",
            matp: "QBmDTwNSzp1Yi1HDr1l2",
            giatien: 20000,
            soluong: 2,
            ten: "cá"
        },
        {
            id: "12012043",
            matp: "A5GCt0z9LiOv8abubzmJ",
            giatien: 20000,
            soluong: 2,
            ten: "bò"
        },
    ]
    useEffect(() => {
        listRV = []
        listItem.forEach((item, i) => {
            console.log(i)
            listRV.push({
                id: i,
                rating: 5,
                review: "",
                matp: item.matp
            })
        })
    }, [])
    const handleFinishRating = (value, i) => {
        listRV[i].rating = value;
        console.log(listRV)
    };
    const handlesubmit = async () => {
        setIsloading(true)
        try {
            console.log("add review")
            listRV.forEach(async (item) => {
                console.log(item.matp)
                const TPDocRef = doc(db, "THUCPHAM", item.matp.trim());
                const danhgiaCollectionRef = collection(TPDocRef, "danhgiasanpham");
                const docRef = await addDoc(danhgiaCollectionRef, {
                    luotthich: 0,
                    makh: user.uid,
                    ngaydg: moment(Date.now()).format("DD-MM-YYYY"),
                    noidung: item.review,
                    sosao: item.rating
                });
            })
            const khachhangDocRef = doc(db, "KHACHHANG", user.uid);
            const donhangDocRef = doc(khachhangDocRef, "DONHANG", idDonHang);
            const docRef1 = await updateDoc(donhangDocRef, {
                danhgia: true
            });
            setTimeout(() => {
                // setListAdd(result);

                setIsloading(false);
                navigation.navigate("Profile")
                Alert.alert("Thông báo!", "Lưu đánh giá thành công")
            }, 3000)

        } catch (error) {
            console.error(error)
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.btnBack}
                        onPress={() => { props.navigation.goBack() }}>
                        <Icon name="arrow-left" style={styles.iconBack} />
                    </TouchableOpacity>
                    <Text style={styles.header_login}>Đánh giá sản phẩm</Text>
                    <View></View>
                </View>
                {listItem.map((item, i) =>
                    <View style={styles.boxReview} key={i}>
                        <View style={styles.headerItem}>
                            <Text style={styles.txtheaderItem} numberOfLines={1}>{item.ten}</Text>
                        </View>
                        <Text style={styles.titleitem}>Đánh giá tổng thể</Text>
                        <AirbnbRating
                            count={5}
                            reviews={["Quá tệ", "Tệ", "Bình thường", "Khá tốt", "Quá tốt"]}
                            defaultRating={5}
                            size={25}
                            reviewSize={23}
                            onFinishRating={(value) => { handleFinishRating(value, i) }}
                        />
                        <Text style={styles.titleitem}>Nhận xét chi tiết</Text>
                        <TextInput style={styles.txtReview} onChangeText={(text) => { listRV[i].review = text; }}></TextInput>
                    </View>
                )}
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={() => { handlesubmit() }}>
                    <Text style={styles.txtButton}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>
            {isloading == true &&
                <View style={styles.boxLoading}>
                    <Lottie source={require('../src/Lottie/loading.json')} autoPlay loop />
                </View>}
        </SafeAreaView>
    )
}
export default ReviewPro;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 55,
        backgroundColor: Color.main,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    bottom: {
        backgroundColor: color.backgroundMain,
    },
    btnBack: {
        padding: 5
    },
    iconBack: {
        color: '#fff',
        fontSize: 20
    },
    header_login: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    lottie: {
        width: width,
        height: width,
        backgroundColor: 'red'
    },
    headerItem: {
        alignItems: 'center',
        borderBottomColor: color.backgroundDefault,
        borderBottomWidth: 2,
        paddingVertical: 3
    },
    txtheaderItem: {
        fontSize: 21,
        fontWeight: '500',
        color: Color.main,
        marginBottom: 5
    },
    boxReview: {
        marginVertical: 15,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    txt: {
        fontSize: 18,
        color: Color.placeHoder
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Color.main,
        marginVertical: 5,
        marginHorizontal: 50
    },
    txtButton: {
        fontSize: 20,
        color: Color.main,
        fontWeight: '500'
    },
    titleitem: {
        fontSize: 19,
        color: 'black',
        fontWeight: '500',
        marginVertical: 5
    },
    txtReview: {
        fontSize: 18,
        color: 'black',
        backgroundColor: color.backgroundDefault,
        borderRadius: 5,
        height: 80,
        borderColor: 'black',
        borderWidth: 1,
        textAlignVertical: 'top'
    },
    boxLoading: {
        height: height,
        width: width,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0.7)"
    }
})