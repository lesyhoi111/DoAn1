import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../src/Color';
const DetailStore = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btnBack} 
                    onPress={()=>{props.navigation.goBack()}}>
                    <Icon name="arrow-left" style={styles.iconBack} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết Shop</Text>
                <View></View>
            </View>

            <View style={styles.store}>
                <View style={styles.row}>
                    <Image
                        style={styles.imgStore}
                        source={{ uri: 'https://png.pngtree.com/template/20191125/ourmid/pngtree-book-store-logo-template-sale-learning-logo-designs-vector-image_335046.jpg' }}
                    ></Image>
                    <View>
                        <Text style={styles.txtName}>Duc VN Official</Text>
                        <Text style={styles.txtStatus}>Online 7 phút trước</Text>
                        <Text style={styles.txtFollowing}>Người theo dõi 2,2k</Text>
                    </View>
                </View>

            </View>
            <View style={{marginVertical:12}}>
            <View style={styles.itemRow}>
                <View style={styles.row}>
                <Icon name="star" style={styles.icon} />
                <Text style={styles.txtDes}>Đánh giá</Text>
                </View>
                <Text style={styles.txtValue}>4.9/5 (13k lượt đánh giá)</Text>
            </View>

            <View style={styles.itemRow}>
                <View style={styles.row}>
                <Icon name="rocketchat" style={styles.icon} />
                <Text style={styles.txtDes}>Tỉ lệ phản hồi</Text>
                </View>
                <Text style={styles.txtValue}>100%</Text>
            </View>

            <View style={styles.itemRow}>
                <View style={styles.row}>
                <Icon name="store" style={styles.icon} />
                <Text style={styles.txtDes}>Sản phẩm</Text>
                </View>
                <Text style={styles.txtValue}>38</Text>
            </View>

            <View style={styles.itemRow}>
                <View style={styles.row}>
                <Icon name="user" style={styles.icon} />
                <Text style={styles.txtDes}>Đã tham gia</Text>
                </View>
                <Text style={styles.txtValue}>2 năm</Text>
            </View>
            </View>
           

            <View style={styles.itemRow1}>
                <View style={styles.row}>
                <Icon name="link" style={styles.icon} />
                <Text style={styles.txtDes}>Link của shop: </Text>
                </View>
                <Text style={styles.txtValue}>https://www.facebook.com/</Text>
            </View>
            <View style={styles.itemRow1}>
                <View style={styles.row}>
                <Icon name="user-check" style={styles.icon} />
                <Text style={styles.txtDes}>Tài khoản đã được xác minh: </Text>
                </View>
                <Icon name="mobile" style={{color:'green',fontSize:15,marginHorizontal:2}} />
                <Icon name="envelope" style={{color:'orange',fontSize:15,marginHorizontal:2}} />
                <Icon name="facebook" style={{color:'blue',fontSize:15,marginHorizontal:2}} />
            </View>
            <TouchableOpacity style={styles.btnViewAllProduct} onPress={()=>{props.navigation.goBack()}}>
                <Text style={styles.btnText}>Xem tất cả sản phẩm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#EEEEEE'
    },
    header: {
        height: 55,
        backgroundColor: color.backgroundMain,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    btnText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold'
    },
    btnBack: {
        padding: 15
    },
    iconBack: {
        color: '#FFF',
        fontSize: 18
    },
    store: {
        backgroundColor: '#fff',
        height: 100,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginTop: 4,
    },

    imgStore: {
        width: 90,
        height: 90,
        borderRadius: 5,
        marginRight: 15
    },
    txtName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    txtStatus: {
        fontSize: 14,
        color: '#333'
    },
    txtFollowing: {
        fontSize: 16,
        color: '#333'
    },
    itemRow:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'space-between', 
        paddingHorizontal:10, 
        backgroundColor:'#fff', 
        paddingVertical:10,borderWidth:1, 
        borderColor:'#DDDDDD'
    },
    itemRow1:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal:10, 
        backgroundColor:'#fff', 
        paddingVertical:10,borderWidth:1, 
        borderColor:'#DDDDDD'
    },
    row:{
        flexDirection: 'row',
         alignItems: 'center'
    },
    icon:{
        paddingHorizontal:10,
        color:'#333'
    },
    txtDes:{
        color:'#333',
        fontSize:16
    },
    txtValue:{
        fontSize:16,
        color:color.backgroundMain,
        paddingRight:10
    },
    btnViewAllProduct:{
        backgroundColor:color.backgroundMain,
        padding:10,
        marginHorizontal:10,
        borderRadius:5,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    }

});

export default DetailStore;