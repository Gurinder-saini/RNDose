import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../component/Container';
import Slider from '../component/Slider';
import NativeSettings from '../component/NativeSettings';

const Native_module = () => {
  const {width, height} = useWindowDimensions();

  const [activeindex, setActiveIndex] = useState(0)

  const onScroll = (e)=>{
    let offsetY = e.nativeEvent.contentOffset.x
    let offsetIndex = (offsetY/width).toFixed(0)
    setActiveIndex(offsetIndex)
  }

  const screenData = [
    {
      id:'0',
        title :"Brightness",
        icon :'sunny',
        color: 'orange'
        
    },
    {
      id:'1',
        title :"Volume",
        icon : 'volume-up',
        color: '#8CB9BD'
    },
    {
      id:'2',
        title :"Settings",
        icon : 'volume-up',
        color: '#8CB9BD'
    }
  ]

  return (
    <Container>
      {/* <GestureHandlerRootView style={{flex: 1}}> */}
        <FlatList
          data={screenData}
          horizontal
          keyExtractor={({id},_)=>id}
          pagingEnabled={true}
          onScroll={onScroll}
          renderItem={({item,index})=>index != 2?< Slider {...item}/> : <NativeSettings/>}
        />
        <View style={{
            position:"absolute",
            bottom: height * 0.05,
            right:0,
            left:0,
            flexDirection:"row",
            // backgroundColor:'yellow',
            // alignItems:"center",
            justifyContent:'center',
            columnGap:5
            // top:0,
        }}>
            {
                Array(3).fill('0').map((item,index)=>{
                    return <View style={{
                        width:activeindex == index ? 25:10,
                        height:10,
                        borderRadius:10,
                        backgroundColor:activeindex == index ?"#7077A1" : 'lightgrey',
                        // alignSelf:"center"
                        
    
                    }}></View>
                })
            }
                

            </View>

      {/* </GestureHandlerRootView> */}
    </Container>
  );
};

export default Native_module;

const styles = StyleSheet.create({});
