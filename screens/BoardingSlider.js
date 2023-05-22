import  React,{useState,useRef, useEffect} from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, FlatList,TouchableOpacity } from 'react-native';
const {width, height} = Dimensions.get('screen');
import {auth, onAuthStateChanged } from '../firebase/firebase'

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#77C3F2', '#5CDEB6', '#F28DCF', '#A5BBFF'];//'#CBADF0'
const DATA = [
  {
    key: "3571572",
    title: "Mua sắm thông minh, tiện lợi và nhanh chóng",
    description: "Mua sắm thông minh với ứng dụng chợ trực tuyến. Tận hưởng trải nghiệm mua sắm đơn giản, tiện lợi và an toàn tại nhà",
    image: require('../src/images/fruit.gif')
  },
  {
    key: "3571747",
    title: "Tận hưởng sản phẩm chất lượng và đa dạng",
    description: "Với ứng dụng của chúng tôi, bạn có thể tìm kiếm và mua hàng ngàn sản phẩm chất lượng đa dạng",
    image: require('../src/images/quality.gif')
  },
  {
    key: "3571680",
    title: "Giao hàng mọi nơi, mọi lúc với thời gian ngắn nhất",
    description: "Đến với ứng dụng của chúng tôi, bạn sẽ được hưởng dịch vụ giao hàng nhanh chóng và đáng tin cậy. Chúng tôi cam kết giao hàng cho bạn với thời gian nhanh nhất có thể",
    image: require('../src/images/delivery.gif')
  },
  {
    key: "3571603",
    title: "Chào mừng bạn đến với ứng dụng đi chợ HDFood",
    description: "",
    image: require('../src/images/wellcome.gif')
  }
]

const Indicator=({scrollX})=>{
  return <View style={{position:'absolute', bottom:50,flexDirection:'row'}}>
    {DATA.map((_,i)=>{
      const inputRange=[(i-1)*width,i*width,(i+1)*width]
      const scale=scrollX.interpolate({
        inputRange,
        outputRange: [0.5,1.5,1],
        extrapolate:'clamp'
      })
      return <Animated.View 
      key={`indicator-${i}`}
      style={{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'white',
        marginHorizontal:7,
        transform:[
          {
            scale
          }
        ]
      }}></Animated.View>
    })}
  </View>
}

const Square=({scrollX})=>{
  const YOLO=Animated.modulo
  (Animated.divide(
    Animated.modulo(scrollX,width),
    new Animated.Value(width)),
    1);
  const rotate=YOLO.interpolate({
    inputRange:[0, .5, 1],
    outputRange:['35deg','-25deg','-60deg']
  })
  const translateX=YOLO.interpolate({
    inputRange:[0, .5, 1],
    outputRange:[0,-300,0]
  })
  return <Animated.View
    style={{
      width:height,
      height:height,
      backgroundColor:'#fff',
      position:'absolute',
      top:-height*0.65,
      left:-height*0.3,
      borderRadius:50,
      transform:[
        {
          rotate,
        },
        {
          translateX,
        }
      ]
  }}
    >
    </Animated.View>
}
const Backdrop=({scrollX})=>{
  const backgroundColor=scrollX.interpolate({
    inputRange:bgs.map((_,i)=>i*width),
    outputRange: bgs.map((bg)=>bg),
  })
  return(
    <Animated.View
    style={
      {
        ...StyleSheet.absoluteFillObject,
        backgroundColor,
        height:height,
        width:width,
        
      }
    }
    />);
};
export default function BoardingSlider(props) {
  const {navigation} = props
  const scrollX=React.useRef(new Animated.Value(0)).current;
  const handleSkip = () => {
    setSkipPressed(true);
    // Chuyển đến index cuối cùng
    const lastItemIndex = DATA.length - 1;
    flatListRef.current.scrollToIndex({ index: lastItemIndex, animated: true });
  };
  const flatListRef = useRef(null);
  const [skipPressed, setSkipPressed] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        navigation.navigate('UITab')

        // ...
      } else {
        console.log('log out')
      }
    });
  },[navigation])
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX}/>
      <Square scrollX={scrollX}/>
      <Animated.FlatList
      data={DATA}
      keyExtractor={(item)=>item.key}
      horizontal
      scrollEventThrottle={32}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      contentContainerStyle={{paddingBottom:100}}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      renderItem={({item,index})=>{
        return(
          <View style={{width,alignItems:'center',padding:10}}>
            <View style={{
              flex:0.77,
              paddingTop:50,}}>
            <Image source={source=item.image} style={{
              width:200,
              height:200,
              resizeMode:'contain',
              borderRadius:80,
              }}></Image>
            </View>
            <View style={{flex:0.25}}>
              <Text style={{fontSize:20,color:'black',fontWeight:'bold',alignSelf:'center',textAlign:'center'}}>{item.title}</Text>
              {index==3
              ?
              <View style={{flexDirection:'column-reverse'}}>
              <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("Login")}>
                <Text style={styles.txtBT}>Người dùng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.txtBT}>Quản trị viên</Text>
              </TouchableOpacity>
              </View>
              :
              <View>
              <Text style={{fontSize:16,color:'white',marginTop:10}}>{item.description}</Text>
              <TouchableOpacity style={[styles.button,{alignSelf:'flex-end',width:100,position:'absolute',top:90}]} onPress={handleSkip}>
    <Text style={styles.txtBT}>Bỏ qua</Text>
  </TouchableOpacity>
 
 
              </View>
              }
            </View>
          </View>
        )
      }}
      ref={flatListRef}
      >

      </Animated.FlatList>
      <Indicator scrollX={scrollX}></Indicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf:'center',
    marginTop:10,
    paddingVertical:10,
    width:220,
    borderRadius:10,
    backgroundColor:'white',
    alignItems:'center'
  },
  txtBT: {
    fontSize:20,
    color:'#6D7CA8',
    fontWeight:'bold'
  },
});