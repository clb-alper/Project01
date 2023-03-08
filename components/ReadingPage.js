import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, ImageBackground, Dimensions, ListViewBase, Pressable, Modal, SectionList } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BoxShadow } from 'react-native-shadow';
import * as Speech from 'expo-speech';


const ReadingPage = ({ navigation }) => {

    const pageText = "Mehmet, ailesi ile gemide yolculuk yaparken aniden fırtına çıkıyor ve kendilerini bir adada buluyorlar. Mehmet, uyandıgında kendisini kumsal bir bölgenin üstünde buluyor. İlk olarak ailesini bulmaya başlayan Mehmet, ilk önce babasını görüyor ve daha sonra da annesini buluyor. Mehmet ve ailesi iyi durumda fakat ne gemiden, ne de gemideki diğer yolculardan bir iz var. Sanki herkes yok olmuş gibi."

    const speak = () => {
        //const thingToSay = 'Selma neden yaptın Selma. Kenan mı yaptırdı zorla Selma.';
        Speech.speak(pageText, { language: 'tr', pitch: 1.2 });
    };


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

    const shadowOpt = {
        height: 245,
        width: 345,
        color: "#000",
        border: 6,
        radius: 40,
        opacity: 0.1,
        x: 0,
        y: 5,
    }

    return (


        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />

            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}>
                    <View style={styles.center}>
                        <View style={styles.header}>
                            <Pressable
                                onPress={() => { navigation.goBack() }}>
                                <Image
                                    source={require('../assets/images/goBackArrow.png')}
                                    style={styles.goBackIcon}>
                                </Image>
                            </Pressable>
                            <Text style={[styles.headerText, {}]}>Macera Adası</Text>

                            <View style={styles.headerIconContainerStyle}>
                                <Image source={require('../assets/images/icontest.png')} style={styles.headerIconStyle}></Image>
                            </View>
                        </View>


                        <BoxShadow setting={shadowOpt}>
                            <Image
                                source={require('../assets/images/maceraada.jpg')}
                                style={styles.readingBookImage}>
                            </Image>
                        </BoxShadow>

                        <Text style={styles.mainText}>
                            {pageText}
                        </Text>

                        <TouchableOpacity
                            onPress={speak}
                            activeOpacity={0.8}>
                            <View style={styles.voiceOverButton}>
                                <Image source={require('../assets/images/soundIcon.png')}
                                    style={styles.voiceOverButtonImg} />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.pageNumberText}>
                            01/10
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ReadingPage;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: colors.blueLight,
    },

    readingBookImage: {
        borderRadius: 40,
        height: 250,
        width: 350,
    },

    center: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
    },

    mainText: {
        fontFamily: 'Comic-Regular',
        fontSize: 23,
        marginLeft: '7%',
        marginRight: '7%',
        marginTop: 30,
        textAlign: 'justify'
    },

    header: {
        marginTop: 10,
        flexDirection: 'row',
    },

    headerText: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        marginTop: 5,
        marginBottom: 30,
        marginRight: 35
    },

    goBackIcon: {
        resizeMode: 'contain',
        width: 35,
        height: 35,
        marginTop: 10,
        marginRight: 35,
        justifyContent: 'center',
    },

    headerIconContainerStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        borderRadius: 100,
        marginTop: 2,
        backgroundColor: colors.blueRegular,
        borderWidth: 4,
        borderColor: colors.bluePFPBG,

    },

    headerIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        tintColor: colors.blueLight

    },

    voiceOverButton: {
        borderRadius: 50,
        width: 80,
        height: 80,
        backgroundColor: colors.blueRegular,
        borderWidth: 4,
        borderColor: colors.blueTagBorder,
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center'
    },

    voiceOverButtonImg: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginLeft: -1

    },

    pageNumberText: {
        fontFamily: 'Comic-Light',
        fontSize: 18,
        marginBottom: 15
    }

})