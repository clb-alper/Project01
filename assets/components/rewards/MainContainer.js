import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import colors from '../../colors/colors';
import { DropdownContext } from '../../contexts/DropdownContext';
import { LibraryContext } from '../../contexts/LibraryContext';
import { ModalContext } from '../../contexts/ModalContext';
import { RewardsContext } from '../../contexts/RewardsContext';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ProfileContext } from '../../contexts/ProfileContext';
import { auth, firebase } from '../../../firebase';
import Rainbow from '../Rainbow';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const MainContainer = () => {

    const { DATA, setUserOwnedStickerList, userOwnedStickerList } = useContext(RewardsContext);
    const { setStickerModalEntry, setStickerModalVisible, } = useContext(ModalContext);
    const { setCategorySwitch } = useContext(LibraryContext);
    const { closeRewardsDropdown, setCloseRewardsDropdown, rewardsCategories } = useContext(DropdownContext)
    const { currentProfileSelected } = useContext(ProfileContext);

    const [userStoreStickerList, setUserStoreStickerList] = useState();

    const { stickerList, setStickerList, userStickerList, setUserStickerList, stickerBookList, setStickerBookList } = useContext(RewardsContext);

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

    const AAAA = async () => {

        const aa = []
        stickerList.forEach((sticker) => {
            if (userOwnedStickerList.findIndex(x => x.id===sticker.id) === -1) {
                 aa.push({
                    id: sticker.id,
                    iconImage: sticker.iconImage,
                    name: sticker.name,
                    price: sticker.price,
                    stickerBookNo: sticker.stickerBookNo,
                    stickerLevel: sticker.stickerLevel
                })
            }
        })
        setUserStoreStickerList(aa)
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

                        stickerList.forEach((sticker) => {
                            if (sticker.id === doc.id) {
                                userOwnedStickerList.push({
                                    id: doc.id,
                                    iconImage: sticker.iconImage,
                                    name: sticker.name,
                                    price: sticker.price,
                                    stickerBookNo: sticker.stickerBookNo,
                                    stickerLevel: sticker.stickerLevel
                                })
                            }
                        })
                    })
                    setUserOwnedStickerList(userOwnedStickerList)        
                }
            )

    }

    useEffect(() => {
        getStickerData();
        getUserStickerData();
        getStickerBookData();
        AAAA()
    }, [])

    useEffect(() => {
         AAAA()
    }, [stickerList])

    useEffect(() => {
        AAAA()
    }, [userOwnedStickerList])


    // console.log(userStoreStickerList)

    return (
        <>
    
            <View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>

                </View>
                <View style={[styles.headerView12, { marginTop: 20 }]}>
                    {
                        stickerBookList.map((sBook, index) => {
                            return (
                                <View key={index}>
                                    <Text

                                        style={styles.headerTextStyle2}
                                        adjustsFontSizeToFit={true}
                                        numberOfLines={1}>
                                        {sBook.name}
                                    </Text>

                                    <View style={styles.stickerContainer}>
                                        {typeof (userStoreStickerList) === 'undefined' ? null :
                                            userStoreStickerList.filter((sl) => sBook.bookNo === sl.stickerBookNo).map((sticker, index) => {
                                                return (
                                                    <View key={sticker.id + index}>
                                                        <View style={styles.continueReadingBookStyleFirstItem}>

                                                            <TouchableOpacity

                                                                onPress={() => { setStickerModalVisible(true); setStickerModalEntry(sticker); }}
                                                                activeOpacity={0.75}>

                                                                <ImageBackground

                                                                    source={{ uri: sticker.iconImage }}
                                                                    imageStyle={styles.continueBookImageStyle}>
                                                                </ImageBackground>

                                                                <View style={
                                                                    sticker.stickerLevel === "Bronze" ?
                                                                        styles.bronzePointsContainer :
                                                                        sticker.stickerLevel === "Silver" ?
                                                                            styles.silverPointsContainer :
                                                                            sticker.stickerLevel === "Gold" ?
                                                                                styles.goldPointsContainer :
                                                                                sticker.stickerLevel === "Emerald" ?
                                                                                    styles.emeraldPointsContainer :
                                                                                    sticker.stickerLevel === "Diamond" ?
                                                                                        styles.diamondPointsContainer :
                                                                                        styles.defaultPointsContainer}>

                                                                    <Text
                                                                        style={styles.pointsTextStyle2}
                                                                        adjustsFontSizeToFit={true}
                                                                        numberOfLines={1}>
                                                                        {sticker.price}
                                                                    </Text>

                                                                    <AntIcons name="star" size={17} color="#FFB702" style={styles.pointsIconStyle2} />

                                                                </View>


                                                            </TouchableOpacity>

                                                        </View>


                                                    </View>
                                                )

                                            })
                                        }

                                    </View>
                                </View>
                            )
                        })


                    }
                </View>

            </View>



        </>
    )
}

export default MainContainer

const styles = StyleSheet.create({

    headerView12: {
        flexDirection: 'column',
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

    continueBookImageStyle: {
        width: 75,
        height: 75,
        borderRadius: 12,
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

    DropdownViewStyle: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 30,

    },

    DropdownStyle: {
        backgroundColor: colors.purpleRegular,
        borderRadius: 15,
        height: 30,
        width: 90,
        borderWidth: 2,
        borderColor: colors.purpleBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    DropdownStyle2: {
        backgroundColor: colors.purpleRegular,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 30,
        width: 90,
        borderWidth: 2,
        borderColor: colors.purpleBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    DropdownTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 18,
        alignItems: 'center',
        alignContent: 'center',

    },

    DropdownContainerStyle: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: colors.purpleBorder,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

        width: 111.5,
        height: 95,
        marginRight: '-6.6%',
        marginTop: '-6.3%',
        backgroundColor: colors.purpleRegular,

    },

    DropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.purpleRegular,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

    },

    DropdownRowStyle: {
        width: 105,
        height: 35,
        marginLeft: -10,

    },

    pointsHeader: {
        flex: 1,
        alignItems: 'flex-end',
        height: 28,
        width: '100%',
        marginTop: 10,
        marginLeft: '-7.5%',
    },

    backpackButton: {
        height: 50,
        width: widthOfScreen * 0.3,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: colors.purpleRegular,
        marginRight: 20,
        position: 'absolute'
    }
})