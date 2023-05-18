import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext';
import Modal from "react-native-modal";
import colors from '../../colors/colors';
import { ProfileContext } from '../../contexts/ProfileContext';
import Rainbow from '../Rainbow';
import IonIcons from 'react-native-vector-icons/Ionicons';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const FeaturedBadgeSelectModal = () => {

    const { userStatisticsData, badgesList } = useContext(ProfileContext);
    const { featuredBadgeModalVisible, setFeaturedBadgeModalVisible, setBadgeModalVisible, setBadgeModalEntry } = useContext(ModalContext);

    return (
        <Modal
            animationIn={'flipInY'}
            animationOut={'flipOutY'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={featuredBadgeModalVisible}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            statusBarTranslucent
            onRequestClose={() => {
                setFeaturedBadgeModalVisible(!featuredBadgeModalVisible);
            }}
            backdropOpacity={0.7}
            style={{ margin: 0 }}
        >
            <View style={{ alignItems: 'center', height: heightOfScreen, justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Comic-Regular', fontSize: 48, color: colors.white }}>Rozet Seçin</Text>
                <View style={styles.rosettesMain}>
                    {
                        typeof (badgesList) === 'undefined' ? null :

                            badgesList.map((badges, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ marginRight: 10, marginBottom: 20 }}
                                        onPress={() => { setBadgeModalVisible(true); setBadgeModalEntry(badges); }}
                                        activeOpacity={0.85}
                                    >
                                        {
                                            userStatisticsData[badges.statisticName] >= badges.tiers[4] ?
                                                <View
                                                    style={{ alignItems: 'center' }}
                                                >

                                                    <Rainbow
                                                        height={80}
                                                        width={80}
                                                        lHeight={500}
                                                        lWidth={80}
                                                        fromValue={-420}
                                                        toValue={-147}
                                                        duration={5000}
                                                        backgroundColor={colors.white}
                                                        style={styles.rainbowBadgeStyle}>

                                                    </Rainbow>
                                                    <Image
                                                        style={[styles.rainbowIconStyle, {
                                                            width: 45, marginTop:
                                                                badges.statisticName === "adventurer" ||
                                                                    badges.statisticName === "totalQuizzesCompleted" ||
                                                                    badges.statisticName === "readedBooks" ||
                                                                    badges.statisticName === "readedWords" ? -76.5 : -75, resizeMode: 'contain'
                                                        }]}
                                                        source={{ uri: badges.iconImageURL }}
                                                    />

                                                </View>
                                                :
                                                <View style={

                                                    userStatisticsData[badges.statisticName] >= badges.tiers[0] ?
                                                        userStatisticsData[badges.statisticName] >= badges.tiers[1] ?
                                                            userStatisticsData[badges.statisticName] >= badges.tiers[2] ?
                                                                userStatisticsData[badges.statisticName] >= badges.tiers[3] ?
                                                                    styles.diamondBadgeStyle :
                                                                    styles.emeraldBadgeStyle :
                                                                styles.goldBadgeStyle :
                                                            styles.silverBadgeStyle : styles.bronzeBadgeStyle
                                                }>
                                                    <Image
                                                        style={[styles.badgeIconStyle,
                                                        {
                                                            width: 45, marginTop:
                                                                badges.statisticName === "adventurer" ||
                                                                    badges.statisticName === "totalQuizzesCompleted" ||
                                                                    badges.statisticName === "readedBooks" ||
                                                                    badges.statisticName === "readedWords" ? -5 : 0, resizeMode: 'contain'
                                                        }]}
                                                        source={{ uri: badges.iconImageURL }}
                                                    />
                                                </View>

                                        }

                                    </TouchableOpacity>
                                )
                            })
                    }

                </View>

                <TouchableOpacity
                    onPress={() => { setFeaturedBadgeModalVisible(!featuredBadgeModalVisible); }}
                    activeOpacity={0.75}
                    style={styles.modalStickerCloseButton}>
                    <IonIcons name="ios-close" size={50} color="#000" style={styles.modalStickerCloseButtonIcon} />
                </TouchableOpacity>
            </View>
        </Modal >
    )
}

export default FeaturedBadgeSelectModal

const styles = StyleSheet.create({

    rosettesMain: {
        paddingLeft: 10,
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center',
        width: widthOfScreen,
        marginLeft: 41,
        marginTop: 20
    },

    bronzeBadgeStyle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.bronzeBadge,
        borderColor: colors.bronzeBadgeBorder
    },

    silverBadgeStyle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.silverBadge,
        borderColor: colors.silverBadgeBorder,
    },

    goldBadgeStyle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.goldBadge,
        borderColor: colors.goldBadgeBorder,
    },

    emeraldBadgeStyle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.emeraldBadge,
        borderColor: colors.emeraldBadgeBorder,
    },

    diamondBadgeStyle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: colors.diamondBadge,
        borderColor: colors.diamondBadgeBorder,
    },

    rainbowBadgeStyle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        borderWidth: 5,
        borderRadius: 100,
        borderColor: colors.black,
    },

    badgeIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    rainbowIconStyle: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -75,
        marginLeft: 1,
        height: 75
    },

    modalStickerCloseButton: {
        borderRadius: 500,
        borderWidth: 5,
        width: 70,
        height: 70,
        marginTop: 70,
        borderColor: colors.greenBorder,
        backgroundColor: colors.greenRegular
    },

    modalStickerCloseButtonIcon: {
        marginTop: 3,
        marginLeft: 5.5
    },
})