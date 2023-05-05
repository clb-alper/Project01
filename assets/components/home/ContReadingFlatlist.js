import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Text } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';
import ContReadingFlatlistSkeleton from '../skeletons/ContReadingFlatlistSkeleton';

const ContReadingFlatlist = () => {

    const { setModalVisible, setModalEntry, modalVisible } = useContext(ModalContext);
    const { currentProfileSelected, userBookProgress, favorited, readed } = useContext(ProfileContext);
    const [dummy, setDummy] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const timeOutOfTags = async () => {
        await sleep(700)
        setDummy(true)
    }

    const shadowOpt = {
        width: 110,
        height: 183,
        color: "#000",
        border: 6,
        radius: 12,
        opacity: 0.2,
        x: -1.5,
        y: 7,
    }


    const [bookList, setBookList] = React.useState([]);
    const [contReadingBookList, setContReadingBookList] = useState([]);

    const contUserBookRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('continueReading');


    const userTagDataRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('tagData');

    const getContReadingData = async () => {
        contUserBookRef
            .onSnapshot(
                querySnapshot => {
                    const bookList = []
                    const contReadingBookList = [];
                    if (querySnapshot.empty) {
                        setBookList([])
                    } else {
                        querySnapshot.forEach((doc) => {
                            const contBookReading = doc.data()
                            contBookReading.bookRef.get()
                                .then(res => {
                                    contBookReading.bookData = res.data()
                                    firebase.firestore().collection('storyBooks').doc(doc.id).collection('bookContent').doc(doc.id).get().then((snapshot) => {
                                        if (snapshot.exists) {
                                            contBookReading.bookData.bookContent = snapshot.data()
                                        } else {
                                            console.log("snapshot not exist")
                                        }

                                    })
                                    contBookReading.bookData.id = res.id
                                    contBookReading.bookData.bookProgress = contBookReading.progress
                                    bookList.push(contBookReading.bookData)
                                    if (contBookReading.bookData.bookProgress != 1) {
                                        contReadingBookList.push(contBookReading.bookData)
                                    }


                                })
                            contBookReading.favRef.get()
                                .then(res => {
                                    if (res.exists) {
                                        contBookReading.bookData.favorited = res.data().favorited
                                        bookList.sort(function (a, b) { return b.bookProgress - a.bookProgress })
                                        contReadingBookList.sort(function (a, b) { return b.bookProgress - a.bookProgress })
                                        setBookList(bookList)
                                        setContReadingBookList(contReadingBookList)
                                    } else {
                                        bookList.sort(function (a, b) { return b.bookProgress - a.bookProgress })
                                        contReadingBookList.sort(function (a, b) { return b.bookProgress - a.bookProgress })
                                        setBookList(bookList)
                                        setContReadingBookList(contReadingBookList)

                                    }
                                })
                        })

                    }
                    timeOutOfTags()
                }
            )

    }

    useEffect(() => {
        getContReadingData()
    }, [])

    useEffect(() => {
        getContReadingData()
    }, [readed])

    useEffect(() => {
        getContReadingData()
    }, [favorited])


    useEffect(() => {
        if (dummy) {
            handleTagDataOfConts()
            handleStatistics()
        }
    }, [modalVisible])

    useEffect(() => {
        if (dummy) {
            handleTagDataOfConts()
            handleStatistics()
        }
    }, [readed])

    let age3to6Value = 0;
    let age6to9Value = 0;
    let age9to12Value = 0;
    let age12PlusValue = 0;

    let adventureValue = 0;
    let animalValue = 0;
    let natureValue = 0;
    let cityValue = 0;

    bookList.forEach(element => {
        if (element.ageTag === "3-6 Yaş") {
            age3to6Value += element.bookProgress;
        } else if (element.ageTag === "6-9 Yaş") {
            age6to9Value += element.bookProgress;
        } else if (element.ageTag === "9-12 Yaş") {
            age9to12Value += element.bookProgress;
        } else if (element.ageTag === "12+ Yaş") {
            age12PlusValue += element.bookProgress;
        }
    });

    bookList.forEach(element => {
        if (element.themeTag === "Macera") {
            adventureValue += element.bookProgress;
        } else if (element.themeTag === "Hayvan") {
            animalValue += element.bookProgress;
        } else if (element.themeTag === "Doğa") {
            natureValue += element.bookProgress;
        } else if (element.themeTag === "Şehir") {
            cityValue += element.bookProgress;
        }
    });

    const TagDataObj = {
        ageTags: {
            age3to6Value,
            age6to9Value,
            age9to12Value,
            age12PlusValue,
        },
        contentTags: {
            adventureValue,
            animalValue,
            natureValue,
            cityValue
        }
    }

    const handleTagDataOfConts = () => {

        // sub user's tagData
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
            .doc(currentProfileSelected).collection('tagData').doc('ageTagData').set({
                ageOf3to6Value: TagDataObj.ageTags.age3to6Value,
                ageOf6to9Value: TagDataObj.ageTags.age6to9Value,
                ageOf9to12Value: TagDataObj.ageTags.age9to12Value,
                ageOf12plusValue: TagDataObj.ageTags.age12PlusValue
            })
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
            .doc(currentProfileSelected).collection('tagData').doc('themeTagData').set({
                natureTagValue: TagDataObj.contentTags.natureValue,
                animalTagValue: TagDataObj.contentTags.animalValue,
                cityTagValue: TagDataObj.contentTags.cityValue,
                adventureTagValue: TagDataObj.contentTags.adventureValue
            })
    }

    let readedBooks = 0;
    let readedWords = 0;

    bookList.forEach(element => {
        if (element.bookProgress === 1.0) {
            readedBooks = readedBooks + 1;
        }
        if (typeof (element.bookContent) != 'undefined') {
            let words = element.bookContent.storyText.split(" ").length
            readedWords = Math.floor(readedWords + element.bookProgress * words)
        }
    });

    const handleStatistics = () => {

        // sub user's tagData
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
            .doc(currentProfileSelected).collection('statisticsData').doc('statsData').update({
                readedBooks: readedBooks,
                readedWords: readedWords,
            })
    }


    return (
        <View>

            {dummy ?
                contReadingBookList.length === 0 ?
                    <View>
                        <Text>
                            DOTO : add Text
                        </Text>
                    </View>
                    :
                    <FlatList
                        overScrollMode={'never'}
                        data={contReadingBookList}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (


                            < View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyleFirstItem} >
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => { setModalVisible(true); setModalEntry(item); }}
                                    activeOpacity={0.75}>

                                    <BoxShadow setting={shadowOpt}>
                                        <ImageBackground
                                            source={{ uri: item.image }}
                                            imageStyle={styles.continueBookImageStyle}>
                                        </ImageBackground>
                                    </BoxShadow>

                                    <Progress.Bar style={styles.progressBar} color={item.itemColor} progress={item.bookProgress} width={112} />

                                </TouchableOpacity>

                            </View>

                        )}


                    />
                :
                <ContReadingFlatlistSkeleton />
            }
        </View >
    )
}

export default ContReadingFlatlist

const styles = StyleSheet.create({

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

    continueBookImageStyle: {
        width: 113,
        height: 190,
        borderRadius: 12,
    },

    progressBar: {
        marginTop: 17,
        backgroundColor: colors.grayProgressBarBG,
        borderColor: colors.grayProgressBarBorder,
        borderWidth: 0.7,
    },
})