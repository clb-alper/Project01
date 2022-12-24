import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, TouchableHighlight, KeyboardAvoidingView, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import booksListData from '../assets/data/booksListData';

const MainScreen = ({ navigation }) => {

  var [isPress, setIsPress] = React.useState(false);

  const [fontsLoaded] = useFonts({
    'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
    'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
    'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  var touchPropsLoginButton = {
    activeOpacity: 1,
    underlayColor: '#ffe0e7',
    style: isPress ? styles.loginButtonPressed : styles.loginButton,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => navigation.navigate('Login')

  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <ScrollView>
        <SafeAreaView>
          <View style={styles.headerView1}>

            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle}></Image>
            <Text
              style={styles.headerTextStyle}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              Hoşgeldin Ömer
            </Text>

            <View style={styles.headerView2}>
              <View style={styles.pointsContainer}>
                <Text
                  style={styles.pointsTextStyle}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}>
                  1000
                </Text>

                <Image
                  source={require('../assets/images/iconPoints.png')}
                  style={styles.pointsIconStyle}
                  tintColor='black'
                ></Image>

              </View>
            </View>

          </View>
          <View>
            <Text style={styles.continueReadingHeader}>Okumaya Devam Et</Text>
            <FlatList
              style={styles.continueReadingFLStyle}       
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <TouchableHighlight
                  key={item.key}
                  onPress={() => this._onPress(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>

                  <View style={styles.continueReadingBookStyle}>
                    <TouchableOpacity>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.continueBookImageStyle}>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentInset={{ right: 20, top: 0, left: 0, bottom: 0 }}
            />

          </View>
          <TouchableHighlight {...touchPropsLoginButton} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{"Giriş Yap"}</Text>
          </TouchableHighlight>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.yellowLight
  },

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

  headerView1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },

  headerView2: {
    position: 'absolute',
    right: '-4.5%',
    marginHorizontal: 20,
    marginTop: 15,
  },

  headerIconStyle: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
  },

  headerTextStyle: {
    fontFamily: 'Comic-Regular',
    marginLeft: '2.5%',
    fontSize: 28,
    width: 200,
  },

  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width: 95,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.yellowBorder,
    backgroundColor: colors.yellowTabBar,
    paddingTop: 1.5,
    paddingLeft: 10,
  },

  pointsTextStyle: {
    fontFamily: 'Comic-Light',
    fontSize: 21,
    width: 50,
  },

  pointsIconStyle: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    marginLeft: 3,
  },

  continueReadingHeader: {
    fontFamily: 'Comic-Regular',
    fontSize: 27,
    paddingTop: 20,
    paddingLeft: 20
  },

  continueReadingBookStyle: {
    width: 113,
    height: 200,
    marginRight: 15,
    marginTop: 10,
    paddingLeft: 20
  },

  continueBookImageStyle: {
    width: 113,
    height: 180,
    borderRadius: 20,
  },

  continueReadingFLStyle: {
    marginRight: 20,
  },

})