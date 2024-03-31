import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainPage from "./screens/MainPage";
import SplashScreen from './screens/SplashScreen';
import RecipeDetails from './screens/RecipeDetails';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})  