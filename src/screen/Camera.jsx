import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Container from '../component/Container';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Canvas, Circle, Rect} from '@shopify/react-native-skia';
const CameraScreen = () => {
  const camRef = useRef();

  const {width, height} = Dimensions.get('screen');
  const pd = PixelRatio.get();
  const device = useCameraDevice('back');

  const scannerViewHeight = useSharedValue(0);
  const scannerViewWidth = useSharedValue(0);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  useEffect(() => {
    console.log(height, width);
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],

    onCodeScanned: (codes, frame) => {
      console.log(frame);
      console.log(JSON.stringify(codes));
      let hh = height / frame.height;
      let hw = width / frame.width;
      scannerViewHeight.value = codes[0].frame.height;
      scannerViewWidth.value = codes[0].frame.width;
      positionY.value = codes[0].corners[1].y * hh;
      positionX.value = codes[0].corners[1].x * hw;
    },
  });

  const viewport = useAnimatedStyle(() => {
    return {
      width: scannerViewWidth.value,
      height: scannerViewHeight.value,
      left: positionX.value,
      // left:10,

      top: positionY.value,
    };
  });
  return (
    <Container>
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />
      <View
        style={{
          width,
          height,
        }}>
        <Camera
          style={{
            position: 'absolute',
            height,
            width,
            zIndex: -1,
          }}
          ref={camRef}
          device={device}
          isActive={true}
          enableZoomGesture
          codeScanner={codeScanner}
          exposure={-60}
          pixelFormat="native"
        />
        <Canvas
          style={{
            flex: 1,
          }}>
          <Circle cx={positionX} cy={positionY} r={10} color={'red'} />
        </Canvas>
      </View>
      {/* <View
        style={[
          {
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            // backgroundColor:"red"
          },
        ]}>
        <Animated.View
          style={[
            {
              borderWidth: 2,
              borderColor: 'red',
            },
            viewport,
          ]}></Animated.View>
      </View> */}
    </Container>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
