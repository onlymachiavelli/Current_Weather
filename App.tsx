import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import Information from './Info'
const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Home} name="Home"
          options={{
            title: "Home",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#323232",
            }
          }} />
        <Stack.Screen component={Information} name="Information" options={{
          title: "Information",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#323232",
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
