import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Text } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';
import FlatlistSkeleton from '../skeletons/FlatlistSkeleton';

const RecommendedFlatList = () => {

    const { setModalVisible, setModalEntry, modalVisible } = useContext(ModalContext);
    const { currentProfileSelected, userBookProgress, favorited, readed } = useContext(ProfileContext);

    const [loaded, setLoaded] = useState(false);
    const [dummy, setDummy] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const myTimeOut = async () => {
        await sleep(1000);
        setLoaded(true)
        getRecommendedData();
    }

    const dummyTimeout = async () => {
        // await sleep(1100)
        setDummy(true)
    }

    useEffect(() => {
        myTimeOut()
    }, [])

    useEffect(() => {
        getRecommendedData()
    }, [loaded])

    useEffect(() => {
        getRecommendedData()
    }, [modalVisible])

    useEffect(() => {
        getRecommendedData()
    }, [readed])

    useEffect(() => {
        getRecommendedData()
    }, [favorited])

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


    const [bookList, setBookList] = useState([]);
    const [tagList, setTagList] = useState([]);

    let sortedAgeTags = []
    let sortedThemeTags = []


    const userTagDataRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('tagData');

    //console.log(tagList)

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

    const getRecommendedData = async () => {
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
                                    "3-6 Yaş": ageOf3to6Value,
                                    "6-9 Yaş": ageOf6to9Value,
                                    "9-12 Yaş": ageOf9to12Value,
                                    "12+ Yaş": ageOf12plusValue
                                })
                            } else if (doc.id === 'themeTagData') {
                                const { adventureTagValue, animalTagValue, cityTagValue, natureTagValue } = doc.data()
                                tagList.push({
                                    "Macera": adventureTagValue,
                                    "Hayvan": animalTagValue,
                                    "Şehir": cityTagValue,
                                    "Doğa": natureTagValue
                                })
                            }
                        })
                        setTagList(tagList)
                    }
                }
            )

        if (tagList.length > 1) {
            let keysSorted = []
            for (let i = 0; i < tagList.length; i++) {

                // sorting most common tag to least
                keysSorted[i] = Object.keys(tagList[i]).sort(function (a, b) { return tagList[i][b] - tagList[i][a] })

            }
            sortedAgeTags = keysSorted[0]
            sortedThemeTags = keysSorted[1]

            //console.log(sortedThemeTags)

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

                            for (let i = 0; i < 4; i++) {
                                for (let k = 0; k < 4; k++) {
                                    if (k - i >= 2) {
                                        continue;
                                    }
                                    else if (i - k >= 2) {
                                        continue;
                                    }

                                    let progress = typeof (progresses.find(id => id.id === doc.id)) == 'undefined' ? 0 : progresses.find(id => id.id === doc.id).progress;
                                    //console.log(themeTag, " + ", sortedThemeTags[k], ageTag, " + ",  sortedAgeTags[i], ageTag === sortedAgeTags[i] && themeTag === sortedThemeTags[k])
                                    if (progress === 0) {
                                        if (tagList[0][sortedAgeTags[i]] != 0 && tagList[1][sortedThemeTags[k]] != 0) {
                                            if (ageTag === sortedAgeTags[i] && themeTag === sortedThemeTags[k]) {
                                                //console.log(ageTag, "+", sortedAgeTags[i], "+" , themeTag, "+", sortedThemeTags[0])                                       
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
                                                    sortedAgeTagValue: tagList[0][sortedAgeTags[i]],
                                                    sortedThemeTagValue: tagList[1][sortedThemeTags[k]]
                                                })
                                            }
                                        }
                                    }
                                }
                            }

                        })
                        bookList.sort(function (a, b) { return b.sortedAgeTagValue - a.sortedAgeTagValue })
                        bookList.sort(function (a, b) { return b.sortedThemeTagValue - a.sortedThemeTagValue })
                        setBookList(bookList)
                        dummyTimeout()
                    }
                )
        }
    }

    // useEffect(() => {
    //     console.log("İLK")
    //     setTimeout(() => { getRecommendedData(); console.log("asd") }, 2000)
    //     setTimeout(() => {console.log(tagList)}, 2500)
    //     setTimeout(() => {console.log(bookList)}, 2500)
    //     console.log("İki")
    // }, [])

    // UseEffect Gariplik ilk açıldığında error.
    // useEffect(() => {
    //     myTimeOut()
    // }, [readed])

    // useEffect(() => {
    //     myTimeOut()
    // }, [favorited])



    return (
        <View>

            {dummy ?
                bookList.length == 0 && dummy ?
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

                                </TouchableOpacity>

                            </View>
                        )}

                    />
                :
                <FlatlistSkeleton />
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