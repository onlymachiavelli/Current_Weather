import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import Information from './Info'
const Stack = createNativeStackNavigator()
const App = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator component={Home} />
      <Stack.Navigator component={Information} />
    </NavigationContainer>
  )
}

export default App
