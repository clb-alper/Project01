import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';

const NewBooksFlatlist = () => {

    const { setModalVisible, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected } = useContext(ProfileContext);



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


    const [bookList, setBookList] = React.useState([]);
    const todoRef = firebase.firestore().collection('storyBooks')

    const contUserBookRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('newBooks');

    // useEffect(() => {
    //     contUserBookRef
    //         .onSnapshot(
    //             querySnapshot => {
    //                 const bookList = []
    //                 querySnapshot.forEach((doc) => {
    //                     const contBookReading = doc.data()
    //                     contBookReading.bookRef.get()


    //                         .then(res => {
    //                            // if (contBookReading.bookData.dateAdded)

    //                             contBookReading.bookData = res.data()
    //                             contBookReading.bookData.id = res.id
    //                             bookList.push(contBookReading.bookData)
    //                             setBookList(bookList)       
    //                             console.log(contBookReading.bookData.dateAdded)                
    //                         })
    //                 })
    //             }
    //         )
    // }, [])

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const bookList = []
                    querySnapshot.forEach((doc) => {
                        const { ageTag, bookProgress, contentTag, dateAdded, image, itemBorder, itemColor, itemColorBG, itemDesc, itemDescColor, rewardTag, themeTag, title } = doc.data()
                        if (doc.id) { }

                        const givenDate = new Date(dateAdded.toDate());

                        if (isWithinLast7Days(givenDate)) {
                            bookList.push({
                                id: doc.id,
                                ageTag,
                                bookProgress,
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
                }
            )
    }, [])



    return (
        <View>
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

                            <Progress.Bar style={styles.progressBar} color={item.itemColor} progress={item.bookProgress} width={112} />

                        </TouchableOpacity>

                    </View>
                )}

            />
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