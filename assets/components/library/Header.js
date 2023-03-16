import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import colors from '../../colors/colors';
import { BoxShadow } from 'react-native-shadow';
import SelectDropdown from 'react-native-select-dropdown';
import { DropdownContext } from '../../contexts/DropdownContext';
import { LibraryContext } from '../../contexts/LibraryContext';

var widthOfScreen = Dimensions.get('window').width; //full width

const Header = () => {

    const { libraryCategories, closeLibraryDropdown, setCloseLibraryDropdown } = useContext(DropdownContext);
    const { setCategorySwitch } = useContext(LibraryContext);

    const shadowOpt = {
        width: widthOfScreen,
        height: 125,
        color: "#000",
        border: 15,
        radius: 28,
        opacity: 0.2,
        x: -1,
        y: -7,
    }

    return (
        <BoxShadow setting={shadowOpt}>
            <View style={styles.libContainer}>
                <View style={styles.libContainerView}>
                    <Text
                        style={styles.libHeaderTxtStyle}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>
                        Kütüphane
                    </Text>

                    <SelectDropdown

                        buttonStyle={closeLibraryDropdown ? styles.dropdownStyle2 : styles.dropdownStyle}
                        buttonTextStyle={styles.dropdownTextStyle}
                        dropdownStyle={styles.dropdownContainerStyle}
                        rowStyle={styles.dropdownRowStyle}
                        rowTextStyle={styles.dropdownContainerTextStyle}
                        dropdownOverlayColor='transparent'

                        data={libraryCategories}
                        adjustsFontSizeToFit={true}
                        defaultButtonText={libraryCategories[0]}

                        onFocus={() => {
                            setCloseLibraryDropdown(true)
                        }}

                        onBlur={() => {
                            setCloseLibraryDropdown(false)
                        }}

                        onSelect={(selectedItem, index) => {
                            setCloseLibraryDropdown(false)
                            console.log(libraryCategories[index])
                            console.log(selectedItem)

                            // taking the catagories from dropdown menu
                            for (let index = 0; index < libraryCategories.length - 1; index++) {
                                if (selectedItem == libraryCategories[index]) {
                                    setCategorySwitch(index)
                                }
                            }

                        }
                        }

                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}

                    />

                </View>
            </View>
        </BoxShadow>
    )
}

export default Header

const styles = StyleSheet.create({

    libContainer: {
        backgroundColor: colors.blueContainer,
        height: 125,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        zIndex: 50
    },

    libContainerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 50,
    },

    libHeaderTxtStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 49,
    },

    dropdownStyle: {
        backgroundColor: colors.blueTabBar,
        borderRadius: 25,
        height: 40,
        width: 125,
        borderWidth: 2,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    dropdownStyle2: {
        backgroundColor: colors.blueTabBar,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        width: 125,
        borderWidth: 2,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 45

    },

    dropdownTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 25,
        alignItems: 'center',
        alignContent: 'center',

    },

    dropdownContainerStyle: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: colors.blueBorder,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,

        width: 145,
        height: 120,
        marginRight: '-6.6%',
        marginTop: '-6.3%',
        backgroundColor: colors.blueTabBar,

    },

    dropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.blueTabBar,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

    },

    dropdownRowStyle: {
        width: 145,
        height: 40,
        marginLeft: -10,

    },
})