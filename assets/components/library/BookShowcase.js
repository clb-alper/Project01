import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { LibraryContext } from '../../contexts/LibraryContext';
import { ModalContext } from '../../contexts/ModalContext';
import { firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';

const BookShowcase = () => {

    const { setDATA, sortedData, setSortedData, categorySwitch, bookWidth, } = useContext(LibraryContext);
    const { setModalVisible, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, favorited, readed } = useContext(ProfileContext)


    const shadowOpt = {
        width: 95,
        height: 165,
        color: "#000",
        border: 6,
        radius: 12,
        opacity: 0.2,
        x: -2,
        y: 7,
    }

    const indexingBooks = (booksListData) => {

        const DATA = [];

        const dataLetters = [];

        for (let i = 0; i < booksListData.length; i++) {

            const index = dataLetters.findIndex((letter) => letter == booksListData[i].title.substring(0, 1));

            if (index > -1) {
                DATA[index].books.push(booksListData[i]);
            }
            else {
                dataLetters.push(booksListData[i].title.substring(0, 1))
                DATA.push({
                    condition: booksListData[i].title.substring(0, 1),
                    books: [{
                        id: booksListData[i].id,
                        title: booksListData[i].title,
                        image: booksListData[i].image,
                        itemColor: booksListData[i].itemColor,
                        itemBorder: booksListData[i].itemBorder,
                        itemColorBG: booksListData[i].itemColorBG,
                        itemTextColor: booksListData[i].itemTextColor,
                        itemDesc: booksListData[i].itemDesc,
                        favorited: booksListData[i].favorited,
                        bookProgress: booksListData[i].bookProgress,
                        themeTag: booksListData[i].themeTag,
                        ageTag: booksListData[i].ageTag,
                        contentTag: booksListData[i].contentTag,
                        rewardTag: booksListData[i].rewardTag,
                    }]
                })
            }
        }
        return DATA

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


    const todoRef = firebase.firestore().collection('storyBooks');



    const getLibraryBooks = async () => {
        const favorites = await getFavoriteBooks();
        const progresses = await getProgressOfBooks();

        todoRef
            .onSnapshot(
                querySnapshot => {
                    const bookList2 = []
                    querySnapshot.forEach((doc) => {
                        const { ageTag, contentTag, image, itemBorder, itemColor, itemColorBG,
                            itemDesc, itemDescColor, rewardTag, themeTag, title } = doc.data()
                        bookList2.push({
                            id: doc.id,
                            ageTag,
                            contentTag,
                            favorited: favorites.has(doc.id),
                            bookProgress: progresses.find((index) => index.id === doc.id) ? progresses.find((index) => index.id === doc.id).progress : 0,
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
                    const indexedBooks = indexingBooks(bookList2);
                    setDATA(indexedBooks);
                    setSortedData(indexedBooks);

                }
            )
    }

    useEffect(() => {
        getLibraryBooks()
    }, [])

    useEffect(() => {
        getLibraryBooks()
    }, [favorited])

    useEffect(() => {
        getLibraryBooks()
    }, [readed])



    return (
        typeof (sortedData) == 'undefined' ? null :

            <View style={{ flexWrap: 'wrap', marginTop: 30, marginLeft: 10 }}>
                {/* <BookModal />  */}



                {
                    categorySwitch === 0 && (   
                        sortedData.map((book, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.alphabetLettersStyle2}>{book.condition}</Text>

                                    <View style={styles.bookContainer} key={index}>
                                        {
                                            book.books.map((bookDetail, index2) => {
                                                return (
                                                    <View key={bookDetail.id} style={{ ...styles.bookContainer, width: bookWidth }}>

                                                        <TouchableOpacity
                                                            key={index2}
                                                            onPress={() => { setModalVisible(true); setModalEntry(bookDetail); }}
                                                            activeOpacity={0.75}>
                                                            <BoxShadow setting={shadowOpt}>
                                                                <ImageBackground
                                                                    source={{ uri: bookDetail.image }}
                                                                    imageStyle={styles.bookCoverStyle}>
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
                    )

                }
                {
                    categorySwitch === 1 && (
                        sortedData.map((book, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.alphabetLettersStyle2}>{book.condition}</Text>

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
                                                                    source={{ uri: bookDetail.image }}
                                                                    imageStyle={styles.bookCoverStyle}>
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
                    )

                }
                {
                    categorySwitch === 2 && (
                        sortedData.map((book, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.alphabetLettersStyle2}>{book.condition}</Text>

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
                                                                    source={{ uri: bookDetail.image }}
                                                                    imageStyle={styles.bookCoverStyle}>
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
                    )

                }
                {
                    categorySwitch === 3 && (
                        sortedData.map((book, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.alphabetLettersStyle2}>{book.condition}</Text>

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
                                                                    source={{ uri: bookDetail.image }}
                                                                    imageStyle={styles.bookCoverStyle}>
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
                    )

                }



            </View>

    )

}

export default BookShowcase;

const styles = StyleSheet.create({
    alphabetLettersStyle2: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        marginBottom: 15

    },

    bookContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },

    bookCoverStyle: {
        width: 100,
        height: 170,
        borderRadius: 12,
    },
})