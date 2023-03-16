import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Dimensions, Text } from 'react-native';
import booksListData from '../../data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import { ModalContext } from '../../contexts/ModalContext';

var widthOfScreen = Dimensions.get('window').width; //full width

const FeaturedFlatlist = () => {

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
                    <View style={{ marginTop: 10 }}>

                        <ImageBackground
                            source={item.image}
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
                                        source={item.image}
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