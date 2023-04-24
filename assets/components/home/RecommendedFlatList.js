import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Text } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';

const RecommendedFlatList = () => {

    const { setModalVisible, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, userBookProgress, favorited, readed } = useContext(ProfileContext);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const myTimeOut = async () => {
        await sleep(1500)
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
    const [tagList, setTagList] = useState([]);


    const userTagDataRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('tagData');

    useEffect(() => {
        userTagDataRef
            .onSnapshot(
                querySnapshot => {
                    const tagList = []
                    if (querySnapshot.empty) {
                        setTagList([])
                    } else {
                        querySnapshot.forEach((doc) => {
                            if (doc.id === 'ageTagData') {
                                const { ageOf3to6Value, ageOf6to9Value, ageOf9to12Value, ageOf12plusValue } = doc.data()
                                tagList.push({
                                    ageOf3to6Value,
                                    ageOf6to9Value,
                                    ageOf9to12Value,
                                    ageOf12plusValue
                                })
                            } else if (doc.id === 'themeTagData') {
                                const { adventureTagValue, animalTagValue, cityTagValue, natureTagValue } = doc.data()
                                tagList.push({
                                    adventureTagValue,
                                    animalTagValue,
                                    cityTagValue,
                                    natureTagValue
                                })
                            }
                        })
                        setTagList(tagList)
                    }
                }
            )
    }, [readed])

    //console.log(tagList)

    let sortedAgeTags = []
    let sortedContentTags = []

    let keysSorted = []
    for (let i = 0; i < tagList.length; i++) {

        // sorting most common tag to least
        keysSorted[i] = Object.keys(tagList[i]).sort(function (a, b) { return tagList[i][b] - tagList[i][a] })



    }

    sortedAgeTags = keysSorted[0]
    sortedContentTags = keysSorted[1]


    const getFavoriteBooks = async () => {
        const userRef = firebase.firestore()
            .collection('users').doc(firebase.auth().currentUser.uid)
            .collection('userProfiles').doc(currentProfileSelected)
            .collection('favoriteBooks');

        const snapshot = await userRef.get();
        const favorites = new Set();
        snapshot.forEach(doc => favorites.add(doc.id));
        return favorites;
    };

    const getProgressOfBooks = async () => {
        const userRef = firebase.firestore()
            .collection('users').doc(firebase.auth().currentUser.uid)
            .collection('userProfiles').doc(currentProfileSelected)
            .collection('continueReading');

        const snapshot = await userRef.get();
        const progress = [];
        snapshot.forEach(doc => progress.push({ id: doc.id, progress: doc.data().progress }));
        return progress;
    };


    //const [bookList, setBookList] = React.useState([]);
    const todoRef = firebase.firestore().collection('storyBooks')

    const getNewBooksData = async () => {
        const favorites = await getFavoriteBooks();
        const progresses = await getProgressOfBooks();
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const bookList = []
                    querySnapshot.forEach((doc) => {
                        const {
                            ageTag, contentTag, dateAdded, image,
                            itemBorder, itemColor, itemColorBG, itemDesc, itemDescColor,
                            rewardTag, themeTag, title } = doc.data()

                        for (let i = 0; i < sortedAgeTags.length; i++) {
                            for (let k = 0; k < sortedContentTags.length; k++) {
                                if (k - i > 1) {
                                    i++;
                                    break;
                                }
                                console.log(i, k)

                            }
                        }

                        bookList.push({
                            id: doc.id,
                            favorited: favorites.has(doc.id),
                            bookProgress: typeof (progresses.find(id => id.id === doc.id)) == 'undefined' ? 0 : progresses.find(id => id.id === doc.id).progress,
                            ageTag,
                            contentTag,
                            dateAdded,
                            image,
                            itemBorder,
                            itemColor,
                            itemColorBG,
                            itemDesc,
                            itemDescColor,
                            rewardTag,
                            themeTag,
                            title,
                        })

                    })
                    setBookList(bookList)
                }
            )
    }




    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            if (k - i > 1) {
                break;
            }
            if (i - k > 2) {
                break;
            }
            console.log("tnew", i, k)

        }
    }



    return (
        <View>

            {bookList.length == 0 ?
                <View>
                    <Text>
                        DOTO : add Text
                    </Text>
                </View>
                :
                <FlatList
                    overScrollMode={'never'}
                    data={bookList}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyleFirstItem}>
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
            }
        </View>
    )
}

export default RecommendedFlatList

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