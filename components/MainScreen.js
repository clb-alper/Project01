import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList, Dimensions, Pressable, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import booksListData from '../assets/data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const MainScreen = ({ navigation }) => {

  var [isPress, setIsPress] = React.useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalEntry, setModalEntry] = useState(booksListData);

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
      <SafeAreaView edges={['right', 'left', 'top']}>

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
                  style={styles.pointsIconStyle}>
                </Image>

              </View>
            </View>
          </View>

          <View>
            <Text style={styles.continueReadingHeader}>Okumaya Devam Et</Text>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalViewDarkenStyle}>
              </View>

              <View style={styles.modalViewStyle}>
                <Image source={modalEntry.image} style={styles.modalBookImageStyle} />
                <View style={styles.modalBookDetailHeader}>
                  <Text
                    style={styles.modalText}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}>{modalEntry.title}</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    activeOpacity={0.75}>
                    <Image
                      source={require('../assets/images/closeIcon.png')}
                      style={styles.modalBookDetailHeaderClose}
                    />
                  </TouchableOpacity>
                </View>

                <Progress.Bar style={styles.modalProgressBar} borderRadius={15} progress={modalEntry.bookProgress} height={12} width={250} color={modalEntry.itemColor} />

                <View style={styles.modalTagContainer}>
                  <View style={styles.ageTagStyle}>
                    <Text
                      style={styles.tagTextStyle}
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}>{modalEntry.ageTag}</Text>
                  </View>
                  <View style={styles.contentTagStyle}>
                    <Text
                      style={styles.tagTextStyle}
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}>{modalEntry.contentTag}</Text>
                  </View>
                  <View style={styles.themeTagStyle}>
                    <Text
                      style={styles.tagTextStyle}
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}>{modalEntry.themeTag}</Text>
                  </View>
                  <View style={styles.rewardTagStyle}>

                    <Text
                      style={styles.tagTextStyle}>
                      {modalEntry.rewardTag}
                    </Text>

                    <Image
                      source={require('../assets/images/iconStar.png')}
                      style={styles.rewardTagPointsIconStyle}>
                    </Image>

                  </View>
                </View>

                <View style={styles.modalBookDescView}>
                  <Text
                    style={styles.modalBookDesc}
                    adjustsFontSizeToFit={true}
                    numberOfLines={6}>{modalEntry.itemDesc}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {navigation.navigate('ReadingPage'); setModalVisible(false)}}
                  activeOpacity={0.8}>
                  <View style={styles.modalBookStartButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>

                    <Image source={require('../assets/images/startIcon.png')} tintColor={modalEntry.itemBorder} style={styles.badgeIconStyle} />
                  </View>
                </TouchableOpacity>

              </View>
            </Modal>

            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyleFirstItem}>
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => { setModalVisible(true); setModalEntry(item); }}
                    activeOpacity={0.75}>

                    <BoxShadow setting={shadowOpt}>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.continueBookImageStyle}>
                      </ImageBackground>
                    </BoxShadow>

                    <Progress.Bar style={styles.progressBar} color={item.itemColor} progress={item.bookProgress} width={112} />

                  </TouchableOpacity>

                </View>
              )}

              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />

          </View>

          <View>
            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={{ marginTop: 10 }}>

                  <ImageBackground
                    source={item.image}
                    imageStyle={styles.featuredBookBG}
                    blurRadius={0.8}>
                  </ImageBackground>

                  <Text style={[styles.featuredBookTitle, { color: item.itemTextColor }]}>Öne Çıkan</Text>

                  <Text
                    style={[styles.featuredBookDescription, { color: item.itemTextColor }]}
                    adjustsFontSizeToFit={false}
                    numberOfLines={8}>
                    {item.itemDesc}
                  </Text>

                  <View borderColor={item.itemBorder} backgroundColor={item.itemColorBG} style={index != 0 ? styles.featuredBookStyle : styles.featuredBookStyleFirstItem}>

                    <TouchableOpacity
                      key={item.key}
                      onPress={() => { setModalVisible(true); setModalEntry(item); }}
                      activeOpacity={0.75}>
                      <BoxShadow setting={shadowOpt}>
                        <ImageBackground
                          source={item.image}
                          imageStyle={styles.continueBookImageStyle}>
                        </ImageBackground>
                      </BoxShadow>
                    </TouchableOpacity>

                  </View>
                </View>
              )}

              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View>
            <Text style={styles.otherBookHeader}>Yeni</Text>
            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={index != 0 ? styles.otherBookStyle : styles.otherBookStyleFirstItem}>
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => { setModalVisible(true); setModalEntry(item); }}
                    activeOpacity={0.75}>
                    <BoxShadow setting={shadowOpt}>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.otherBookImageStyle}>
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
            <Text style={styles.otherBookHeader}>Favorileriniz</Text>
            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={index != 0 ? styles.otherBookStyle : styles.otherBookStyleFirstItem}>
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => { setModalVisible(true); setModalEntry(item); }}
                    activeOpacity={0.75}>
                    <BoxShadow setting={shadowOpt}>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.otherBookImageStyle}>
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
            <Text style={styles.otherBookHeader}>Size Önerilenler</Text>
            <FlatList
              overScrollMode={'never'}
              data={booksListData}
              renderItem={({ item, index, separators }) => (
                <View style={index != 0 ? styles.otherBookStyle : styles.otherBookStyleFirstItem}>
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => { setModalVisible(true); setModalEntry(item); }}
                    activeOpacity={0.75}>
                    <BoxShadow setting={shadowOpt}>
                      <ImageBackground
                        source={item.image}
                        imageStyle={styles.otherBookImageStyle}>
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

  modalViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '80%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: colors.white,
  },

  modalViewDarkenStyle: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthOfScreen,
    height: heightOfScreen * 1.1,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },

  modalBookImageStyle: {
    width: widthOfScreen + 5,
    height: 230,
    top: -130,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35, 
  },

  modalBookDetailHeader: {
    top: -125,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalText: {
    fontFamily: 'Comic-Regular',
    fontSize: 35,
    width: 300,
    left: -20,
  },

  modalBookDetailHeaderClose: {
    resizeMode: 'contain',
    height: 45,
    width: 45,
    left: 25,
    top: -2,
  },

  modalProgressBar: {
    backgroundColor: colors.grayProgressBarBG,
    borderColor: colors.grayProgressBarBorder,
    borderWidth: 0.7,
    top: -120,
    left: -65,
  },

  modalTagContainer: {
    top: -100,
    left: 5,
    flexDirection: 'row',

  },

  ageTagStyle: {
    backgroundColor: colors.pinkTagBG,
    borderColor: colors.pinkTagBorder,
    alignItems: 'center',
    borderWidth: 3,
    marginRight: 7,
    width: 80,
    padding: 8,
    borderRadius: 50,

  },

  contentTagStyle: {
    backgroundColor: colors.blueTagBG,
    borderColor: colors.blueTagBorder,
    alignItems: 'center',
    borderWidth: 3,
    marginRight: 7,
    width: 70,
    padding: 8,
    borderRadius: 50,

  },

  themeTagStyle: {
    backgroundColor: colors.greenTagBG,
    borderColor: colors.greenTagBorder,
    alignItems: 'center',
    borderWidth: 3,
    marginRight: 7,
    width: 70,
    padding: 8,
    borderRadius: 50,
  },

  rewardTagStyle: {
    flexDirection: 'row',
    backgroundColor: colors.purpleTagBG,
    borderColor: colors.purpleTagBorder,
    alignItems: 'center',
    borderWidth: 3,
    marginRight: 7,
    width: 145,
    padding: 5,
    borderRadius: 50,
  },

  rewardTagPointsIconStyle: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    marginLeft: 1.5,
  },

  tagTextStyle: {
    fontFamily: 'Comic-Regular',
  },

  modalBookDescView: {
    width: widthOfScreen,
    top: -75,
    left: 15,
  },

  modalBookDesc: {
    fontFamily: 'Comic-Regular',
    width: widthOfScreen - 30,
    fontSize: 17,
  },

  modalBookStartButton: {
    width: 90,
    height: 90,
    alignItems: 'center',
    paddingLeft: 10,
    borderWidth: 4,
    borderRadius: 100,
    top: -40,
  },


  badgeIconStyle: {
    resizeMode: 'contain',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
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
    paddingTop: 20
  },

  otherBookHeader: {
    fontFamily: 'Comic-Regular',
    fontSize: 27,
    paddingLeft: 20,
    paddingTop: 10
  },

  continueReadingBookStyle: {
    width: 123,
    height: 200,
    marginTop: 10,
    marginRight: 15,
    marginBottom: 15
  },

  continueReadingBookStyleFirstItem: {
    width: 123,
    height: 210,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 25
  },

  otherBookStyle: {
    width: 123,
    height: 200,
    marginTop: 10,
    marginRight: 15
  },

  otherBookStyleFirstItem: {
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

  otherBookImageStyle: {
    width: 113,
    height: 190,
    borderRadius: 12,
  },

  featuredBookBG: {
    width: widthOfScreen,
    height: 210,
    borderRadius: 12,
    marginTop: 10
  },

  progressBar: {
    marginTop: 17,
    backgroundColor: colors.grayProgressBarBG,
    borderColor: colors.grayProgressBarBorder,
    borderWidth: 0.7,
  },

  featuredBookStyle: {
    borderWidth: 4,
    alignItems: 'flex-end',
    width: widthOfScreen,
    height: 210,
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 18,
    paddingTop: 6.5
  },

  featuredBookStyleFirstItem: {
    borderWidth: 4,
    alignItems: 'flex-end',
    width: widthOfScreen,
    height: 210,
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 18,
    paddingTop: 6.5
  },

  featuredBookTitle: {
    fontFamily: 'Comic-Bold',
    textAlign: 'center',
    zIndex: 1000,
    position: 'absolute',
    fontSize: 35,
    paddingTop: 25,
    paddingLeft: 20
  },

  featuredBookDescription: {
    fontFamily: 'Comic-Bold',
    zIndex: 1000,
    position: 'absolute',
    fontSize: 14,
    width: '63.5%',
    paddingTop: '28%',
    paddingLeft: 20
  },

})