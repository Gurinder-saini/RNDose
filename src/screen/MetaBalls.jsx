import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, { useMemo } from 'react';
import Container from '../component/Container';
import {Blur, Canvas, Circle, ColorMatrix, Group, Paint, SweepGradient, vec} from '@shopify/react-native-skia';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const MetaBalls = () => {
  const {width, height} = useWindowDimensions();
  const CircleX = useSharedValue(width / 2);
  const CircleY = useSharedValue(height / 2);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const gesturPan = Gesture.Pan()
    .onBegin(() => {
      contextX.value = CircleX.value;
      contextY.value = CircleY.value;
    })
    .onChange(e => {
      CircleX.value = e.translationX + contextX.value;
      CircleY.value = e.translationY + contextY.value;
    })
    .onEnd(() => {
      CircleX.value = withSpring(width / 2,{stiffness:100});
      // CircleX.value = withTiming(width / 2);
      CircleY.value = withSpring(height / 2,{stiffness:100});
      // CircleY.value = withTiming(height / 2);
    });

  const transform = useDerivedValue(() => {
    return [{translateX: CircleX.value}, {translateY: CircleY.value}];
  });

  const layer = useMemo(()=>{
    return <Paint>
      <Blur blur={30}/>
      <ColorMatrix
      
      matrix={[
        1,0,0,0,0,
        0,1,0,0,0,
        0,0,1,0,0,
        0,0,0,60,-30,
      ]}/>
    </Paint>
  },[])

  return (
    <Container>
      <View
        style={{
          width,
          height,
        }}>
        <GestureDetector gesture={gesturPan}>
          <Canvas
            style={{
              flex: 1,
            }}>
              <Group
              layer={layer}>

            <Circle cx={width / 2} cy={height / 2} r={80} color={'#365486'}/>
            <Circle r={80} transform={transform} color={'#365486'} />
            {/* <SweepGradient c={vec(0,0)} colors={['cyan','magenta','cyan']}/> */}
              </Group>
          </Canvas>
        </GestureDetector>
      </View>
    </Container>
  );
};

export default MetaBalls;

const styles = StyleSheet.create({});
