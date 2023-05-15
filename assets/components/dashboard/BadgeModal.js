import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../colors/colors'
import { ModalContext } from '../../contexts/ModalContext';
import Modal from "react-native-modal";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../contexts/ProfileContext';
import Rainbow from '../Rainbow';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const BadgeModal = () => {

    const [currentStatistic, setCurrentStatistic] = useState();
    const { badgeModalVisible, setBadgeModalVisible, badgeModalEntry } = useContext(ModalContext);
    const { userStatisticsData, setBadgeLevelStyle } = useContext(ProfileContext);

    const badgeNameControl = () => {
        if (typeof (badgeModalEntry.tiers) != 'undefined') {
            for (let i = 0; i < badgeModalEntry.tiers.length; i++) {
                if (userStatisticsData[badgeModalEntry.statisticName] >= badgeModalEntry.tiers[i]) {
                    if (i >= 4) {
                        setCurrentStatistic(userStatisticsData[badgeModalEntry.statisticName])
                    }
                }
                else {

                    setCurrentStatistic(badgeModalEntry.tiers[i])

                    break;
                }
            }
        }
        else {

        }
    }

    useEffect(() => {
        badgeNameControl()
    }, [badgeModalEntry.name])

    useEffect(() => {
        badgeNameControl()
    }, [userStatisticsData[badgeModalEntry.statisticName]])


    return (

        <Modal
            animationIn={'flipInY'}
            animationOut={'flipOutY'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={badgeModalVisible}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            statusBarTranslucent
            onRequestClose={() => {
                setBadgeModalVisible(!badgeModalVisible);
            }}
            style={{ margin: 0 }}
        >

            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <View>
                    {typeof (badgeModalEntry.tiers) != 'undefined' ?
                        userStatisticsData[badgeModalEntry.statisticName] >= badgeModalEntry.tiers[4] ?
                            <View
                                style={{ alignItems: 'center' }}
                            >
                                <Rainbow
                                    height={200}
                                    width={200}
                                    lWidth={200}
                                    lHeight={800}
                                    fromValue={-600}
                                    toValue={-165}
                                    duration={5000}
                                    backgroundColor={'rgba(0,0,0,0.25)'}
                                    style={[{ borderRadius: 500, borderColor: colors.black, borderWidth: 5 }]}
                                />
                                <Image
                                    style={[styles.rainbowIconStyle, { width: 125, resizeMode: 'contain' }]}
                                    source={{ uri: badgeModalEntry.iconImageURL }}
                                />
                            </View>
                            : <View style={
                                typeof (badgeModalEntry.tiers) != 'undefined' ?
                                    userStatisticsData[badgeModalEntry.statisticName] >= badgeModalEntry.tiers[0] ?
                                        userStatisticsData[badgeModalEntry.statisticName] >= badgeModalEntry.tiers[1] ?
                                            userStatisticsData[badgeModalEntry.statisticName] >= badgeModalEntry.tiers[2] ?
                                                userStatisticsData[badgeModalEntry.statisticName] >= badgeModalEntry.tiers[3] ?
                                                    styles.diamondBadgeStyle :
                                                    styles.emeraldBadgeStyle :
                                                styles.goldBadgeStyle :
                                            styles.silverBadgeStyle : styles.bronzeBadgeStyle
                                    :
                                    null}>
                                <Image
                                    style={[styles.badgeIconStyle,
                                    {
                                        width: 125, marginTop:
                                            badgeModalEntry.name === "Maceraperest" ||
                                                badgeModalEntry.name === "Quizör" ||
                                                badgeModalEntry.statisticName === "readedBooks" ||
                                                badgeModalEntry.statisticName === "readedWords" ? -5 : 5, resizeMode: 'contain'
                                    }]}
                                    source={{ uri: badgeModalEntry.iconImageURL }}
                                />
                            </View>

                        : <View>

                        </View>
                    }
                </View>
                <View>
                    <Text style={styles.modalStickerNameText}>
                        {badgeModalEntry.name}
                    </Text>
                </View>

                <View>
                    <Text style={styles.modalBadgeProgressText}>
                        {typeof (userStatisticsData[badgeModalEntry.statisticName]) === 'undefined' ? 0 : userStatisticsData[badgeModalEntry.statisticName]}
                        {currentStatistic <= userStatisticsData[badgeModalEntry.statisticName] ? "" : "/" + currentStatistic}

                    </Text>
                </View>
                <View>

                    <Text style={styles.modalBadgeDescriptionText}>
                        {badgeModalEntry.description}
                    </Text>

                </View>

                <TouchableOpacity
                    onPress={() => { setBadgeModalVisible(!badgeModalVisible) }}
                    activeOpacity={0.75}
                    style={styles.modalStickerCloseButton}>
                    <IonIcons name="ios-close" size={50} color="#000" style={styles.modalStickerCloseButtonIcon} />
                </TouchableOpacity>

            </View>


        </Modal >
    )
}

export default BadgeModal;

const styles = StyleSheet.create({
    modalStickerNameText: {
        fontFamily: 'Comic-Regular',
        fontSize: 42,
        color: 'white',
        marginTop: 10
    },

    modalBadgeProgressText: {
        fontFamily: 'Comic-Regular',
        fontSize: 32,
        color: 'white',
    },

    modalBadgeDescriptionText: {
        color: colors.white,
        fontFamily: 'Comic-Regular',
        fontSize: 23,
        width: widthOfScreen * 0.8,
        textAlign: 'center',
        marginTop: 35,
    },

    modalStickerImage: {
        width: 200,
        height: 200,
        marginTop: 100,
    },

    modalStickerCloseButton: {
        borderRadius: 500,
        borderWidth: 5,
        width: 70,
        height: 70,
        marginTop: 100,
        borderColor: colors.greenBorder,
        backgroundColor: colors.greenRegular
    },

    modalStickerCloseButtonIcon: {
        marginTop: 3,
        marginLeft: 5.5
    },

    modalViewDarkenStyle: {
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: widthOfScreen,
        height: heightOfScreen * 1.1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },

    modalViewStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '80%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor: colors.white,
    },

    pointsTextStyle3: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 25,
        width: 65,
    },

    pointsIconStyle3: {
        resizeMode: 'contain',
        height: 38,
        width: 38,
        paddingTop: 2,
        paddingLeft: 2
    },

    bronzeBadgeStyle: {
        width: 200,
        height: 200,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.bronzeBadge,
        borderColor: colors.bronzeBadgeBorder
    },

    silverBadgeStyle: {
        width: 200,
        height: 200,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.silverBadge,
        borderColor: colors.silverBadgeBorder,
    },

    goldBadgeStyle: {
        width: 200,
        height: 200,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.goldBadge,
        borderColor: colors.goldBadgeBorder,
    },

    emeraldBadgeStyle: {
        width: 200,
        height: 200,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.emeraldBadge,
        borderColor: colors.emeraldBadgeBorder,
    },

    diamondBadgeStyle: {
        width: 200,
        height: 200,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.diamondBadge,
        borderColor: colors.diamondBadgeBorder,
    },

    rainbowIconStyle: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -180,
        height: 180
    },

    badgeIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})