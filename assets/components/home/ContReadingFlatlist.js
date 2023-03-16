import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';
import { auth, firebase } from '../../../firebase'

const ContReadingFlatlist = () => {

    const { setModalVisible, setModalEntry } = useContext(ModalContext);

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
    const todoRef = firebase.firestore().collection('storyBooks');

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const bookList = []
                    querySnapshot.forEach((doc) => {
                        const { ageTag, bookProgress, contentTag, image, itemBorder, itemColor, itemColorBG, itemDesc, itemDescColor, rewardTag, themeTag, title } = doc.data()
                        bookList.push({
                            id: doc.id,
                            ageTag,
                            bookProgress,
                            contentTag,
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
                    console.log(bookList)
                }
            )
    }, [])






    return (
        <View>
            <FlatList
                overScrollMode={'never'}
                data={bookList}
                renderItem={({ item, index }) => (
                    <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyleFirstItem}>
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => { setModalVisible(true); setModalEntry(item); }}
                            activeOpacity={0.75}>

                            <BoxShadow setting={shadowOpt}>
                                <ImageBackground
                                    source={{uri : item.image}}
                                    imageStyle={styles.continueBookImageStyle}>
                                </ImageBackground>
                            </BoxShadow>

                            <Progress.Bar style={styles.progressBar} color={item.itemColor} progress={item.bookProgress} width={112} />

                        </TouchableOpacity>

                    </View>
                )}

                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
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