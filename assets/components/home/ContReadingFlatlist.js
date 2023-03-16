import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import booksListData from '../../data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';
import colors from '../../colors/colors';
import { ModalContext } from '../../contexts/ModalContext';

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

    return (
        <View>
            <FlatList
                overScrollMode={'never'}
                data={booksListData}
                renderItem={({ item, index }) => (
                    <View style={index != 0 ? styles.continueReadingBookStyle : styles.continueReadingBookStyleFirstItem}>
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => { setModalVisible(true); setModalEntry(item); }}
                            activeOpacity={0.75}>

                            <BoxShadow setting={shadowOpt}>
                                <ImageBackground
                                    source={item.image}
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