import React, { useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import colors from '../../colors/colors';
import { BoxShadow } from 'react-native-shadow';
import SelectDropdown from 'react-native-select-dropdown';
import { DropdownContext } from '../../contexts/DropdownContext';
import { LibraryContext } from '../../contexts/LibraryContext';

var widthOfScreen = Dimensions.get('window').width; //full width

const Header = () => {

    const { libraryCategories, closeLibraryDropdown, setCloseLibraryDropdown, failSafe, setFailSafe } = useContext(DropdownContext);
    const { setSortedData, DATA, setCategorySwitch, effectHandle } = useContext(LibraryContext);

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

    useEffect(() => {
        typeof (DATA) == 'undefined' ? null : handleCategorySwitch(0);
    }, [DATA])

    const handleCategorySwitch = (categorySelection) => {
        // categorySelection == 0 -> alphabet (default)
        // categorySelection == 1 -> categories 
        // categorySelection == 2 -> age 
        // categorySelection == 3 -> theme

        const rawData = [];
        const sortedData = [];
        // converting sorted data to rawData
        for (let i = 0; i < DATA.length; i++) {
            for (let k = 0; k < DATA[i].books.length; k++) {
                rawData.push({
                    id: DATA[i].books[k].id,
                    title: DATA[i].books[k].title,
                    image: DATA[i].books[k].image,
                    itemColor: DATA[i].books[k].itemColor,
                    itemBorder: DATA[i].books[k].itemBorder,
                    itemColorBG: DATA[i].books[k].itemColorBG,
                    itemTextColor: DATA[i].books[k].itemTextColor,
                    itemPageBGColor: DATA[i].books[k].itemPageBGColor,
                    itemDesc: DATA[i].books[k].itemDesc,
                    favorited: DATA[i].books[k].favorited,
                    bookProgress: DATA[i].books[k].bookProgress,
                    themeTag: DATA[i].books[k].themeTag,
                    ageTag: DATA[i].books[k].ageTag,
                    contentTag: DATA[i].books[k].contentTag,
                    rewardTag: DATA[i].books[k].rewardTag,
                    themeTag : DATA[i].books[k].themeTag
                })
            }
        }


        if (categorySelection == 0) {
            for (let i = 0; i < rawData.length; i++) {
                const index = sortedData.findIndex((cond) => cond.condition === rawData[i].title.substring(0, 1));

                if (index > -1) {
                    sortedData[index].books.push(rawData[i])
                }
                else {
                    sortedData.push({
                        condition: rawData[i].title.substring(0, 1),
                        books: [{
                            id: rawData[i].id,
                            title: rawData[i].title,
                            image: rawData[i].image,
                            itemColor: rawData[i].itemColor,
                            itemBorder: rawData[i].itemBorder,
                            itemColorBG: rawData[i].itemColorBG,
                            itemTextColor: rawData[i].itemTextColor,
                            itemPageBGColor: rawData[i].itemPageBGColor,
                            itemDesc: rawData[i].itemDesc,
                            favorited: rawData[i].favorited,
                            bookProgress: rawData[i].bookProgress,
                            ageTag: rawData[i].ageTag,
                            contentTag: rawData[i].contentTag,
                            rewardTag: rawData[i].rewardTag,
                            themeTag : rawData[i].themeTag
                        }]
                    })
                }
            }


        }
        else if (categorySelection == 1) {
            for (let i = 0; i < rawData.length; i++) {
                const index = sortedData.findIndex((cond) => cond.condition === rawData[i].contentTag);

                if (index > -1) {
                    sortedData[index].books.push(rawData[i])
                }
                else {
                    sortedData.push({
                        condition: rawData[i].contentTag,
                        books: [{
                            id: rawData[i].id,
                            title: rawData[i].title,
                            image: rawData[i].image,
                            itemColor: rawData[i].itemColor,
                            itemBorder: rawData[i].itemBorder,
                            itemColorBG: rawData[i].itemColorBG,
                            itemTextColor: rawData[i].itemTextColor,
                            itemPageBGColor: rawData[i].itemPageBGColor,
                            itemDesc: rawData[i].itemDesc,
                            favorited: rawData[i].favorited,
                            bookProgress: rawData[i].bookProgress,
                            ageTag: rawData[i].ageTag,
                            contentTag: rawData[i].contentTag,
                            rewardTag: rawData[i].rewardTag,
                            themeTag : rawData[i].themeTag
                        }]
                    })
                }
            }
        }
        else if (categorySelection == 2) {
            for (let i = 0; i < rawData.length; i++) {
                const index = sortedData.findIndex((cond) => cond.condition === rawData[i].ageTag);

                if (index > -1) {
                    sortedData[index].books.push(rawData[i])
                }
                else {
                    sortedData.push({
                        condition: rawData[i].ageTag,
                        books: [{
                            id: rawData[i].id,
                            title: rawData[i].title,
                            image: rawData[i].image,
                            itemColor: rawData[i].itemColor,
                            itemBorder: rawData[i].itemBorder,
                            itemColorBG: rawData[i].itemColorBG,
                            itemTextColor: rawData[i].itemTextColor,
                            itemPageBGColor: rawData[i].itemPageBGColor,
                            itemDesc: rawData[i].itemDesc,
                            favorited: rawData[i].favorited,
                            bookProgress: rawData[i].bookProgress,
                            ageTag: rawData[i].ageTag,
                            contentTag: rawData[i].contentTag,
                            rewardTag: rawData[i].rewardTag,
                            themeTag : rawData[i].themeTag
                        }]
                    })
                }
            }
        }
        else if (categorySelection == 3) {
            for (let i = 0; i < rawData.length; i++) {
                const index = sortedData.findIndex((cond) => cond.condition === rawData[i].themeTag);

                if (index > -1) {
                    sortedData[index].books.push(rawData[i])
                }
                else {
                    sortedData.push({
                        condition: rawData[i].themeTag,
                        books: [{
                            id: rawData[i].id,
                            title: rawData[i].title,
                            image: rawData[i].image,
                            itemColor: rawData[i].itemColor,
                            itemBorder: rawData[i].itemBorder,
                            itemColorBG: rawData[i].itemColorBG,
                            itemTextColor: rawData[i].itemTextColor,
                            itemPageBGColor: rawData[i].itemPageBGColor,
                            itemDesc: rawData[i].itemDesc,
                            favorited: rawData[i].favorited,
                            bookProgress: rawData[i].bookProgress,
                            ageTag: rawData[i].ageTag,
                            contentTag: rawData[i].contentTag,
                            rewardTag: rawData[i].rewardTag,
                        }]
                    })
                }
            }
        }

        // // TODO: TR ALPHABET ENTEGRATION
        // sortedData.sort((a, b) => {
        //     return a.condition > b.condition;
        // })

        sortedData.sort(function (a, b) {
            return Intl.Collator("tr").compare(a.condition,b.condition)
        });

        setSortedData(sortedData);

    };

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


                            // taking the catagories from dropdown menu
                            for (let index = 0; index < libraryCategories.length; index++) {
                                if (selectedItem == libraryCategories[index]) {
                                    setCategorySwitch(index)
                                    // setData
                                    handleCategorySwitch(index);
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
        backgroundColor: colors.blueLibraryHeader,
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
        backgroundColor: colors.blueLibraryDropDown,
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
        backgroundColor: colors.blueLibraryDropDown,
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
        backgroundColor: colors.blueLibraryDropDown,

    },

    dropdownContainerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 19,
        backgroundColor: colors.blueLibraryDropDown,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

    },

    dropdownRowStyle: {
        width: 145,
        height: 40,
        marginLeft: -10,

    },
})