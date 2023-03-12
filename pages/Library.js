import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useRef } from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, ImageBackground, Dimensions, ListViewBase, Pressable, Modal, SectionList } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import booksListData from '../assets/data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import ModalDropdown from 'react-native-modal-dropdown';
import SelectDropdown from 'react-native-select-dropdown';
import * as Progress from 'react-native-progress';
import Header from '../assets/components/library/Header';
import AlphabetSlider from '../assets/components/library/AlphabetSlider';
import BookModal from '../assets/components/BookModal';
import BookShowcase from '../assets/components/library/BookShowcase';
import { ModalContext } from '../assets/contexts/ModalContext';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const Library = () => {

    const { modalVisible } = useContext(ModalContext);

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

        <View style={styles.libraryBG} onLayout={onLayoutRootView}>

            {modalVisible ? <StatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <StatusBar style="hidden" />}

            <SafeAreaView edges={['right', 'left', 'bottom']}>

                <Header />

                <AlphabetSlider />

                <ScrollView
                    overScrollMode={'never'}
                    showsVerticalScrollIndicator={false}
                    style={[styles.FlatsScrollViewStyle, { width: '100%' }, { flexWrap: 'wrap' }]}
                    horizontal={false} >

                    <BookModal />

                    <BookShowcase />

                </ScrollView>

            </SafeAreaView>
        </View>
    )
}

export default Library

const styles = StyleSheet.create({

    libraryBG: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: colors.blueLight,
    },

    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: -25
    },

    LibHeaderTxtStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 49,
    },

    bookContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },

    letterHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 65,
        paddingLeft: 20,
        paddingTop: 25
    },

    libContainer: {
        backgroundColor: colors.blueContainer,
        width: '100%',
        height: 125,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        zIndex: 50
    },

    libContainerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 50,
    },

    bookStyle: {
        flex: 1,
        flexGrow: 1,
        width: 100,
        height: 180,
        marginTop: 10,
        marginLeft: 10
    },

    bookStyleFirstItem: {
        flex: 1,
        flexGrow: 1,
        width: 100,
        height: 180,
        marginTop: 10,
        marginLeft: 10
    },

    bookCoverStyle: {
        width: 100,
        height: 170,
        borderRadius: 12,
    },

    item: {
        padding: 20,
        fontSize: 15,
        marginTop: 5,
    },

    item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },

    alphabetScrollStyle: {
        flex: 1,
        flexGrow: 1,
        borderTopRightRadius: 35,
        position: 'absolute',
        width: 45,
        height: heightOfScreen,
        marginTop: '15%',
        zIndex: -10
    },

    alphabetViewStyle: {
        backgroundColor: colors.blueContainer,
        borderTopRightRadius: 25,
        height: heightOfScreen * 1.70,
        borderWidth: 0.7,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        paddingTop: 55,
        zIndex: -10
    },

    alphabetLettersStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,

    },

    alphabetLettersStyle2: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        marginBottom: 15

    },

    alphabetLettersStyle3: {
        fontFamily: 'Comic-Regular',
        fontSize: 75,
        marginBottom: 15

    },

    FlatsViewStyle: {
        width: widthOfScreen - 50,
    },

    FlatsScrollViewStyle: {
        marginLeft: 50,
        height: heightOfScreen * 0.79,
    },

    DropdownViewStyle: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 30,
    },

    DropdownStyle: {
        backgroundColor: colors.blueTabBar,
        borderRadius: 25,
        height: 40,
        width: 125,
        borderWidth: 2,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    DropdownStyle2: {
        backgroundColor: colors.blueTabBar,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        width: 125,
        borderWidth: 2,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    DropdownTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 25,
        alignItems: 'center',
        alignContent: 'center',

    },

    DropdownContainerStyle: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: colors.blueBorder,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,

        width: 145,
        height: 120,
        marginRight: '-6.6%',
        marginTop: '-6.3%',
        backgroundColor: colors.blueTabBar,

    },

    DropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.blueTabBar,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

    },

    DropdownRowStyle: {
        width: 145,
        height: 40,
        marginLeft: -10,

    },



















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

    progressBar: {
        marginTop: 17,
        backgroundColor: colors.grayProgressBarBG,
        borderColor: colors.grayProgressBarBorder,
        borderWidth: 0.7,
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




})