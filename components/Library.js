import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground, FlatList, Dimensions, ListViewBase, Pressable, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import booksListData from '../assets/data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import ModalDropdown from 'react-native-modal-dropdown';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const Library = ({ navigation }) => {


    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });


    const DATA = [];

    const getItem = (data, index) => ({
        id: 'book3',
        title: 'KucukPrens',
        image: require('../assets/images/kucukprens.png'),
        itemColor: '#B4B3B8',
        itemBorder: '#9B9A9E',
        itemColorBG: 'rgba(180, 179, 184, 0.55)',
        itemTextColor: colors.black,
        itemDesc: "Küçük Prens, kendi galaksisinde, kendi dünyasında tek bir gül ile yaşayan bir Küçük Prens'in başka galaksileri gezmek için tek gülünü tek başına bırakıp yolculuk yapmasını anlatır. Ancak bu yolculuk esnasında vurgulamak istediği şey 'büyümek'tir.",
        bookProgress: 0.8,
    });

    const getItemCount = (data) => 10;

    const shadowOpt = {
        width: 100,
        height: 165,
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


    return (


        <View style={styles.libraryBG} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />

            <SafeAreaView edges={['right', 'left']}>

                <View style={[styles.login_container, styles.shadowProp]}>
                    <View style={styles.headerView1}>

                        <Text
                            style={styles.headerTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            Kütüphane
                        </Text>
                        <ModalDropdown
                        style={styles.DropdownStyle}
                        textStyle={styles.DropdownTextStyle}
                        dropdownStyle={styles.DropdownContainerStyle}
                        dropdownTextStyle={styles.DropdownContainerTextStyle}
                        dropdownTextHighlightStyle={styles.DropdownTextHighlightStyle}
                        dropdownTextProps={styles.DropdownContainerTextStyle}


                        onSelect={(value) => {

                            if (value == 'ALFABE') {
                                navigation.navigate('Dashboard')
                                console.log('afasd')
                            }

                        }}
                        defaultValue="KATEGORİ"
                        options={['ALFABE', 'KATEGORİLER', 'YAŞA GÖRE']} />
                     
                    </View>
                </View>


                <ScrollView

                    overScrollMode={'never'}
                    showsVerticalScrollIndicator={false}
                    style={styles.alphabetScrollStyle}>
                    <View style={styles.alphabetViewStyle}>

                        <Text onPress={() => console.log("A")}
                            style={[styles.alphabetLettersStyle, { marginTop: 15 }]}>A</Text>

                        <Text onPress={() => console.log("B")}
                            style={styles.alphabetLettersStyle}>B</Text>

                        <Text onPress={() => console.log("C")}
                            style={styles.alphabetLettersStyle}>C</Text>

                        <Text onPress={() => console.log("Ç")}
                            style={styles.alphabetLettersStyle}>Ç</Text>

                        <Text onPress={() => console.log("D")}
                            style={styles.alphabetLettersStyle}>D</Text>

                        <Text onPress={() => console.log("E")}
                            style={styles.alphabetLettersStyle}>E</Text>

                        <Text onPress={() => console.log("F")}
                            style={styles.alphabetLettersStyle}>F</Text>

                        <Text onPress={() => console.log("A")}
                            style={[styles.alphabetLettersStyle]}>G</Text>

                        <Text onPress={() => console.log("B")}
                            style={styles.alphabetLettersStyle}>H</Text>

                        <Text onPress={() => console.log("C")}
                            style={styles.alphabetLettersStyle}>I</Text>

                        <Text onPress={() => console.log("Ç")}
                            style={styles.alphabetLettersStyle}>İ</Text>

                        <Text onPress={() => console.log("D")}
                            style={styles.alphabetLettersStyle}>J</Text>

                        <Text onPress={() => console.log("E")}
                            style={styles.alphabetLettersStyle}>K</Text>

                        <Text onPress={() => console.log("F")}
                            style={styles.alphabetLettersStyle}>L</Text>

                        <Text onPress={() => console.log("B")}
                            style={styles.alphabetLettersStyle}>M</Text>

                        <Text onPress={() => console.log("C")}
                            style={styles.alphabetLettersStyle}>N</Text>

                        <Text onPress={() => console.log("Ç")}
                            style={styles.alphabetLettersStyle}>O</Text>

                        <Text onPress={() => console.log("D")}
                            style={styles.alphabetLettersStyle}>Ö</Text>

                        <Text onPress={() => console.log("E")}
                            style={styles.alphabetLettersStyle}>P</Text>

                        <Text onPress={() => console.log("F")}
                            style={styles.alphabetLettersStyle}>R</Text>

                        <Text onPress={() => console.log("A")}
                            style={[styles.alphabetLettersStyle]}>S</Text>

                        <Text onPress={() => console.log("B")}
                            style={styles.alphabetLettersStyle}>Ş</Text>

                        <Text onPress={() => console.log("C")}
                            style={styles.alphabetLettersStyle}>T</Text>

                        <Text onPress={() => console.log("Ç")}
                            style={styles.alphabetLettersStyle}>U</Text>

                        <Text onPress={() => console.log("D")}
                            style={styles.alphabetLettersStyle}>Ü</Text>

                        <Text onPress={() => console.log("E")}
                            style={styles.alphabetLettersStyle}>V</Text>

                        <Text onPress={() => console.log("F")}
                            style={styles.alphabetLettersStyle}>Y</Text>

                        <Text onPress={() => console.log("F")}
                            style={styles.alphabetLettersStyle}>Z</Text>


                    </View>
                </ScrollView>


                {/* 

                <ScrollView style={{position:'absolute', }} horizontal={true} >
                    <View
                        numColumns={5}
                        style={styles.container2}>

                        {booksListData.map((book) => {
                            return (

                                <TouchableOpacity
                                    key={book.key}
                                    onPress={() => console.log(book.id)}
                                    activeOpacity={0.75}>

                                    <BoxShadow setting={shadowOpt}>
                                        <ImageBackground
                                            source={book.image}
                                            imageStyle={styles.bookCoverStyle}>
                                        </ImageBackground>
                                    </BoxShadow>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </ScrollView>

*/}


                <ScrollView

                    overScrollMode={'never'}
                    showsVerticalScrollIndicator={false}
                    style={styles.FlatsScrollViewStyle}
                    horizontal={false} >

                    <View style={styles.FlatsViewStyle}>
                        <Text style={[styles.letterHeader, { marginTop: -10 }]}>A</Text>

                        <View>
                            <FlatList
                                horizontal={false}
                                scrollEnabled={false}
                                numColumns={parseInt((widthOfScreen - 65) / 100)}
                                viewAreaCoveragePercentThreshold={10}
                                itemVisiblePercentThreshold={10}
                                data={booksListData}

                                renderItem={({ item, index, separators }) => (
                                    <View style={index != 0 ? styles.bookStyle : styles.bookStyleFirstItem}>

                                        <TouchableOpacity
                                            key={item.key}
                                            onPress={() => console.log(item.id)}
                                            activeOpacity={0.75}>

                                            <BoxShadow setting={shadowOpt}>
                                                <ImageBackground
                                                    source={item.image}
                                                    imageStyle={styles.bookCoverStyle}>
                                                </ImageBackground>
                                            </BoxShadow>
                                        </TouchableOpacity>

                                    </View>

                                )}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>


                    <View style={styles.FlatsViewStyle}>
                        <Text style={styles.letterHeader}>B</Text>

                        <View>
                            <FlatList
                                horizontal={false}
                                scrollEnabled={false}
                                numColumns={parseInt((widthOfScreen - 65) / 100)}
                                viewAreaCoveragePercentThreshold={10}
                                itemVisiblePercentThreshold={10}
                                data={booksListData}

                                renderItem={({ item, index, separators }) => (
                                    <View style={index != 0 ? styles.bookStyle : styles.bookStyleFirstItem}>

                                        <TouchableOpacity
                                            key={item.key}
                                            onPress={() => console.log(item.id)}
                                            activeOpacity={0.75}>

                                            <BoxShadow setting={shadowOpt}>
                                                <ImageBackground
                                                    source={item.image}
                                                    imageStyle={styles.bookCoverStyle}>
                                                </ImageBackground>
                                            </BoxShadow>
                                        </TouchableOpacity>

                                    </View>

                                )}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>


                    <View style={styles.FlatsViewStyle}>
                        <Text style={styles.letterHeader}>C</Text>

                        <View>
                            <FlatList
                                horizontal={false}
                                scrollEnabled={false}
                                numColumns={parseInt((widthOfScreen - 65) / 100)}
                                viewAreaCoveragePercentThreshold={10}
                                itemVisiblePercentThreshold={10}
                                data={booksListData}

                                renderItem={({ item, index, separators }) => (
                                    <View style={index != 0 ? styles.bookStyle : styles.bookStyleFirstItem}>

                                        <TouchableOpacity
                                            key={item.key}
                                            onPress={() => console.log(item.id)}
                                            activeOpacity={0.75}>

                                            <BoxShadow setting={shadowOpt}>
                                                <ImageBackground
                                                    source={item.image}
                                                    imageStyle={styles.bookCoverStyle}>
                                                </ImageBackground>
                                            </BoxShadow>
                                        </TouchableOpacity>

                                    </View>
                                )}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>


                    </View>
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
        elevation: 15,
    },

    letterHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 65,
        paddingLeft: 20,
        paddingTop: 35
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
    },

    alphabetViewStyle: {
        backgroundColor: colors.blueContainer,
        borderTopRightRadius: 25,
        height: heightOfScreen * 1.70,
        borderWidth: 0.5,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        paddingTop:'100%',
        marginTop: '10%',
        zIndex:-10
    },

    alphabetLettersStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,

    },

    FlatsViewStyle: {
        width: widthOfScreen - 50,
    },

    FlatsScrollViewStyle: {
        marginLeft: 50,
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
        width: 145,
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
        paddingTop: 4,

    },

    DropdownContainerStyle: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: colors.blueBorder,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        width: 155,
        height: 100,
        marginRight: '-6.6%',
        marginTop: '-6%',
        backgroundColor: colors.blueTabBar,

    },

    DropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.blueTabBar,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,


    },
    DropdownTextHighlightStyle: {
        backgroundColor: 'white',
    },







    login_container: {
        backgroundColor: colors.blueContainer,
        width: '100%',
        height: 125,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        zIndex:10
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
    pointsTextStyle22: {
        fontFamily: 'Comic-Regular',
        textAlign: 'center',
        fontSize: 15,
        width: 45,
    },

    pointsIconStyle22: {
        resizeMode: 'contain',
        height: 20,
        width: 20,
    },
    headerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 49,
    },




    container2: {
        padding: 50,
    },
})