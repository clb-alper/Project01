import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import booksListData from '../../data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import { ModalContext } from '../../contexts/ModalContext';

const DefaultFlatlist = () => {

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
                    <View style={index != 0 ? styles.otherBookStyle : styles.otherBookStyleFirstItem}>
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => { setModalVisible(true); setModalEntry(item); }}
                            activeOpacity={0.75}>
                            <BoxShadow setting={shadowOpt}>
                                <ImageBackground
                                    source={item.image}
                                    imageStyle={styles.otherBookImageStyle}>
                                </ImageBackground>
                            </BoxShadow>
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

export default DefaultFlatlist;

const styles = StyleSheet.create({
    otherBookStyle: {
        width: 123,
        height: 200,
        marginTop: 10,
        marginRight: 15
    },

    otherBookStyleFirstItem: {
        width: 123,
        height: 210,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 25
    },

    otherBookImageStyle: {
        width: 113,
        height: 190,
        borderRadius: 12,
    },
})