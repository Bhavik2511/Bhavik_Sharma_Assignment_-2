import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Switch,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';


import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createStackNavigator();



function App(){
  
  return(
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    
  )
}
const styles= StyleSheet.create({}) 
export default App;