import { StatusBar } from 'expo-status-bar';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, VirtualizedList } from 'react-native';
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


const ReadingPage = () => {

    const { setModalVisible, modalVisible, modalEntry } = useContext(ModalContext);
    const { currentProfileSelected, userBookProgress, setUserBookProgress, readed, setReaded } = useContext(ProfileContext);

    const [bookContent, setBookContent] = useState([]);
    const [bookPageColor, setBookPageColor] = useState();

    const [userInfo, setUserInfo] = useState([]);

    const [isBack, setIsBack] = useState(false);


    // const userProfileRef = firebase.firestore()
    //     .collection('users').doc(firebase.auth().currentUser.uid)
    //     .collection('userProfiles').doc(currentProfileSelected);


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

    const dummyText = [
        {
            id: 1,
            bookText: "Mehmet, ailesi ile gemide yolculuk yaparken aniden fırtına çıkıyor ve kendilerini bir adada buluyorlar. Mehmet, uyandıgında kendisini kumsal bir bölgenin üstünde buluyor. İlk olarak ailesini bulmaya başlayan Mehmet, ilk önce babasını görüyor ve daha sonra da annesini buluyor. Mehmet ve ailesi iyi durumda fakat ne gemiden, ne de gemideki diğer yolculardan bir iz var. Sanki herkes yok olmuş gibi."
        },
        {
            id: 2,
            bookText: "MEHMET 2"
        },
        {
            id: 3,
            bookText: "MEHMET 3"
        },
        {
            id: 4,
            bookText: "MEHMET 4"
        },
    ]

    const bookContentRef = firebase.firestore().collection('storyBooks').doc(modalEntry.id).collection('bookContent')

    const getBookContentData = async () => {
        bookContentRef
            .onSnapshot(
                querySnapshot => {
                    const bookContent = []
                    querySnapshot.forEach((doc) => {
                        const { images, pageBGColor, storyText } = doc.data()

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
        getBookContentData()
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
        let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / 410 + 0.5) + 1, 0), dummyText.length);
        const progressB = pageNumber / dummyText.length;
        setUserBookProgress(progressB)
        console.log(progressB);
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

                            <View style={styles.headerIconContainerStyle}>
                                <Image source={require('../assets/images/icontest.png')} style={styles.headerIconStyle}></Image>
                            </View>
                        </View>

                        <FlatList
                            overScrollMode={'never'}
                            data={bookContent}
                            keyExtractor={(item) => item.id}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={onScrollEnd}
                            renderItem={({ item, index }) => (
                                <>
                                    <View style={{ marginTop: 10, width: 410 }}>

                                        <View style={index != 0 ? { marginLeft: 30 } : { marginLeft: 30 }}>

                                            <BoxShadow setting={shadowOpt} >
                                                <Image
                                                    source={{ uri: item.images[0] }}
                                                    style={index != 0 ? styles.readingBookImage : styles.readingBookImageFirstItem}>
                                                </Image>
                                            </BoxShadow>
                                        </View>

                                        <Text style={styles.mainText}>
                                            {item.storyText}
                                        </Text>
                                    </View>
                                </>
                            )}
                        />

                        <TouchableOpacity
                            //onPress={speak}
                            onPress={handleCreateCollections}
                            activeOpacity={0.8}>
                            <View style={styles.voiceOverButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>
                                <IonIcons name="md-volume-high" size={55} color={modalEntry.itemBorder} style={styles.voiceOverButtonImg} />
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
        fontSize: 20,
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
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center'
    },

    voiceOverButtonImg: {
        marginTop: 6,
        marginLeft: -1

    },

    pageNumberText: {
        fontFamily: 'Comic-Light',
        fontSize: 18,
        marginBottom: 15
    }

})