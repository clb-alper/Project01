import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
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




var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const categories = ["Alfabe", "Kategoriler", "Yaş", "Tema"]

const bookWidth = (widthOfScreen - 55) / 3;
const Library = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [modalEntry, setModalEntry] = useState(booksListData);

    const DATA = [];

    const dataLetters = [];

        for (let i = 0; i < booksListData.length; i++) {
            // const dataLetters = DATA.map((book) => book.condition);
            const index = dataLetters.findIndex((letter) => letter == booksListData[i].title.substring(0, 1));

            if (index > -1) {
                DATA[index].books.push(booksListData[i]);
            }
            else {
                dataLetters.push(booksListData[i].title.substring(0, 1))
                DATA.push({
                    condition: booksListData[i].title.substring(0, 1),
                    condition2: booksListData[i].themeTag,
                    books: [{
                        id: booksListData[i].id,
                        title: booksListData[i].title,
                        image: booksListData[i].image,
                        itemColor: booksListData[i].itemColor,
                        itemBorder: booksListData[i].itemBorder,
                        itemColorBG: booksListData[i].itemColorBG,
                        itemTextColor: booksListData[i].itemTextColor,
                        itemDesc: booksListData[i].itemDesc,
                        bookProgress: booksListData[i].bookProgress,
                        themeTag: booksListData[i].themeTag,
                        ageTag: booksListData[i].ageTag,
                        contentTag: booksListData[i].contentTag,

                    }]
                })
            }
        }


    const [closeDropdown, setCloseDropdown] = useState(false);

    const [aa, setaa] = useState(true);

    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });


    const DATASAMPLE = [
        {
            condition: 'a',
            books: [
                {
                    id: 1,
                    title: 'Ahmet'
                },
                {
                    id: 2,
                    title: 'Alper'
                }
            ]
        }
    ];

    {/*}
    const DATA = [];

    const dataLetters = [];

    for (let i = 0; i < booksListData.length; i++) {
        // const dataLetters = DATA.map((book) => book.condition);
        const index = dataLetters.findIndex((letter) => letter == booksListData[i].title.substring(0, 1));

        if (index > -1) {
            DATA[index].books.push(booksListData[i]);
        }
        else {
            dataLetters.push(booksListData[i].title.substring(0, 1))
            DATA.push({
                condition: booksListData[i].title.substring(0, 1),
                condition2: booksListData[i].themeTag,
                books: [{
                    id: booksListData[i].id,
                    title: booksListData[i].title,
                    image: booksListData[i].image,
                    itemColor: booksListData[i].itemColor,
                    itemBorder: booksListData[i].itemBorder,
                    itemColorBG: booksListData[i].itemColorBG,
                    itemTextColor: booksListData[i].itemTextColor,
                    itemDesc: booksListData[i].itemDesc,
                    bookProgress: booksListData[i].bookProgress,
                    themeTag: booksListData[i].themeTag,
                }]
            })
        }
    }

*/}


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

    const shadowOpt2 = {
        width: widthOfScreen,
        height: 117,
        color: "#000",
        border: 12,
        radius: 25,
        opacity: 0.2,
        x: -1,
        y: 2.5,

    }

    const shadowOpt3 = {
        width: 0,
        height: 0,
        color: "#000",
        border: 12,
        radius: 25,
        opacity: 0.2,
        x: -1,
        y: 2.5,
        zIndex: -500

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

            <SafeAreaView edges={['right', 'left', 'bottom']}>

                <BoxShadow setting={shadowOpt2}>
                    <View style={[styles.libContainer, styles.shadowProp]}>
                        <View style={styles.libContainerView}>
                            <Text
                                style={styles.LibHeaderTxtStyle}
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}>
                                Kütüphane
                            </Text>

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

                            {/* <ModalDropdown
                                style={styles.DropdownStyle}
                                textStyle={styles.DropdownTextStyle}
                                dropdownStyle={styles.DropdownContainerStyle}
                                dropdownTextStyle={styles.DropdownContainerTextStyle}
                                dropdownTextHighlightStyle={styles.DropdownTextHighlightStyle}
                                dropdownTextProps={styles.DropdownContainerTextStyle}

                                onSelect={(value) => {

                                    if (value == 'ALFABE') {
                                        navigation.navigate('Dashboard')
                                    }

                                }}
                                defaultValue="ALFABE"
                                options={['ALFABE', 'KATEGORİLER', 'YAŞA GÖRE']} /> */}

                        </View>
                    </View>
                </BoxShadow>





                <ScrollView

                    overScrollMode={'never'}
                    showsVerticalScrollIndicator={false}
                    style={[styles.alphabetScrollStyle, styles.boxShadow]}>




                    <View style={[styles.alphabetViewStyle, styles.boxShadow]}>

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

                <ScrollView
                    overScrollMode={'never'}
                    showsVerticalScrollIndicator={false}
                    style={[styles.FlatsScrollViewStyle, { width: '100%' }, { flexWrap: 'wrap' }]}
                    horizontal={false} >

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
                                onPress={() => { console.log('Kitap acildi.') }}
                                activeOpacity={0.8}>
                                <View style={styles.modalBookStartButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>

                                    <Image source={require('../assets/images/startIcon.png')} tintColor={modalEntry.itemBorder} style={styles.badgeIconStyle} />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </Modal>

                    <View style={{ flexWrap: 'wrap', marginTop: 30, marginLeft: 10 }}>
                        {
                            DATA.map((book, index) => {
                                return (
                                    <View key={index}>
                                        {/* <Text style={aa ? styles.alphabetLettersStyle2 : styles.alphabetLettersStyle3}>{book.condition}</Text> */}
                                        {/*<Text style={styles.alphabetLettersStyle2}>{book.condition}</Text>*/}
                                        {/* <Text style={ aa ? styles.alphabetLettersStyle2: styles.alphabetLettersStyle3}>{aa ? book.condition : book.condition2 }</Text> */}
                                        <Text style={styles.alphabetLettersStyle2}>{aa ? book.condition : book.condition2}</Text>

                                        <View style={styles.bookContainer} key={index}>
                                            {
                                                book.books.map((bookDetail) => {
                                                    return (
                                                        <View key={bookDetail.id} style={{ ...styles.bookContainer, width: bookWidth }}>
                                                         

                                                                <TouchableOpacity
                                                                    key={index}
                                                                    onPress={() => { setModalVisible(true); setModalEntry(bookDetail); }}
                                                                    activeOpacity={0.75}>
                                                                    <BoxShadow setting={shadowOpt}>
                                                                        <ImageBackground
                                                                            source={bookDetail.image}
                                                                            imageStyle={styles.continueBookImageStyle}>
                                                                        </ImageBackground>
                                                                    </BoxShadow>
                                                                </TouchableOpacity>

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
        height: heightOfScreen * 0.78,
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

    DropdownTextHighlightStyle: {
        backgroundColor: 'white',
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