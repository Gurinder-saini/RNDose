import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const Slider = props => {
  const {icon, color, title} = props;
  const [status, setstatus] = useState('');

  const {width, height} = useWindowDimensions();

  const barprogress = useSharedValue(0);
  const context = useSharedValue(0);

  const animatedbarstyle = useAnimatedStyle(() => {
    return {
      height: barprogress.value,
    };
  });

  const panGesture = Gesture.Pan()

    .onStart(() => {
      if (barprogress.value <= 0) {
        context.value = 0;
      } else {
        context.value = barprogress.value;
      }
    })
    .onChange(event => {
      if (barprogress.value <= 200 || event.translationY > 0) {
        barprogress.value = context.value + event.translationY * -1;
      }
    });

  useDerivedValue(() => {
    const value =
      barprogress.value <= 0
        ? 0
        : barprogress.value >= 200
        ? 200
        : parseInt(barprogress.value);
    console.log(Math.floor((value / 200) * 100));
    let finalresult = Math.floor((value / 200) * 100);

    return runOnJS(setstatus)(`${finalresult}%`);
  });

  return (
    <View
      style={{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 10,
      }}>
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 25,
        }}>
        {status}
      </Text>
      {/* <GestureHandlerRootView
          style={{
            flex: 1,
          }}> */}

      <GestureDetector gesture={panGesture}>
        <View style={styles.BrightnessbarConatiner}>
          <Animated.View style={[styles.bar, animatedbarstyle]}>
            <LinearGradient
              colors={[color, 'white']}
              style={[styles.linearGradient]}></LinearGradient>
          </Animated.View>
        </View>
      </GestureDetector>
      {/* </GestureHandlerRootView> */}
      <MIcon name={icon} size={30} color={status == '0%' ? 'grey' : color} />
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 25,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  BrightnessbarConatiner: {
    width: 60,
    height: 200,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 10,
  },
  bar: {
    borderRadius: 12,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
});
