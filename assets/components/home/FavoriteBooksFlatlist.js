import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Text } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';

const FavoriteBooksFlastlist = () => {

    const { setModalVisible, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected } = useContext(ProfileContext);

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

    // const getFavoritedData = async () => {


    // }

    useEffect(() => {
        favUserBookRef
            .onSnapshot(
                querySnapshot => {
                    const bookList = []
                    if (querySnapshot.empty) {
                        setBookList([])
                    } else {
                        querySnapshot.forEach((doc) => {
                            const favBookReading = doc.data()
                            favBookReading.bookRef.get()
                                .then(res => {
                                    favBookReading.bookData = res.data()
                                    favBookReading.bookData.id = res.id
                                    favBookReading.bookData.bookProgress = favBookReading.progress
                                    favBookReading.bookData.favorited = favBookReading.favorited
                                    bookList.push(favBookReading.bookData)
                                    setBookList(bookList)
                                })
                        })
                    }
                }
            )
    }, [])


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