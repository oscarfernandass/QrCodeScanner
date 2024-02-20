import { View, Text,TouchableOpacity,Image, } from 'react-native'
import React from 'react'
import Home from './Home';
import History from './History';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import qrIcon from './qrIcon.png';
import log from './log.png';
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
       <Tab.Navigator>
       <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? qrIcon : qrIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
            >
              <Image source={qrIcon} style={{ width: 37, height: 37 }} />
            </TouchableOpacity>
          )
        }}
         />

<Tab.Screen
         name='History'
         component={History}
         options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? log : log}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
            >
              <Image source={log} style={{ width: 37, height: 37 }} />
            </TouchableOpacity>
          )
        }}
         />
       </Tab.Navigator>
    </NavigationContainer>

  )
}

export default App