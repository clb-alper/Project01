import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList, Dimensions, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import SelectDropdown from 'react-native-select-dropdown';
import stickerData from '../assets/data/stickerData';



var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const RewardsScreen = () => {

    //dropdown
    const [closeDropdown, setCloseDropdown] = useState(false);

    const [aa, setaa] = useState(true);

    const categories = ["Sticker", "Rozet"]

    const [modalVisible, setModalVisible] = useState(false);

    const [modalEntry, setModalEntry] = useState(stickerData);

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

    var widthOfScreen = Dimensions.get('window').width; //full width

    const DATA = [];


    for (let i = 0; i < stickerData.length - 1; i++) {
        const index = DATA.findIndex((dataSticker) => dataSticker.bookName === stickerData[i].stickerBook);
        if (index == -1) {
            DATA.push({
                bookName: stickerData[i].stickerBook,
                stickers: [{
                    id: stickerData[i].id,
                    stickerName: stickerData[i].stickerName,
                    image: stickerData[i].image,
                    price: stickerData[i].spPrice
                }]
            })
        } else {
            DATA[index].stickers.push({
                id: stickerData[i].id,
                stickerName: stickerData[i].stickerName,
                image: stickerData[i].image,
                price: stickerData[i].spPrice
            })
        }
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            <SafeAreaView edges={['right', 'left']}>

                {/* Header Container */}
                <View style={[styles.login_container, styles.shadowProp]}>

                    <View style={styles.headerView1}>

                        <Text
                            style={styles.headerTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            Ödüller
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
                </View>

            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}>

                {/* Dropdown menu  */}
                <View style={styles.pointsContainer222}>

                    <SelectDropdown

                        buttonStyle={closeDropdown ? styles.DropdownStyle2 : styles.DropdownStyle}
                        buttonTextStyle={styles.DropdownTextStyle}
                        dropdownStyle={styles.DropdownContainerStyle}
                        rowStyle={styles.DropdownRowStyle}
                        rowTextStyle={styles.DropdownContainerTextStyle}
                        dropdownOverlayColor='transparent'

                        data={categories}
                        adjustsFontSizeToFit={true}
                        defaultButtonText={categories[0]}

                        onFocus={() => {
                            setCloseDropdown(true)
                        }}

                        onBlur={() => {
                            setCloseDropdown(false)
                        }}

                        onSelect={(selectedItem, index) => {
                            setCloseDropdown(false)
                            console.log(categories[index])
                            console.log(selectedItem)

                            if (selectedItem == 'Tema') {
                                // navigation.navigate('Dashboard')

                                // return ()

                                setaa(false)

                            } else if (selectedItem == 'Alfabe') {
                                setaa(true)
                            }
                        }}

                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}

                    />



                </View>

                <View style={{ marginTop: 10 }}>
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

                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <View>
                                <Image
                                    source={modalEntry.image}
                                    style={styles.modalStickerImage}
                                >
                                </Image>
                            </View>
                            <View>
                                <Text style={styles.modalStickerNameText}>
                                    {modalEntry.stickerName} Sticker
                                </Text>
                            </View>
                            <View style={styles.pointsContainer3}>

                                <Text
                                    style={styles.pointsTextStyle3}
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={1}>
                                    {modalEntry.price}
                                </Text>

                                <Image
                                    source={require('../assets/images/iconStar.png')}
                                    style={styles.pointsIconStyle3}>
                                </Image>


                            </View>

                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                activeOpacity={0.75}
                                style={styles.modalStickerCloseButton}>
                                <Image
                                    source={require('../assets/images/closeIcon.png')}
                                    style={styles.modalStickerCloseButtonIcon}
                                />
                            </TouchableOpacity>

                        </View>


                    </Modal>

                    {/* Main Container */}
                    {DATA.map((stickerData, index) => {
                        return (
                            <View key={index}>
                                <View style={[styles.headerView12, { marginTop: 5 }]}>

                                    <Text
                                        style={styles.headerTextStyle2}
                                        adjustsFontSizeToFit={true}
                                        numberOfLines={1}>
                                        {stickerData.bookName}
                                    </Text>

                                    <View style={styles.stickerContainer}>
                                        {stickerData.stickers.map((sticker, index) => {
                                            return (
                                                <View key={index}>
                                                    <View style={styles.continueReadingBookStyleFirstItem}>

                                                        <TouchableOpacity
                                                            key={sticker.id}
                                                            onPress={() => { setModalVisible(true); setModalEntry(sticker) }}
                                                            activeOpacity={0.75}>


                                                            <ImageBackground

                                                                source={sticker.image}
                                                                imageStyle={styles.continueBookImageStyle}>
                                                            </ImageBackground>



                                                            <View style={styles.pointsContainer2}>

                                                                <Text
                                                                    style={styles.pointsTextStyle2}
                                                                    adjustsFontSizeToFit={true}
                                                                    numberOfLines={1}>
                                                                    {sticker.price}
                                                                </Text>

                                                                <Image

                                                                    source={require('../assets/images/iconStar.png')}
                                                                    style={styles.pointsIconStyle2}>
                                                                </Image>

                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>


                                                </View>
                                            )
                                        })}
                                    </View>

                                </View>

                            </View>
                        )
                    })}


                </View>
            </ScrollView>

        </View>
    )
}

