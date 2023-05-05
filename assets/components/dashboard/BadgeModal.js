import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../colors/colors'
import { ModalContext } from '../../contexts/ModalContext';
import Modal from "react-native-modal";
import AntIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../contexts/ProfileContext';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const BadgeModal = () => {

    const [currentStatistic, setCurrentStatistic] = useState();

    const { badgeModalVisible, setBadgeModalVisible, badgeModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, userPointsData, userStatisticsData, setUserStatisticsData, badgesList } = useContext(ProfileContext);

    const badgeNameControl = () => {
        for (let i = 0; i < badgeModalEntry.tiers.length; i++){
            if (userStatisticsData[badgeModalEntry.statisticName] >= badgeModalEntry.tiers[i]) {
                continue;
            }
            else {
                setCurrentStatistic(badgeModalEntry.tiers[i])
                break;
            }
        } 
    }

    useEffect(() => {
        badgeNameControl()
    }, [badgeModalEntry.name])


    return (

        <Modal
            animationIn={'flipInY'}
            animationOut={'flipOutY'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={badgeModalVisible}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            onRequestClose={() => {
                setBadgeModalVisible(!badgeModalVisible);
            }}
            style={{ margin: 0 }}
        >

            <View style={{ alignItems: 'center', marginTop: -50 }}>
                <View>
                    <View style={userStatisticsData[badgeModalEntry.statisticName] > 500 ? styles.silverBadgeStyle : styles.bronzeBadgeStyle}>
                    </View>
                </View>
                <View>
                    <Text style={styles.modalStickerNameText}>
                        {badgeModalEntry.name}
                    </Text>
                </View>

                <View>
                    <Text style={styles.modalStickerNameText}>
                        {userStatisticsData[badgeModalEntry.statisticName]}
                        /
                        {currentStatistic}
                    </Text>
                </View>
                <View style={styles.pointsContainer3}>

                    <Text style={{ color: colors.white }}>
                        {badgeModalEntry.description}
                    </Text>

                </View>

                <TouchableOpacity
                    onPress={() => setBadgeModalVisible(!badgeModalVisible)}
                    activeOpacity={0.75}
                    style={styles.modalStickerCloseButton}>
                    <IonIcons name="ios-close" size={50} color="#000" style={styles.modalStickerCloseButtonIcon} />
                </TouchableOpacity>

            </View>


        </Modal>
    )
}

export default BadgeModal;

const styles = StyleSheet.create({
    modalStickerNameText: {
        fontFamily: 'Comic-Regular',
        fontSize: 38,
        color: 'white',
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
        marginTop: 30,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleRegular
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

    pointsContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        paddingLeft: 5,
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
})