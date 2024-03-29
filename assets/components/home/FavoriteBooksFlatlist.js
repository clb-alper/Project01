import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';
import FlatlistSkeleton from '../skeletons/FlatlistSkeleton';

const FavoriteBooksFlastlist = () => {

    const { setModalVisible, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, readed, favorited } = useContext(ProfileContext);

    const [dummy, setDummy] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const timeOutOfTags = async () => {
        await sleep(50).then(() => setDummy(true))
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

    const favUserBookRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('favoriteBooks');

    const getFavData = () => {
        favUserBookRef
            .onSnapshot(
                querySnapshot => {
                    const bookList = []
                    if (querySnapshot.empty) {
                        setBookList([])
                        timeOutOfTags()
                    } else {
                        querySnapshot.forEach((doc) => {
                            const favBookReading = doc.data()
                            favBookReading.bookRef.get()
                                .then(res => {
                                    try {
                                        favBookReading.bookData = res.data()
                                        favBookReading.bookData.id = res.id
                                        favBookReading.bookData.favorited = favBookReading.favorited
                                        bookList.push(favBookReading.bookData)
                                    }
                                    catch (e) {
                                        console.log(e)
                                    }

                                })
                            favBookReading.contRef.get()
                                .then(res => {
                                    if (res.exists) {
                                        typeof (favBookReading) === 'undefined' ? null : favBookReading.bookData.bookProgress = res.data().progress,
                                            // Alfabeye göre sıralama
                                            bookList.sort(function (a, b) {
                                                if (a.title < b.title) {
                                                    return -1;
                                                }
                                                if (a.title > b.title) {
                                                    return 1;
                                                }
                                                return 0;
                                            });
                                        setBookList(bookList)
                                    } else {
                                        bookList.sort(function (a, b) {
                                            if (a.title < b.title) {
                                                return -1;
                                            }
                                            if (a.title > b.title) {
                                                return 1;
                                            }
                                            return 0;
                                        });
                                        setBookList(bookList)
                                        timeOutOfTags()
                                    }
                                })
                        })
                    }
                }
            )
    }

    useEffect(() => {
        getFavData()
    }, [favorited])

    useEffect(() => {
        getFavData()
    }, [readed])

    return (
        <View>
            {dummy || bookList.length > 0 ?
                bookList.length == 0 ?
                    <Image
                        style={styles.emptySectionImageStyle}
                        source={require('../../images/emptyFlImage.png')}
                    />
                    :
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

export default FavoriteBooksFlastlist

const styles = StyleSheet.create({

    newBookStyle: {
        width: 123,
        height: 200,
        marginTop: 10,
        marginRight: 15,
        marginBottom: 10
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

    emptySectionImageStyle: {
        height: 145,
        width: 145,
        alignSelf: 'center',
    },

})