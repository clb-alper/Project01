import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';

const MainScreen = ({ navigation }) => {

  var [isPress, setIsPress] = React.useState(false);

  var touchPropsLoginButton = {
    activeOpacity: 1,
    underlayColor: '#ffe0e7',
    style: isPress ? styles.loginButtonPressed : styles.loginButton,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    //onPress: () => console.log("Giriş Yapıldı")
    onPress: () => navigation.navigate('Login')

  };
  return (
    <View>
      <Text>MainScreen</Text>

      <TouchableHighlight {...touchPropsLoginButton} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{"Giriş Yap"}</Text>
      </TouchableHighlight>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  loginButton: {
    alignItems: 'center',
    width: '85%',
    padding: 12,
    backgroundColor: colors.pinkRegular,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.pinkBorder
  },

  loginButtonText: {
    fontFamily: 'Comic-Light',
    textAlign: 'center',
    fontSize: 23,
  },

})