import React, { useContext, useEffect } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../assets/components/rewards/Header';
import { ModalContext } from '../assets/contexts/ModalContext';
import StickerModal from '../assets/components/rewards/StickerModal';
import MainContainer from '../assets/components/rewards/MainContainer';
import FocusAwareStatusBar from '../assets/components/FocusAwareStatusBar';
import { RewardsContext } from '../assets/contexts/RewardsContext';
import { auth, firebase } from '../firebase'
import { ProfileContext } from '../assets/contexts/ProfileContext';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const BackpackScreen = () => {

    const { userOwnedStickerList, setUserOwnedStickerList, stickerList, setStickerList } = useContext(RewardsContext)
    const { currentProfileSelected } = useContext(ProfileContext);


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

            <FocusAwareStatusBar style="auto" />
            {/* {stickerModalVisible ? <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <FocusAwareStatusBar style="hidden" />} */}

            <SafeAreaView edges={['right', 'left']}>

                <Header />

            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                style={{ zIndex: 0 }}>

                <View style={[styles.headerView12, { marginTop: 40 }]}>

                    <View style={styles.stickerContainer}>
                        {typeof (userOwnedStickerList) === 'undefined' ? null :
                            userOwnedStickerList.map((sticker) => {
                                return (
                                    <View key={sticker.id}>
                                        <View style={styles.continueReadingBookStyleFirstItem}>

                                            <ImageBackground
                                                source={{ uri: sticker.iconImage }}
                                                imageStyle={styles.continueBookImageStyle}>
                                            </ImageBackground>


                                        </View>

                                    </View>
                                )

                            })
                        }

                    </View>





                </View>
            </ScrollView >

        </View >
    )
}

export default BackpackScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.purpleLight,
    },

    backpackButton: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 500,
        backgroundColor: colors.purpleRegular,
        marginRight: 20,
        position: 'absolute',
        top: heightOfScreen * 0.83,
        left: widthOfScreen * 0.78,
        zIndex: 500
    },

    continueBookImageStyle: {
        width: 75,
        height: 75,
        borderRadius: 12,
    },

    continueReadingBookStyleFirstItem: {
        width: 45,
        height: 140,
        marginRight: 43,
    },

    headerView12: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        marginLeft: 35,
    },

    headerTextStyle2: {
        fontFamily: 'Comic-Regular',
        fontSize: 30,
        marginBottom: 15,
    },

    stickerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
        width: '100%',
    },

    continueReadingBookStyleFirstItem: {
        width: 45,
        height: 140,
        marginRight: 43,
    },

    defaultPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleRegular,
    },

    rainbowPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.black,
    },

    bronzePointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.bronzeBadgeBorder,
        backgroundColor: colors.bronzeBadge,
    },

    silverPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.silverBadgeBorder,
        backgroundColor: colors.silverBadge,
    },

    goldPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.goldBadgeBorder,
        backgroundColor: colors.goldBadge,
    },

    emeraldPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.emeraldBadgeBorder,
        backgroundColor: colors.emeraldBadge,
    },

    diamondPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.diamondBadgeBorder,
        backgroundColor: colors.diamondBadge,
    },

    pointsTextStyle2: {
        fontFamily: 'Comic-Regular',
        textAlign: 'center',
        fontSize: 15,
        width: 40,
    },

    pointsIconStyle2: {
        //resizeMode: 'contain',
        height: 20,
        width: 20,
        marginTop: 2,
    },


})