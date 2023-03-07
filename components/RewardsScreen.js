import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import SelectDropdown from 'react-native-select-dropdown';
import stickerData from '../assets/data/stickerData';


const RewardsScreen = () => {

    //dropdown
    const [closeDropdown, setCloseDropdown] = useState(false);

    const [aa, setaa] = useState(true);

    const categories = ["Sticker", "Rozet"]

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
                    image: stickerData[i].image,
                    price: stickerData[i].spPrice
                }]
            })
        }else {
            DATA[index].stickers.push({
                id: stickerData[i].id,
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


                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}> */}

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

                <View style={{ marginTop: 25 }}>
                

                    {/* Main Container */}
                    <View style={{ marginTop: 25 }}>

                        {DATA.map((stickerData) => {
                            return (
                                <View>
                                <View style={[styles.headerView12, { marginTop: 5 }]}>
        
                                    <Text
                                        style={styles.headerTextStyle2}
                                        adjustsFontSizeToFit={true}
                                        numberOfLines={1}>
                                        {stickerData.bookName}
                                    </Text>
        
                                    {stickerData.stickers.map((sticker, index) => {
                                        return (
                                            <View>
                                            <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyleFirstItem}>
        
                                                <TouchableOpacity
                                                    key={sticker.id}
                                                    onPress={() => console.log(item.id)}
                                                    activeOpacity={0.75}>
        
        
                                                    <ImageBackground
                                                        source={sticker.image}
                                                        imageStyle={styles.continueBookImageStyle}>
                                                    </ImageBackground>
        
                                                </TouchableOpacity>
        
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
                                            </View>
        
        
                                        </View>
                                        )
                                    })}
                                </View>
        
                            </View>
                            )
                        })}
                        {/* <FlatList
                            horizontal={false}
                            scrollEnabled={false}
                            numColumns={parseInt(widthOfScreen / 100)}
                            viewAreaCoveragePercentThreshold={10}
                            itemVisiblePercentThreshold={10}
                            data={booksListData}

                            renderItem={({ item, index, separators }) => (
                                <View>
                                    <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyleFirstItem}>

                                        <TouchableOpacity
                                            key={item.key}
                                            onPress={() => console.log(item.id)}
                                            activeOpacity={0.75}>


                                            <ImageBackground
                                                source={item.image}
                                                imageStyle={styles.continueBookImageStyle}>
                                            </ImageBackground>

                                        </TouchableOpacity>

                                        <View style={styles.pointsContainer2}>

                                            <Text
                                                style={styles.pointsTextStyle2}
                                                adjustsFontSizeToFit={true}
                                                numberOfLines={1}>
                                                1600
                                            </Text>

                                            <Image
                                                source={require('../assets/images/iconStar.png')}
                                                style={styles.pointsIconStyle2}>
                                            </Image>

                                        </View>
                                    </View>


                                </View>

                            )}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                        /> */}
                    </View>


                </View>

            </SafeAreaView>
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

    continueReadingBookStyle: {
        width: 75,
        height: 110,
        marginRight: 15,
        marginBottom: 15
    },

    continueReadingBookStyleFirstItem: {
        width: 75,
        height: 110,
        marginRight: 15,
        marginLeft: 35
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
        marginLeft: 35
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
        fontSize: 20,
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
        height: 120,
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




})