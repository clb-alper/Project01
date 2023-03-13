import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import colors from '../../colors/colors';
import { DropdownContext } from '../../contexts/DropdownContext';
import { LibraryContext } from '../../contexts/LibraryContext';
import { ModalContext } from '../../contexts/ModalContext';
import { RewardsContext } from '../../contexts/RewardsContext';

const MainContainer = () => {

    const { DATA } = useContext(RewardsContext);
    const { setStickerModalEntry, setStickerModalVisible } = useContext(ModalContext);
    const { setCategorySwitch } = useContext(LibraryContext);
    const { closeRewardsDropdown, setCloseRewardsDropdown, rewardsCategories } = useContext(DropdownContext)

    return (
        <>
            <View style={styles.pointsContainer222}>

                <SelectDropdown

                    buttonStyle={closeRewardsDropdown ? styles.DropdownStyle2 : styles.DropdownStyle}
                    buttonTextStyle={styles.DropdownTextStyle}
                    dropdownStyle={styles.DropdownContainerStyle}
                    rowStyle={styles.DropdownRowStyle}
                    rowTextStyle={styles.DropdownContainerTextStyle}
                    dropdownOverlayColor='transparent'

                    data={rewardsCategories}
                    adjustsFontSizeToFit={true}
                    defaultButtonText={rewardsCategories[0]}

                    onFocus={() => {
                        setCloseRewardsDropdown(true)
                    }}

                    onBlur={() => {
                        setCloseRewardsDropdown(false)
                    }}

                    onSelect={(selectedItem, index) => {
                        setCloseRewardsDropdown(false)
                        console.log(rewardsCategories[index])
                        console.log(selectedItem)

                        if (selectedItem == 'Sticker') {
                            setCategorySwitch(false)

                        } else if (selectedItem == 'Seviye') {
                            setCategorySwitch(true)
                        }
                    }}

                    buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item) => {
                        return item
                    }}

                />
            </View>

            {
                DATA.map((stickerData, index) => {
                    return (
                        <View key={index}>
                            <View style={[styles.headerView12, { marginTop: 5 }]}>

                                <Text
                                    style={styles.headerTextStyle2}
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={1}>
                                    {stickerData.bookName}
                                </Text>

                                <View style={styles.stickerContainer}>
                                    {stickerData.stickers.map((sticker, index) => {
                                        return (
                                            <View key={index}>
                                                <View style={styles.continueReadingBookStyleFirstItem}>

                                                    <TouchableOpacity
                                                        key={sticker.id}
                                                        onPress={() => { setStickerModalVisible(true); setStickerModalEntry(sticker) }}
                                                        activeOpacity={0.75}>

                                                        <ImageBackground

                                                            source={sticker.image}
                                                            imageStyle={styles.continueBookImageStyle}>
                                                        </ImageBackground>


                                                        <View style={styles.pointsContainer2}>

                                                            <Text
                                                                style={styles.pointsTextStyle2}
                                                                adjustsFontSizeToFit={true}
                                                                numberOfLines={1}>
                                                                {sticker.price}
                                                            </Text>

                                                            <Image

                                                                source={require('../../images/iconStar.png')}
                                                                style={styles.pointsIconStyle2}>
                                                            </Image>

                                                        </View>
                                                    </TouchableOpacity>

                                                </View>


                                            </View>
                                        )
                                    })}
                                </View>

                            </View>

                        </View>
                    )
                })
            }
        </>
    )
}

export default MainContainer

const styles = StyleSheet.create({

    headerView12: {
        flexDirection: 'column',
        marginHorizontal: 20,
        marginTop: 20,
        marginLeft: 35,
    },

    headerTextStyle2: {
        fontFamily: 'Comic-Regular',
        fontSize: 30,
        marginBottom: 15,
    },

    stickerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
        width: '100%',
    },

    continueReadingBookStyleFirstItem: {
        width: 45,
        height: 140,
        marginRight: 43,
    },

    continueBookImageStyle: {
        width: 75,
        height: 75,
        borderRadius: 12,
    },

    pointsContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        width: 75,
        marginTop: 90,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleHeaderContainer,
    },

    pointsTextStyle2: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 15,
        width: 40,
    },

    pointsIconStyle2: {
        resizeMode: 'contain',
        height: 20,
        width: 20,
    },

    DropdownViewStyle: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 30,

    },

    DropdownStyle: {
        backgroundColor: colors.purpleTagBG,
        borderRadius: 15,
        height: 30,
        width: 90,
        borderWidth: 2,
        borderColor: colors.purpleBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    DropdownStyle2: {
        backgroundColor: colors.purpleTagBG,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 30,
        width: 90,
        borderWidth: 2,
        borderColor: colors.purpleBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    DropdownTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 18,
        alignItems: 'center',
        alignContent: 'center',

    },

    DropdownContainerStyle: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: colors.purpleBorder,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

        width: 111.5,
        height: 95,
        marginRight: '-6.6%',
        marginTop: '-6.3%',
        backgroundColor: colors.purpleTagBG,

    },

    DropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.purpleTagBG,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

    },

    DropdownRowStyle: {
        width: 105,
        height: 35,
        marginLeft: -10,

    },

    pointsContainer222: {
        flex: 1,
        alignItems: 'flex-end',
        height: 28,
        width: '100%',
        marginTop: 25,
        marginLeft: '-7.5%',
    },
})