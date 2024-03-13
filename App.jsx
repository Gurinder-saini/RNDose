import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Drawer from './src/navigation/Drawer';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar backgroundColor={'transparent'} translucent />
        <Drawer />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
