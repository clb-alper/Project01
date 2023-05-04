import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';
import FlatlistSkeleton from '../skeletons/FlatlistSkeleton';

const NewBooksFlatlist = () => {

    const { setModalVisible, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, favorited, readed } = useContext(ProfileContext);

    const [dummy, setDummy] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const dummyTimeout = async () => {
        // await sleep(1100)
        setDummy(true)
    }

    const isWithinLast7Days = (date) => {
        const now = new Date();
        const diffInMilliseconds = now - date;
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        return diffInDays <= 7;
    };


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


    const [bookList, setBookList] = React.useState([]);
    const todoRef = firebase.firestore().collection('storyBooks').orderBy("dateAdded", "desc")

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

                        const givenDate = new Date(dateAdded.toDate());

                        if (isWithinLast7Days(givenDate)) {
                            //console.log(progresses.find(id => id.id === doc.id).progress)
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
                        }
                    })
                    setBookList(bookList)
                    dummyTimeout()
                }
            )
    }

    useEffect(() => {
        getNewBooksData()
    }, [favorited])

    useEffect(() => {
        getNewBooksData()
    }, [readed])

    return (
        <View>
            {dummy ?
                <FlatList
                    overScrollMode={'never'}
                    data={bookList}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={index != 0 ? styles.newBookStyle : styles.newBookStyleFirstItem}>
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => { setModalVisible(true); setModalEntry(item); }}
                                activeOpacity={0.75}>

                                <BoxShadow setting={shadowOpt}>
                                    <ImageBackground
                                        source={{ uri: item.image }}
                                        imageStyle={styles.newBookImageStyle}>
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

export default NewBooksFlatlist

const styles = StyleSheet.create({

    newBookStyle: {
        width: 123,
        height: 200,
        marginTop: 10,
        marginRight: 15,
        marginBottom: 15
    },

    newBookStyleFirstItem: {
        width: 123,
        height: 210,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 25
    },

    newBookImageStyle: {
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