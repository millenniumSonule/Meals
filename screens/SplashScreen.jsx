import { Button, Image, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native

const SplashScreen = () => {

  const navigation = useNavigation();
  const handleButtonPress = () => {
    // Navigate to the new screen when the button is pressed
    navigation.navigate("MainPage");
  };


  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'linear-gradient(to bottom, rgba(255, 76, 0, 1), rgba(253, 127, 74, 1))' }}>
      <Animatable.View animation="tada" duration={3000} style={{ height: 300, width: 300, backgroundColor: 'rgba(253, 127, 74, 0.5)', borderRadius: 1000, justifyContent: 'center', alignItems: 'center' }}>
        <Animatable.View animation="tada" duration={6000} View style={{ height: 250, width: 250, backgroundColor: 'rgba(253, 127, 74, 1)', borderRadius: 1000, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/first.png')}
            style={{ height: 200, width: 200, }}
          />
        </Animatable.View>
      </Animatable.View>



      <Text style={{ color: 'white', fontSize: 50, marginTop:20 }}>Enjoy</Text>
      <Text style={{ color: 'white', fontSize: 50 }}>Your Food</Text>

      <TouchableOpacity
        onPress={handleButtonPress}
        style={{ backgroundColor: 'white', padding: 20, borderRadius: 100, width: 200, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}
      >
        <Text style={{ color: '#FF4D00', fontWeight: 'bold', fontSize: 18 }}>Getting Started</Text>

      </TouchableOpacity>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})
