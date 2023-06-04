import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultFlatlist from '../assets/components/home/DefaultFlatlist';
import FeaturedFlatlist from '../assets/components/home/FeaturedFlatlist';
import ContReadingFlatlist from '../assets/components/home/ContReadingFlatlist';
import NewBooksFlatlist from '../assets/components/home/NewBooksFlatlist';
import Header from '../assets/components/home/Header';
import BookModal from '../assets/components/BookModal';
import { ModalContext } from '../assets/contexts/ModalContext';
import FavoriteBooksFlastlist from '../assets/components/home/FavoriteBooksFlatlist';
import { ProfileContext } from '../assets/contexts/ProfileContext';
import RecommendedFlatList from '../assets/components/home/RecommendedFlatList';

const MainScreen = () => {

  const { modalVisible } = useContext(ModalContext);
  const { getProfileInfoData, getAccountInfoData, currentAccountInfo } = useContext(ProfileContext);

  useEffect(() => {
    getProfileInfoData()
    getAccountInfoData()
  }, [])

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

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>

      <BookModal />
      <StatusBar style="auto" />
      {/* {modalVisible ? <StatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <StatusBar style="auto" />} */}

      <SafeAreaView edges={['right', 'left', 'top']}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}>

          <Header />

          <View>

            <Text style={styles.continueReadingHeader}>Okumaya Devam Et</Text>

            <ContReadingFlatlist />

          </View>

          <View>

            <FeaturedFlatlist />

          </View>

          <View>

            <Text style={styles.otherBookHeader}>Yeni</Text>

            <NewBooksFlatlist />

          </View>

          <View>

            <Text style={styles.otherBookHeader}>Favorileriniz</Text>

            <FavoriteBooksFlastlist />

          </View>

          <View>

            <Text style={styles.otherBookHeader}>Size Önerilenler</Text>

            <RecommendedFlatList />

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

  otherBookHeader: {
    fontFamily: 'Comic-Regular',
    fontSize: 27,
    paddingLeft: 20,
    paddingTop: 10
  },

  continueReadingHeader: {
    fontFamily: 'Comic-Regular',
    fontSize: 27,
    paddingLeft: 20,
    paddingTop: 20
  },

})