import { StatusBar } from 'expo-status-bar';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, VirtualizedList, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BoxShadow } from 'react-native-shadow';
import * as Speech from 'expo-speech';
import { ModalContext } from '../assets/contexts/ModalContext';
import { useNavigation } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { auth, firebase } from '../firebase';
import { ProfileContext } from '../assets/contexts/ProfileContext';
import Skeleton from '../assets/components/Skeleton';
import { Translator } from '../assets/components/Translator';



const widthOfScreen = Dimensions.get('window').width
const heightOfScreen = Dimensions.get('window').height

const ReadingPage = () => {

    const { setModalVisible, modalVisible, modalEntry } = useContext(ModalContext);
    const { currentProfileSelected, userBookProgress, setUserBookProgress, readed, setReaded, userPrefFontSize, getFontLocalStorage } = useContext(ProfileContext);

    const [bookContent, setBookContent] = useState([]);
    const [bookPageColor, setBookPageColor] = useState();
    const [pages, setPages] = useState([]);
    const [words, setWords] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    const [isBack, setIsBack] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const loadUserView = async () => {
        await sleep(1200)
        setIsLoaded(true)
    }

    const userProfileRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected);



    // useEffect(() => {

    //     userProfileRef
    //         .onSnapshot(
    //             querySnapshot => {
    //                 const isTagAdded = querySnapshot.data().tagsAdded

    //                 if (isTagAdded === false) {

    //                     handleTagData()

    //                     userProfileRef.update({
    //                         tagsAdded : true
    //                     })
    //                 }
    //             }
    //         )

            


    //     // if (isBack === true) {

    //     //     bookList.forEach((book) => {
    //     //         var myObject = {}

    //     //         const progress = book.bookProgress
    //     //         const content = book.contentTag
    //     //         const age = book.ageTag
    //     //         const theme = book.themeTag
    //     //         const name = book.title

    //     //         var myObject = { name: name, progress: progress, content: content, age: age, theme: theme }

    //     //         // bookList.forEach((myBook) => {
    //     //         //     if (myBook.name === myObject.name) {
    //     //         //         console.log(myBook.name, myObject.name)
    //     //         //         console.log(myObject.name, "is alreadt exist")
    //     //         //         //console.log(myBook.name, myObject.name)
    //     //         //     } else if ((myBook.name != myObject.name && 
    //     //         //         typeof (myBook.name) != 'undefined' &&
    //     //         //         typeof (myObject.name) != 'undefined')) {

    //     //         //         console.log(myBook.name, myObject.name)
    //     //         //         demoList.push(myObject)
    //     //         //         console.log(myObject.name, "have been pushed")
    //     //         //     }
    //     //         // })

    //     //         //demoList.push(myObject)
    //     //         //console.log(demoList)
    //     //     })
    //     // } else {
    //     //     console.log(isBack)
    //     // }
    // }, [isBack])


    //const pageText = "Mehmet, ailesi ile gemide yolculuk yaparken aniden fırtına çıkıyor ve kendilerini bir adada buluyorlar. Mehmet, uyandıgında kendisini kumsal bir bölgenin üstünde buluyor. İlk olarak ailesini bulmaya başlayan Mehmet, ilk önce babasını görüyor ve daha sonra da annesini buluyor. Mehmet ve ailesi iyi durumda fakat ne gemiden, ne de gemideki diğer yolculardan bir iz var. Sanki herkes yok olmuş gibi."
    const pageText2 = "Mehmet, ailesi ile gemide yolculuk yaparken aniden fırtına çıkıyor ve kendilerini bir adada buluyorlar."


    const bookContentRef = firebase.firestore().collection('storyBooks').doc(modalEntry.id).collection('bookContent')



    let contentText;
    const getBookContentData = async () => {
        bookContentRef
            .onSnapshot(
                querySnapshot => {
                    const bookContent = []
                    querySnapshot.forEach((doc) => {
                        const { images, pageBGColor, storyText } = doc.data()

                        contentText = storyText.split(" ");
                        contentText = contentText.filter((word) => {
                            if (word !== "") {
                                return true
                            }
                        });

                        let pagesRaw = [];
                        let currentPage = [];
                        let wordsRaw = [];
                        let wordsPerPage = 0;

                        switch (userPrefFontSize) {
                            case 16:
                            case 17:
                                wordsPerPage = 120
                                break
                            case 18:
                            case 19:
                                wordsPerPage = 110
                                break
                            case 20:
                            case 21:
                                wordsPerPage = 100
                                break
                            case 22:
                            case 23:
                                wordsPerPage = 90
                                break
                            case 24:
                                wordsPerPage = 85
                                break
                            default: wordsPerPage = 95
                                break
                        }



                        for (let i = 0; i < contentText.length; i++) {
                            currentPage.push(contentText[i]);
                            if ((currentPage.length >= wordsPerPage) && contentText[i].includes('.')) {
                                pagesRaw.push(currentPage);
                                wordsRaw.push(currentPage);
                                currentPage = [];
                            }
                        }
                        // wordsRaw[0].map((word) => {
                        //     console.log(word, 'page')
                        // })
                        setWords(wordsRaw);

                        let text = '';
                        for (let i = 0; i < pagesRaw.length; i++) {
                            for (let k = 0; k < pagesRaw[i].length; k++) {
                                text = text + ' ' + pagesRaw[i][k];
                            }
                            text = text.substring(1, text.length)
                            pagesRaw[i].storyText = text;

                            let imageIndex = Math.floor(i / (pagesRaw.length / images.length)) % images.length;
                            pagesRaw[i].image = images[imageIndex];

                            text = '';
                        }

                        setPages(pagesRaw);
                        bookContent.push({
                            images,
                            pageBGColor,
                            storyText,
                        })

                        setBookPageColor(pageBGColor)
                    })
                    setBookContent(bookContent)
                }
            )
    }

    // BUNU CONTEXTE AT ANA SAYFADA USEFFECT KULLANIP STATE KOYT
    // const userProfileRef = firebase.firestore()
    //     .collection('users').doc(firebase.auth().currentUser.uid)
    //     .collection('userProfiles');

    // const getProfileInformation = async () => {
    //     // console.log(bookContentRef.data())
    //     userProfileRef
    //         .onSnapshot(
    //             querySnapshot => {
    //                 const userInfo = []
    //                 querySnapshot.forEach((doc) => {
    //                     if (doc.id === currentProfileSelected) {
    //                         const { name, profileColor, profileIcon } = doc.data()

    //                         userInfo.push({
    //                             name,
    //                             profileColor,
    //                             profileIcon,
    //                         })
    //                     }
    //                 })
    //                 setUserInfo(userInfo)
    //             }
    //         )
    // }

    // useEffect(() => {
    //     getProfileInformation()
    //     console.log(userInfo)
    // }, [])

    useEffect(() => {
        loadUserView()
        getBookContentData()
        getFontLocalStorage()

    }, [])


    const speak = () => {
        //const thingToSay = 'Selma neden yaptın Selma. Kenan mı yaptırdı zorla Selma.';
        Speech.speak(pageText2, { language: 'tr', pitch: 1.2 });
    };

    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });

    const db = firebase.firestore()

    const handleCreateCollections = async () => {
        setReaded(!readed)
        // sub user's continueReading

        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
            .doc(currentProfileSelected).collection('continueReading').doc(modalEntry.id).set({
                //update it with update() function don't use set for everytime a progress achived
                progress: userBookProgress,
                bookRef: db.doc('storyBooks/' + modalEntry.id),
                favRef: db.doc('users/' + firebase.auth().currentUser.uid + '/userProfiles/' + currentProfileSelected + '/favoriteBooks/' + modalEntry.id)
            })
    }


    // const handleTagData = async () => {
    //     // sub user's tagData
    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
    //         .doc(currentProfileSelected).collection('tagData').doc('ageTagData').set({
    //             ageOf3to6Value: 0,
    //             ageOf6to9Value: 0,
    //             ageOf9to12Value: 0,
    //             ageOf12plusValue: 0
    //         })
    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
    //         .doc(currentProfileSelected).collection('tagData').doc('contentTagData').set({
    //             puzzleTagValue: 0,
    //             quizTagValue: 0
    //         })
    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
    //         .doc(currentProfileSelected).collection('tagData').doc('themeTagData').set({
    //             natureTagValue: 0,
    //             animalTagValue: 0,
    //             cityTagValue: 0,
    //             adventureTagValue: 0
    //         })
    // }


    let onScrollEnd = (e) => {
        let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / 410 + 0.5) + 1, 0), pages.length);
        const progressB = pageNumber / pages.length;
        setUserBookProgress(progressB)
    }

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


    // HANDLE TRANSLATE WORD
    // const handleTranslateWord = async (word) => {

    //     const url = 'https://api.mymemory.translated.net/get';

    //       const response = await axios.get(url, {
    //         params: {
    //           q: word,
    //           langpair: `tr|en`,
    //         },
    //       });

    //       console.log(word, ' -> ', response.data.responseData.translatedText)
    //       if (response.data && response.data.responseData && response.data.responseData.translatedText) {
    //         const translatedText = response.data.responseData.translatedText;
    //         // show on modal
    //         return translatedText;
    //       } else {
    //         throw new Error('Translation API response format is not as expected.');
    //       }

    // }

    return (

        <View style={[styles.container, { backgroundColor: bookPageColor }]} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />

            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}>
                    <View style={styles.center}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => { navigation.goBack(); setModalVisible(!modalVisible); setIsBack(true) }}>
                                <Octicons name="arrow-left" size={38} color="#000" style={styles.goBackIcon} />
                            </TouchableOpacity>

                            <Text style={[styles.headerText, {}]}>{modalEntry.title}</Text>

                            {isLoaded ?
                                <View style={styles.headerIconContainerStyle}>
                                    <Image source={require('../assets/images/icontest.png')} style={styles.headerIconStyle}></Image>
                                </View>
                                :
                                <Skeleton
                                    height={styles.headerIconContainerStyle.height}
                                    width={styles.headerIconContainerStyle.width}
                                    backgroundColor={colors.grayProgressBarBG}
                                    style={[{ borderRadius: styles.headerIconContainerStyle.borderRadius }]}

                                >
                                </Skeleton>
                            }


                        </View>

                        {/* 

                        {words[0].map((word, index) => {
                            return (
                                <TouchableOpacity key={index}>
                                    <Text onPress={() => console.log(word)}>{word}</Text>
                                </TouchableOpacity>
                            )
                        })} */}

                        {isLoaded ?
                            <FlatList
                                overScrollMode={'never'}
                                data={pages}                              
                                keyExtractor={(item) => item.id}
                                horizontal
                                pagingEnabled                               
                                showsHorizontalScrollIndicator={false}
                                // initialScrollIndex={Math.floor(0.3 * pages.length)} // 0.3ü databaseden progress olarak al
                                onMomentumScrollEnd={onScrollEnd}
                                ListFooterComponent={() => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', width: widthOfScreen}}><Text>İstatistikler ve Quiz/Bulmaca Başlatma Butonu</Text></View>}
                                renderItem={({ item, index }) => (                                   

                                    <View key={item.id} style={{ marginTop: 10, width: widthOfScreen }}>

                                        <View key={item.id} style={index != 0 ? { marginLeft: 30 } : { marginLeft: 30 }}>

                                            <BoxShadow setting={shadowOpt} >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={index != 0 ? styles.readingBookImage : styles.readingBookImageFirstItem}>
                                                </Image>
                                            </BoxShadow>
                                        </View>
                                        <View>
                                            {
                                                // Dışardaki Text i değiştirirsen error veriyor yusuf buranın görüntüsünü düzelt.
                                                <Text key={item.id} style={[styles.mainText, { fontSize: userPrefFontSize }]}> {words[index].map((word) => {
                                                    return (
                                                        <>
                                                            <Text onPress={() => Translator(word)}>{word}</Text>
                                                            <Text> </Text>
                                                        </>

                                                    )

                                                })}

                                                </Text>
                                                // words[index].map((word) => {
                                                //     console.log('page index', index)

                                                //     { console.log(word, 'oradaolacagiz') }
                                                //     <Text >{word}</Text>
                                                // })
                                            }
                                        </View>


                                 
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>

                                            <TouchableOpacity
                                                //onPress={speak}
                                                onPress={handleCreateCollections}
                                                activeOpacity={0.8}>
                                                <View style={styles.voiceOverButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>
                                                    <IonIcons name="md-volume-high" size={55} color={modalEntry.itemBorder} style={styles.voiceOverButtonImg} />
                                                </View>
                                            </TouchableOpacity>

                                            <Text style={styles.pageNumberText}>
                                                {index + 1} / {pages.length}
                                            </Text>
                                        </View>
                                    </View>

                                )}
                            />
                            :

                            <View>
                                <Skeleton
                                    height={styles.readingBookImage.height}
                                    width={styles.readingBookImage.width}
                                    backgroundColor={"#BBB"}
                                    style={[{ borderRadius: styles.readingBookImage.borderRadius }, { marginTop: 3 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 30 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    backgroundColor={"#BBB"}
                                    style={[{ marginTop: 7 }]}
                                />
                            </View>
                        }

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
    },

    readingBookImage: {
        borderRadius: 40,
        height: 250,
        width: 350,
    },

    readingBookImageFirstItem: {
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
        marginTop: 10,
        marginRight: 45,
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
        borderColor: colors.blueBorder,

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
        borderWidth: 4,
        alignItems: 'center'
    },

    voiceOverButtonImg: {
        marginTop: 6,
        marginLeft: -1

    },

    pageNumberText: {
        fontFamily: 'Comic-Light',
        fontSize: 18,
    }

})