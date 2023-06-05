import React, { useContext, useEffect } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Dimensions, ImageBackground, Image } from 'react-native';
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
import BackpackHeader from '../assets/components/rewards/BackpackHeader';
import BackpackStickerModal from '../assets/components/rewards/BackpackStickerModal';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const BackpackScreen = () => {

    const { userOwnedStickerList, setUserOwnedStickerList, stickerList, setStickerList, setStickerBookList } = useContext(RewardsContext)
    const { currentProfileSelected } = useContext(ProfileContext);
    const { backpackStickerModalEntry, setBackpackStickerModalEntry, backpackStickerModalVisible, setBackpackStickerModalVisible } = useContext(ModalContext);

    const stickersRef = firebase.firestore().collection('stickers')

    const getStickerData = async () => {
        stickersRef
            .onSnapshot(
                querySnapshot => {
                    const stickerList = []
                    querySnapshot.forEach((doc) => {
                        const { iconImage, name, price, stickerBookNo, stickerLevel } = doc.data()

                        stickerList.push({
                            id: doc.id,
                            iconImage,
                            name,
                            price,
                            stickerBookNo,
                            stickerLevel
                        })

                    })
                    setStickerList(stickerList)
                }
            )
    }

    const stickerBookRef = firebase.firestore().collection('stickerBooks')

    const getStickerBookData = async () => {
        stickerBookRef
            .onSnapshot(
                querySnapshot => {
                    const stickerBookList = []
                    querySnapshot.forEach((doc) => {
                        const { bookNo, name } = doc.data()

                        stickerBookList.push({
                            id: doc.id,
                            bookNo,
                            name,
                        })
                    })
                    setStickerBookList(stickerBookList)
                }
            )
    }

    const userStickersRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
        .doc(currentProfileSelected).collection('stickerCollection')

    const getUserStickerData = async () => {
        userStickersRef
            .onSnapshot(
                querySnapshot => {
                    const userOwnedStickerList = []
                    querySnapshot.forEach((doc) => {

                        stickerList.every((sticker) => {
                            if (sticker.id === doc.data().stickerID) {
                                userOwnedStickerList.push({
                                    id: doc.data().stickerID,
                                    iconImage: sticker.iconImage,
                                    name: sticker.name,
                                    price: sticker.price,
                                    stickerBookNo: sticker.stickerBookNo,
                                    stickerLevel: sticker.stickerLevel
                                })
                                return false
                            }
                            return true
                        })
                    })
                    setUserOwnedStickerList(userOwnedStickerList)
                }
            )
    }

    useEffect(() => {
        getStickerData();
        getStickerBookData();
    }, [])

    useEffect(() => {
        getUserStickerData();
    }, [stickerList])

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

                <BackpackHeader />

            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                style={{ zIndex: 0 }}>

                <BackpackStickerModal />

                <View style={[styles.headerView12, { marginTop: 40 }]}>

                    <View style={styles.stickerContainer}>


                        {userOwnedStickerList.length <= 0 ?
                            <View style={{height: heightOfScreen *0.65, width: widthOfScreen*0.85, alignItems:'center', justifyContent: 'center'}}>
                                <Image
                                    style={styles.emptySectionImageStyle}
                                    source={require('.././assets/images/emptyFlImageBackpack.png')}
                                />
                                <Text style={{fontFamily: 'Comic-Regular', fontSize: 28, marginTop: 10}}>Sticker Çantası Boş</Text>
                            </View>
                            :
                            typeof (userOwnedStickerList) === 'undefined' ?
                                null
                                :
                                userOwnedStickerList.map((sticker) => {
                                    return (
                                        <TouchableOpacity
                                            key={sticker.id}
                                            style={styles.continueReadingBookStyleFirstItem}
                                            onPress={() => { setBackpackStickerModalEntry(sticker); setBackpackStickerModalVisible(true) }}
                                            activeOpacity={0.85}>

                                            <ImageBackground
                                                source={{ uri: sticker.iconImage }}
                                                imageStyle={styles.continueBookImageStyle}>
                                            </ImageBackground>

                                        </TouchableOpacity>

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
        resizeMode: 'contain'
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

    emptySectionImageStyle: {
        height: 180,
        width: 180,
    },


})