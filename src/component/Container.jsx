import {StatusBar, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import {useDrawerProgress, useDrawerStatus} from '@react-navigation/drawer';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const Container = ({children}) => {
  const progress = useDrawerProgress();
  const status = useDrawerStatus();
  const {width, height} = useWindowDimensions();


  const animatedstyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp')},
        {perspective: 1100},
        {
          rotateY: `${interpolate(progress.value, [0, 1], [0, -25])}deg`,
        },
        {
          translateX: interpolate(progress.value, [0, 1], [0, -50]),
        },
      ],
      // paddingHorizontal: interpolate(progress.value, [0, 1], [0, 20], 'clamp'),
      // borderRadius:interpolate(progress.value,[0,1],[0,20]),
      borderRadius: 20,
      overflow: 'hidden',
    };
  });

  // const statusbarstyle = interpolate(progress.value, [0, 1], ['dark-content', 'light-content'])

  const statusBarStyle = status == 'closed' ? 'dark-content' : 'light-content';
//   console.log(progress.value);

  return (
    <Animated.View style={[styles.container, animatedstyle]}>
      <StatusBar animated barStyle={statusBarStyle} />
        {children}
    </Animated.View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
