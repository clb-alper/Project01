import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { LibraryContext } from '../../contexts/LibraryContext';
import { ModalContext } from '../../contexts/ModalContext';
import BookModal from '../BookModal';

const BookShowcase = () => {

    const { sortedData, DATA, setData, categorySwitch, bookWidth, bookList } = useContext(LibraryContext);
    const { modalVisible, setModalVisible, setModalEntry } = useContext(ModalContext);

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



    return (
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