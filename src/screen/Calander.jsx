import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../component/Container'
import { useCameraPermission } from 'react-native-vision-camera'

const Calander = () => {
  const {width,height} = useWindowDimensions()
  const {hasPermission,requestPermission} = useCameraPermission()
  useEffect(()=>{
    requestPermission()
  },[])

  return (
    <Container>
      <View style={{
        width,
        height,
        alignItems:"center",
        justifyContent:"center"
      }}>

      <Text style={{
        fontFamily:'Poppins-Bold',
        fontSize:30
        
      }}>calender</Text>
      </View>
    </Container>
  )
}

export default Calander

const styles = StyleSheet.create({})