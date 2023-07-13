import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../colors/colors'
import { ModalContext } from '../../contexts/ModalContext';
import Modal from "react-native-modal";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../contexts/ProfileContext';
import { auth, firebase } from '../../../firebase';
import Rainbow from '../Rainbow';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const BadgeModal = () => {

    const [currentStatistic, setCurrentStatistic] = useState();
    const [alreadyIncludedMessage, setAlreadyIncludedMessage] = useState(false);
    const [addedMessage, setAddedMessage] = useState(false);
    const { badgeModalVisible, setBadgeModalVisible, badgeModalEntry, featuredBadgeModalVisible, setFeaturedBadgeModalVisible } = useContext(ModalContext);
    const { userStatisticsData, featuredBadgeIndex, featuredBadgesList, featuredBadgeData, currentProfileSelected, setFeaturedBadgeData } = useContext(ProfileContext);

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

    const featuredBageAdd = () => {
        let lock = false
        if (typeof (featuredBadgeData) != 'undefined' || featuredBadgeData.length > 0) {
            for (const featuredStatisticName of featuredBadgeData) {
                if (featuredStatisticName === badgeModalEntry.statisticName) {
                    setAlreadyIncludedMessage(true)
                    lock = true;
                    break;
                }

            }
        }
        if (!lock) {
            featuredBadgeData[featuredBadgeIndex] = badgeModalEntry.statisticName
            setFeaturedBadgeData(featuredBadgeData)
            firebase.firestore()
                .collection('users').doc(firebase.auth().currentUser.uid)
                .collection('userProfiles').doc(currentProfileSelected).collection('featuredBadgeData').doc('featuredBadgesDoc').update({
                    featuredBadges: featuredBadgeData
                })
            setAddedMessage(true)
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
                setAlreadyIncludedMessage(false);
                setAddedMessage(false)
                setBadgeModalVisible(!badgeModalVisible);
            }}
            backdropOpacity={featuredBadgeModalVisible ? 0.58 : 0.8}
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
                                    style={[styles.rainbowIconStyle, { width: 125, resizeMode: 'contain',
                                    marginTop: badgeModalEntry.statisticName === "cityKid" ||
                                    badgeModalEntry.statisticName === "natureLover"
                                    ? -200 : badgeModalEntry.statisticName === "totalPoints" ||
                                    badgeModalEntry.statisticName === "animalLover"||
                                    badgeModalEntry.statisticName === "professor"||
                                    badgeModalEntry.statisticName === "adventurer"||
                                    badgeModalEntry.statisticName === "readedWords"||
                                    badgeModalEntry.statisticName === "totalQuizzesCompleted"||
                                    badgeModalEntry.statisticName === "readedBooks" ? -185 : 5
                                }]}
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
                                                badgeModalEntry.statisticName === "readedWords" ? -5 : 
                                                badgeModalEntry.statisticName === "cityKid" ||
                                                badgeModalEntry.statisticName === "natureLover" ? -10 : 5, resizeMode: 'contain'
                                    }]}
                                    source={{ uri: badgeModalEntry.iconImageURL }}
                                />
                            </View>

                        : <View>

                        </View>
                    }
                </View>
                <View>
                    <Text style={[styles.modalStickerNameText, { marginTop:  badgeModalEntry.statisticName === "cityKid" ||
                                                badgeModalEntry.statisticName === "natureLover" ||
                                                badgeModalEntry.statisticName === "totalPoints"? 25 : 10}]}>
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

                {typeof (featuredBadgeModalVisible) != 'undefined' && featuredBadgeModalVisible === true ?
                    <>
                        <TouchableOpacity
                            onPress={() => { featuredBageAdd() }}
                            activeOpacity={0.75}
                            style={styles.featuredBadgeAddButton}>
                            <Text style={styles.featuredBadgeAddButtonText}>Ekle</Text>
                        </TouchableOpacity>
                        {alreadyIncludedMessage ? <Text style={styles.featuredBadgeAddAlreadyExistText}>Rozet zaten ekli</Text> : null}
                        {addedMessage ? <Text style={styles.featuredBadgeAddCompleteText}>Rozet başarılı bir şekilde eklendi</Text> : null}
                    </>
                    :
                    null
                }

                <TouchableOpacity
                    onPress={() => { setBadgeModalVisible(!badgeModalVisible); setAlreadyIncludedMessage(false); setAddedMessage(false); }}
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
        marginTop: 70,
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

    featuredBadgeAddButton: {
        backgroundColor: colors.greenRegular,
        borderWidth: 3,
        borderColor: colors.greenBorder,
        borderRadius: 20,
        width: 200,
        alignItems: 'center',
        marginTop: 30
    },

    featuredBadgeAddButtonText: {
        fontSize: 45,
        color: colors.black,
        fontFamily: 'Comic-Regular',
        marginTop: -2
    },

    featuredBadgeAddAlreadyExistText: {
        fontSize: 18,
        color: '#f26d74',
        fontFamily: 'Comic-Bold',
        marginTop: 5
    },

    featuredBadgeAddCompleteText: {
        fontSize: 18,
        color: '#83FCA7',
        fontFamily: 'Comic-Bold',
        marginTop: 5
    }

})