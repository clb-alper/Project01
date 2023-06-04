import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Dimensions, Text } from 'react-native';
import booksListData from '../../data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import { ModalContext } from '../../contexts/ModalContext';
import { firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';
import FeaturedFlatlistSkeleton from '../skeletons/FeaturedFlatlistSkeleton';

var widthOfScreen = Dimensions.get('window').width; //full width

const FeaturedFlatlist = () => {

    const { setModalVisible, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, favorited, readed, favoritedChange } = useContext(ProfileContext);



    const [dummy, setDummy] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const dummyTimeout = async () => {
        //await sleep(500)
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
    const todoRef = firebase.firestore().collection('storyBooks').orderBy("favoriteCount", "desc")

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
                            rewardTag, themeTag, title, itemTextColor } = doc.data()

                        if (bookList.length <= 4) {
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
                                itemTextColor
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
    }, [ , favoritedChange])

    // useEffect(() => {
    //     getNewBooksData()
    // }, [bookList])

    return (
        <View>
            {dummy ?
                bookList.length == 0 ?
                    <View>
                        <Text>
                            TODO : add information for empty featured flatlist
                        </Text>
                    </View> :
                    <FlatList
                        overScrollMode={'never'}
                        data={bookList}
                        renderItem={({ item, index }) => (
                            <View style={{ marginTop: 10 }}>

                                <ImageBackground
                                    source={{ uri: item.image }}
                                    imageStyle={styles.featuredBookBG}
                                    blurRadius={0.8}>
                                </ImageBackground>

                                <Text style={[styles.featuredBookTitle, { color: item.itemTextColor }]}>Öne Çıkan</Text>

                                <Text
                                    style={[styles.featuredBookDescription, { color: item.itemTextColor }]}
                                    adjustsFontSizeToFit={false}
                                    numberOfLines={8}>
                                    {item.itemDesc}
                                </Text>

                                <View borderColor={item.itemBorder} backgroundColor={item.itemColorBG} style={index != 0 ? styles.featuredBookStyle : styles.featuredBookStyleFirstItem}>

                                    <TouchableOpacity
                                        key={item.key}
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
                            </View>
                        )}

                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    />
                :
                <FeaturedFlatlistSkeleton />
            }
        </View>
    )
}

export default FeaturedFlatlist;

const styles = StyleSheet.create({

    featuredBookBG: {
        width: widthOfScreen,
        height: 210,
        borderRadius: 12,
        marginTop: 10
    },

    featuredBookTitle: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        zIndex: 1000,
        position: 'absolute',
        fontSize: 35,
        paddingTop: 25,
        paddingLeft: 20
    },

    featuredBookDescription: {
        fontFamily: 'Comic-Bold',
        zIndex: 1000,
        position: 'absolute',
        fontSize: 14,
        width: '63.5%',
        paddingTop: '28%',
        paddingLeft: 20
    },

    featuredBookStyle: {
        borderWidth: 4,
        alignItems: 'flex-end',
        width: widthOfScreen,
        height: 210,
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 18,
        paddingTop: 6.5
    },

    featuredBookStyleFirstItem: {
        borderWidth: 4,
        alignItems: 'flex-end',
        width: widthOfScreen,
        height: 210,
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 18,
        paddingTop: 6.5
    },

    continueBookImageStyle: {
        width: 113,
        height: 190,
        borderRadius: 12,
    },

})