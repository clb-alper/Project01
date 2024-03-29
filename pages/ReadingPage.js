import { StatusBar } from 'expo-status-bar';
import React, { useContext, useCallback, useEffect, useState, useRef } from 'react';
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
import Skeleton from '../assets/components/skeletons/Skeleton';
import { Translator } from '../assets/components/Translator';
import TranslationModal from '../assets/components/TranslationModal';
import { BackHandler } from 'react-native';

const widthOfScreen = Dimensions.get('window').width
const heightOfScreen = Dimensions.get('window').height

const ReadingPage = () => {

    const { setModalVisible, modalVisible, modalEntry, setTranslationModalVisible, setTranslationModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, userBookProgress, setUserBookProgress, readed, setReaded, userPrefFontSize, getFontLocalStorage, bookProgressDB, setBookProgressDB, currentProfileSelectedInfo, profileIconList } = useContext(ProfileContext);

    const [bookContent, setBookContent] = useState([]);
    const [bookPageColor, setBookPageColor] = useState();
    const [pages, setPages] = useState([]);
    const [words, setWords] = useState([]);
    const [totalWordCount, setTotalWordCount] = useState(0);

    const [flRef, setFlRef] = useState();

    //const [userInfo, setUserInfo] = useState([]);

    const [isBack, setIsBack] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const [speechState, setSpeechState] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const loadUserView = async () => {
        await sleep(3000)
        setIsLoaded(true)
    }

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
                        let counter = 0;
                        for (let i = 0; i < pagesRaw.length; i++) {
                            for (let k = 0; k < pagesRaw[i].length; k++) {
                                text = text + ' ' + pagesRaw[i][k];
                            }

                            counter = counter + pagesRaw[i].length

                            text = text.substring(1, text.length)
                            pagesRaw[i].storyText = text;

                            let imageIndex = Math.floor(i / (pagesRaw.length / images.length)) % images.length;
                            pagesRaw[i].image = images[imageIndex];

                            pagesRaw[i].id = i;

                            text = '';
                        }

                        setTotalWordCount(counter)
                        setPages(pagesRaw);
                        bookContent.push({
                            images,
                            pageBGColor,
                            storyText,
                        })

                        setBookPageColor(pageBGColor)
                    })
                    setBookContent(bookContent)
                    loadUserView()
                }
            )
    }

    const bookProgressRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
        .doc(currentProfileSelected).collection('continueReading')

    const getBookProgressData = async () => {

        bookProgressRef.doc(modalEntry.id).get().then((doc) => {
            if (!doc.exists) {
                setBookProgressDB(0.0)
            }
            else {
                const { progress } = doc.data()
                setBookProgressDB(progress)
            }
        })
    }

    useEffect(() => {
        getBookContentData()
        getFontLocalStorage()
        getBookProgressData()
    }, [])

    // useEffect(() => {

    //     if (isLoaded) {
    //         const a = () => {
    //             flRef?.scrollTo({ index: 2, animated: true });
    //         }
    //         setTimeout(a, 1000)
    //         console.log(flRef)
    //     }
    //     else {
    //         console.log(isLoaded)
    //     }
    // }, [isLoaded === true])


    const speak = (pageTextToSpeech) => {
        //const thingToSay = 'Selma neden yaptın Selma. Kenan mı yaptırdı zorla Selma.';    
        Speech.speak(pageTextToSpeech, { language: 'tr', pitch: 1.2, onDone: stopSpeech() });
    };

    const stopSpeech = () => {
        Speech.stop()
    }

    const navigation = useNavigation();

    // Disabling the back press button of the phone
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    }, [])

    const handleBackButtonClick = () => {
        // stopSpeech();
        // navigation.goBack();
        // setModalVisible(!modalVisible);
        // setIsBack(true)
        return true;
    };

    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });

    const db = firebase.firestore()

    const handleCreateCollections = async () => {
        setReaded(!readed)
        // sub user's continueReading

        // Küçüktürse checki de ekle current progress dbdekinden, sadece ilerleme olayı için
        if (bookProgressDB < 1.0) {
            if (bookProgressDB < userBookProgress) {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
                    .doc(currentProfileSelected).collection('continueReading').doc(modalEntry.id).set({
                        progress: userBookProgress,
                        bookRef: db.doc('storyBooks/' + modalEntry.id),
                        favRef: db.doc('users/' + firebase.auth().currentUser.uid + '/userProfiles/' + currentProfileSelected + '/favoriteBooks/' + modalEntry.id)
                    })
            }
        }
    }

    const handleGoBack = () => {
        handleCreateCollections();
        navigation.goBack();
        setModalVisible(!modalVisible);
        setIsBack(true)
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }





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

    return (

        <View style={[styles.container, { backgroundColor: modalEntry.itemPageBGColor }]} onLayout={onLayoutRootView}>
            <TranslationModal />
            <StatusBar style="auto" />

            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}>
                    <View style={styles.center}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={handleGoBack}>
                                <Octicons name="arrow-left" size={38} color="#000" style={styles.goBackIcon} />
                            </TouchableOpacity>

                            <Text
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}
                                style={[styles.headerText, {}]}>
                                {modalEntry.title}
                            </Text>

                            {isLoaded ?
                                <View style={styles.headerIconContainerStyle} backgroundColor={currentProfileSelectedInfo[0].profileColor["regularColor"]} borderColor={currentProfileSelectedInfo[0].profileColor["borderColor"]}>
                                    <Image source={{ uri: profileIconList[currentProfileSelectedInfo[0].profileIcon]["image"] }} style={[styles.headerIconStyle, { tintColor: currentProfileSelectedInfo[0].profileColor["borderColor"] }]}></Image>
                                </View>
                                :
                                <Skeleton
                                    height={styles.headerIconContainerStyle.height}
                                    width={styles.headerIconContainerStyle.width}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1100}
                                    backgroundColor={'rgba(0,0,0,0.20)'}
                                    style={[{ borderRadius: styles.headerIconContainerStyle.borderRadius }]}

                                >
                                </Skeleton>
                            }


                        </View>

                        {isLoaded ?
                            <FlatList
                                ref={(ref) => { setFlRef(ref) }}
                                overScrollMode={'never'}
                                data={pages}
                                //keyExtractor={(item) => {item.id}}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={10}
                                initialScrollIndex={Math.floor(bookProgressDB * pages.length) - 1} // 0.3ü databaseden progress olarak al
                                getItemLayout={(_, index) => ({
                                    length: widthOfScreen,
                                    offset: widthOfScreen * (index),
                                    index,
                                })}
                                onScrollToIndexFailed={info => {
                                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                                    wait.then(() => {
                                        flRef.current?.scrollToIndex({ index: info.index, animated: true });
                                    });
                                }}
                                onMomentumScrollEnd={onScrollEnd}
                                ListFooterComponent={() =>
                                    <View style={{ flex: 1, alignItems: 'center', height: heightOfScreen, width: widthOfScreen }}>
                                        <View style={[styles.bookStatisticsContainer, { backgroundColor: modalEntry.itemColor, borderColor: modalEntry.itemBorder }]}>
                                            <Text style={styles.bookStatisticsContainerHeader}>Kitap Istatistikleri</Text>
                                            <Text style={styles.bookStatisticsInsideTextStyle}>Okunulan Sayfa Sayısı: {pages.length}</Text>
                                            <Text style={styles.bookStatisticsInsideTextStyle}>Okunulan Kelime Sayısı: {totalWordCount}</Text>
                                            <Text style={[styles.bookStatisticsInsideTextStyle, { marginBottom: 15 }]}>Kazanılan Yıldız Puanı: {modalEntry.rewardTag}</Text>
                                        </View>


                                        <View style={[styles.bookStatisticsContainer, { backgroundColor: modalEntry.itemColor, borderColor: modalEntry.itemBorder }]}>
                                            <Text style={styles.bookStatisticsContainerHeader}>Rozet Ilerlemeleri</Text>

                                            <Text style={styles.bookStatisticsInsideTextStyle}>
                                                {modalEntry.themeTag === 'Macera' ? 'Maceraperest: +1' :
                                                    modalEntry.themeTag === 'Hayvan' ? 'Hayvan Sever: +1' :
                                                        'Tema: +1'}
                                            </Text>
                                            <Text style={styles.bookStatisticsInsideTextStyle}>Kitap Seven: +1</Text>
                                            <Text style={styles.bookStatisticsInsideTextStyle}>Kelime Kurdu: +{totalWordCount}</Text>
                                            <Text style={[styles.bookStatisticsInsideTextStyle, { marginBottom: 15 }]}>Puan Toplayan: +{modalEntry.rewardTag}</Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => { modalEntry.contentTag === 'Quizli' ? navigation.navigate('QuizPage') : navigation.navigate('PuzzlePage') }}
                                            activeOpacity={0.8}>
                                            <View style={[styles.startContentButton, { backgroundColor: modalEntry.itemColor, borderColor: modalEntry.itemBorder }]}>
                                                <Text style={[styles.bookStatisticsInsideTextStyle, { fontSize: 27 }]}>
                                                    {modalEntry.contentTag === 'Quizli' ? "Quizi'i Başlat" : "Bulmacayı Başlat"}
                                                </Text>
                                                <IonIcons name="play" size={33} style={{ marginLeft: 4 }} />
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                }
                                renderItem={({ item, index }) => (

                                    <View key={item.id} style={{ marginTop: 10, width: widthOfScreen }}>
                                        <View style={index != 0 ? { marginLeft: 30 } : { marginLeft: 30 }}>

                                            <BoxShadow setting={shadowOpt} >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={index != 0 ? styles.readingBookImage : styles.readingBookImageFirstItem}>
                                                </Image>
                                            </BoxShadow>
                                        </View>
                                        <View>
                                            {
                                                <Text style={[styles.mainText, { fontSize: userPrefFontSize }]}>
                                                    {typeof (words[index]) != 'undefined' ? words[index].map((word, i) => {
                                                        return (
                                                            <Text key={word + i}>
                                                                <Text onPress={async () => { setTranslationModalVisible(true); setTranslationModalEntry({ trTranslation: word, engTranslation: await Translator(word.toLowerCase()) }); }}>{word}</Text>
                                                                <Text> </Text>
                                                            </Text>

                                                        )

                                                    })
                                                        :
                                                        null
                                                    }

                                                </Text>
                                            }
                                        </View>



                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>

                                            {speechState === false ?
                                                <TouchableOpacity
                                                    //onPress={speak}
                                                    onPress={() => { setSpeechState(true); speak(pages[index].storyText); }}
                                                    activeOpacity={0.8}>
                                                    <View style={styles.voiceOverButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>

                                                        <IonIcons name="md-volume-high" size={55} color={modalEntry.itemBorder} style={styles.voiceOverButtonImg} />
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                null
                                            }

                                            {speechState === true ?
                                                <TouchableOpacity
                                                    //onPress={speak}
                                                    onPress={() => { setSpeechState(false); stopSpeech(); }}
                                                    activeOpacity={0.8}>
                                                    <View style={styles.voiceOverButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>
                                                        <IonIcons name="stop" size={55} color={modalEntry.itemBorder} style={[styles.voiceOverButtonImg, { marginLeft: 3, marginTop: 7 }]} />
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                null
                                            }

                                            <Text style={styles.pageNumberText}>
                                                {index + 1} / {pages.length}
                                            </Text>
                                        </View>
                                    </View>

                                )}
                            />
                            :

                            <View key={1}>
                                <Skeleton
                                    height={styles.readingBookImage.height}
                                    width={styles.readingBookImage.width}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ borderRadius: styles.readingBookImage.borderRadius }, { marginTop: 3 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ marginTop: 30 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
                                    style={[{ marginTop: 7 }]}
                                />
                                <Skeleton
                                    height={userPrefFontSize}
                                    width={widthOfScreen * 0.85}
                                    lHeight={'100%'}
                                    lWidth={'200%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.15)'}
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
        width: widthOfScreen * 0.8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        marginTop: 15,
        marginBottom: 20,
        width: 220,
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },

    goBackIcon: {
        //resizeMode: 'contain',
        justifyContent: 'center',
    },

    headerIconContainerStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 4,
    },

    headerIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        marginLeft: 7,
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
    },

    bookStatisticsContainer: {
        marginTop: 25,
        width: widthOfScreen * 0.8,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: colors.yellowBorder,
    },

    bookStatisticsContainerHeader: {
        fontSize: 32,
        fontFamily: 'Comic-Regular',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        //marginLeft: 10
    },

    bookStatisticsInsideTextStyle: {
        fontSize: 22.5,
        fontFamily: 'Comic-Regular',
        marginLeft: 12,
        marginBottom: 5
    },

    startContentButton: {
        marginTop: 25,
        width: widthOfScreen * 0.8,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },




})