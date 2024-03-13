import {StyleSheet, Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import React, { useState } from 'react';
import Iicon from 'react-native-vector-icons/Ionicons'
import Container from './Container';

const NativeSettings = () => {
  const {width, height} = useWindowDimensions();
  const [activebtn, setactivebtn] = useState([])

  const onpressbtn = (type)=>{
        if(activebtn.includes(type)){
            let data = activebtn.filter((item)=> item != type)
            console.log(data)
            setactivebtn(data)
        }else{
            let data = [...activebtn, type];
            setactivebtn(data)
        }
  }

  return (

    <View style={[styles.container,{width: width, height: height}]}>
      <View style={styles.btnContainer}>

        <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn,{backgroundColor:activebtn.includes('cellular')?'#F3B95F':'#F8F8F8'}]} onPress={()=>onpressbtn('cellular')}
          >
            <Iicon name='cellular' size={35} color={activebtn.includes('cellular')?'white':'lightgrey'}/>
        </TouchableOpacity>
          <TouchableOpacity style={[styles.btn,{backgroundColor:activebtn.includes('wifi')?'#F3B95F':'#F8F8F8'}]} onPress={()=>onpressbtn('wifi')}>
            <Iicon name='wifi' size={35} color={activebtn.includes('wifi')?'white':'lightgrey'}/>
          </TouchableOpacity>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.btn,{backgroundColor:activebtn.includes('bluetooth')?'#F3B95F':'#F8F8F8'}]} onPress={()=>onpressbtn('bluetooth')}>
            <Iicon name='bluetooth' size={35} color={activebtn.includes('bluetooth')?'white':'lightgrey'}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn,{backgroundColor:activebtn.includes('flashlight')?'#F3B95F':'#F8F8F8'}]} onPress={()=>onpressbtn('flashlight')}>
            <Iicon name='flashlight' size={35} color={activebtn.includes('flashlight')?'white':'lightgrey'}/>
          </TouchableOpacity>
        </View>

      </View>
    <Text
        style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 25,
        }}>
       Settings
      </Text>
    </View>
            
  );
};

export default NativeSettings;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'center',
    rowGap:20,
    
    // backgroundColor:"red"
  },
  btnContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    rowGap: 10,
  },
  btnRow: {
    columnGap: 10,
    flexDirection: 'row',
    flex: 1,
  },
  btn: {
    flex: 1,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    alignItems:"center",
    justifyContent:"center"
  },
});
