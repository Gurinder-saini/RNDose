import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Calander from '../screen/Calander';
import Native_module from '../screen/Native_module';
import MetaBalls from '../screen/MetaBalls';
import CameraScreen from '../screen/Camera';

const Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
<Drawer.Navigator 
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerActiveBackgroundColor: 'white',
        // drawerActiveTintColor: '#6c5ce7',
        drawerActiveTintColor: '#7077A1',
        drawerInactiveTintColor: 'white',

        drawerItemStyle: {
          borderRadius: 13,
        },

        drawerLabelStyle: {
          fontSize: 16,
          // fontWeight: '700',
          fontFamily:'Poppins-Bold'

        },

        swipeEdgeWidth: 150,

        sceneContainerStyle: {
          backgroundColor: '#7077A1',
        },
        
        drawerStyle: {
          backgroundColor: '#7077A1',
          borderColor: '#7077A1',
          borderWidth: 1,
          width: '60%',
        },
      }}>

      <Drawer.Screen name="Calender" component={Calander} />
      <Drawer.Screen name="Native" component={Native_module} />
      <Drawer.Screen name="Metaballs" component={MetaBalls} />
      <Drawer.Screen name="Camera" component={CameraScreen} />
    </Drawer.Navigator>
  );
};

export default Drawer;
