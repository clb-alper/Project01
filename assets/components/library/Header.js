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

    const shadowOpt2 = {
        width: widthOfScreen,
        height: 117,
        color: "#000",
        border: 12,
        radius: 25,
        opacity: 0.2,
        x: -1,
        y: 2.5,
    }

    return (
        <BoxShadow setting={shadowOpt2}>
            <View style={styles.libContainer}>
                <View style={styles.libContainerView}>
                    <Text
                        style={styles.LibHeaderTxtStyle}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>
                        Kütüphane
                    </Text>

                    <SelectDropdown

                        buttonStyle={closeLibraryDropdown ? styles.DropdownStyle2 : styles.DropdownStyle}
                        buttonTextStyle={styles.DropdownTextStyle}
                        dropdownStyle={styles.DropdownContainerStyle}
                        rowStyle={styles.DropdownRowStyle}
                        rowTextStyle={styles.DropdownContainerTextStyle}
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

                            if (selectedItem == 'Tema') {
                                setCategorySwitch(false)

                            } else if (selectedItem == 'Alfabe') {
                                setCategorySwitch(true)
                            }
                        }}

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
        width: '100%',
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

    LibHeaderTxtStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 49,
    },

    DropdownStyle: {
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

    DropdownStyle2: {
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

    DropdownTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 25,
        alignItems: 'center',
        alignContent: 'center',

    },

    DropdownContainerStyle: {
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

    DropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.blueTabBar,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

    },

    DropdownRowStyle: {
        width: 145,
        height: 40,
        marginLeft: -10,

    },
})