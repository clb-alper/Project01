import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, TouchableHighlight, KeyboardAvoidingView, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import booksListData from '../assets/data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';

const MainScreen = ({ navigation }) => {

  var [isPress, setIsPress] = React.useState(false);

  const [fontsLoaded] = useFonts({
    'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
    'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
    'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
  });


  const shadowOpt = {
    width: 110,
    height: 183,
    color: "#000",
    border: 6,
    radius: 12,
    opacity: 0.2,
    x: -1.5,
    y: 7,
  }

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
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}>


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
                  1750
                </Text>

                <Image
                  source={require('../assets/images/iconStar.png')}
                  style={styles.pointsIconStyle}
                //tintColor='black'
                ></Image>

              </View>
            </View>
          </View>

          <View>
            <Text style={styles.continueReadingHeader}>Okumaya Devam Et</Text>
            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyle1}>
                  <TouchableOpacity
                    key={item.key}                  
                    onPress={() => console.log(item.id)}
                    activeOpacity={0.75}>
                    <BoxShadow setting={shadowOpt}>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.continueBookImageStyle}>
                      </ImageBackground>
                    </BoxShadow>

                    <Progress.Bar style={styles.progressBar} color = {item.itemColor} progress={0.5} width={112} />

                  </TouchableOpacity>
                </View>
              )}

              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            
           

          </View>
          
          <View>
            <Text style={styles.continueReadingHeader}>Popüler</Text>
            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyle1}>
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => console.log(item.id)}
                    activeOpacity={0.75}>
                    <BoxShadow setting={shadowOpt}>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.continueBookImageStyle}>
                      </ImageBackground>
                    </BoxShadow>
                  </TouchableOpacity>
                </View>
              )}

              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View>
            <Text style={styles.continueReadingHeader}>Favorileriniz</Text>
            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyle1}>
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => console.log(item.id)}
                    activeOpacity={0.75}>
                    <BoxShadow setting={shadowOpt}>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.continueBookImageStyle}>
                      </ImageBackground>
                    </BoxShadow>
                  </TouchableOpacity>
                </View>
              )}

              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
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
    marginTop: 17,

  },

  headerView2: {
    position: 'absolute',
    right: '-7%',
    marginHorizontal: 20,
    marginTop: 15,
  },

  headerIconStyle: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
  },

  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
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
    paddingLeft: 10,
  },

  pointsTextStyle: {
    fontFamily: 'Comic-Light',
    textAlign: 'center',
    fontSize: 21,
    width: 50,
  },

  pointsIconStyle: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    marginLeft: 1.5,
  },

  continueReadingHeader: {
    fontFamily: 'Comic-Regular',
    fontSize: 27,
    paddingLeft: 20,
    paddingTop: 20,
  },

  continueReadingBookStyle: {
    borderColor: 'black',
    width: 123,
    height: 200,
    marginTop: 10,
    marginRight: 15
  },

  continueReadingBookStyle1: {
    borderColor: 'black',
    width: 123,
    height: 210,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 25
  },

  continueBookImageStyle: {
    width: 113,
    height: 190,
    borderRadius: 12,
  },

  progressBar: {
    marginTop: 17,
    backgroundColor: colors.grayProgressBarBG,
    borderColor: colors.grayProgressBarBorder,
    borderWidth: 0.7,


  },


})