export default RewardsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.purpleLight,
    },

    login_container: {
        backgroundColor: colors.purpleHeaderContainer,
        width: '100%',
        height: 125,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8,
    },

    headerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 57,
    },

    headerView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 50,
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

    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 42,
        width: 117,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleHeaderContainer,
        paddingLeft: 12,
    },

    pointsTextStyle: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 35,
        width: 55,
    },

    pointsIconStyle: {
        resizeMode: 'contain',
        height: 35,
        width: 35,
        marginLeft: 5,
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

    pointsContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleHeaderContainer,
    },

    pointsTextStyle2: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 15,
        width: 40,
    },

    pointsIconStyle2: {
        resizeMode: 'contain',
        height: 20,
        width: 20,
    },

    headerView12: {
        flexDirection: 'column',
        marginHorizontal: 20,
        marginTop: 20,
        marginLeft: 35,
    },

    headerView22: {
        position: 'absolute',
        right: '-2.5%',
        marginHorizontal: 20,
        width: '41%',
        height: 10,
        backgroundColor: colors.purpleSpacer,
    },

    headerTextStyle2: {
        fontFamily: 'Comic-Regular',
        fontSize: 30,
        marginBottom: 15,
    },

    pointsContainer22: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        width: 80,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleHeaderContainer,
        paddingLeft: 5,
    },

    pointsContainer222: {
        flex: 1,
        alignItems: 'flex-end',
        height: 28,
        width: '100%',
        marginTop: 25,
        marginLeft: '-7.5%',
    },

    stickerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
        width: '100%',
    },

    modalStickerNameText: {
        fontFamily: 'Comic-Regular',
        fontSize: 38,
        color: 'white',
    },

    modalStickerImage: {
        width: 200,
        height: 200,
        marginTop: 100,
    },

    modalStickerCloseButton: {
        borderRadius: 500,
        borderWidth: 5,
        width: 70,
        height: 70,
        marginTop: 30,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleHeaderContainer
    },

    modalStickerCloseButtonIcon: {
        width: 40,
        height: 40,
        marginTop: 10,
        marginLeft: 10
    },

    pointsContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 120,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleHeaderContainer,
    },

    pointsTextStyle3: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 25,
        width: 65,
    },

    pointsIconStyle3: {
        resizeMode: 'contain',
        height: 38,
        width: 38,
    },




    //temporary dropdown styles


    DropdownViewStyle: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 30,

    },

    DropdownStyle: {
        backgroundColor: colors.purpleTagBG,
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
        backgroundColor: colors.purpleTagBG,
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
        backgroundColor: colors.purpleTagBG,

    },

    DropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.purpleTagBG,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

    },

    DropdownRowStyle: {
        width: 105,
        height: 35,
        marginLeft: -10,

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

    modalViewStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '80%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor: colors.white,
    },




})