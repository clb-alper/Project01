import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import colors from '../../colors/colors';
import * as Progress from 'react-native-progress';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { BoxShadow } from 'react-native-shadow';
import { ProfileContext } from '../../contexts/ProfileContext';
import { TouchableOpacity } from 'react-native';
import Rainbow from '../Rainbow';
import { firebase } from '../../../firebase'
import { ModalContext } from '../../contexts/ModalContext';

var widthOfScreen = Dimensions.get('window').width; //full width

const Header = () => {

    const { currentProfileSelected, currentProfileSelectedInfo, userPointsData, badgesList, userStatisticsData, featuredBadgesList, setFeaturedBadgesList } = useContext(ProfileContext);
    const { setBadgeModalVisible, setBadgeModalEntry, featuredBadgeModalVisible, setFeaturedBadgeModalVisible } = useContext(ModalContext);

    const featuredBadgesRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('featuredBadgeData');

    const getFeaturedBadgesData = async () => {
        featuredBadgesRef
            .onSnapshot(
                querySnapshot => {
                    const featuredBadgesList = []
                    querySnapshot.forEach((doc) => {
                        const { featuredBadges } = doc.data()

                        for (let i = 0; i < 4; i++) {
                            badgesList.forEach((badge) => {
                                if (featuredBadges[i] === badge.statisticName)
                                    featuredBadgesList.push({
                                        ...badge,

                                    })
                            })
                        }
                    })
                    setFeaturedBadgesList(featuredBadgesList)
                }
            )
    }

    useEffect(() => {
        getFeaturedBadgesData();
    }, [])

    useEffect(() => {
        getFeaturedBadgesData();
    }, [badgesList])

    const shadowOpt = {
        width: widthOfScreen,
        height: 240,
        color: "#000",
        border: 15,
        radius: 37,
        opacity: 0.2,
        x: -1,
        y: -1.5,
    }

    return (
        <BoxShadow setting={shadowOpt}>
            <View style={styles.dashboardHeader}>
                <View style={styles.dashboardContainer}>

                    <View style={styles.headerIconContainerStyle} backgroundColor={currentProfileSelectedInfo[0].profileColor["regularColor"]} borderColor={currentProfileSelectedInfo[0].profileColor["borderColor"]}>
                        <Image source={require('../../images/icontest.png')} style={[styles.headerIconStyle, { tintColor: currentProfileSelectedInfo[0].profileColor["borderColor"] }]}></Image>
                    </View>

                    <View style={styles.headerUserInfo}>
                        <Text style={styles.headerUser}>{typeof (currentProfileSelectedInfo) == 'undefined' ? "Default" : currentProfileSelectedInfo[0].name}</Text>
                        <Text style={styles.headerUserLevel}>Seviye 25 - Kitap Kurdu</Text>
                        <Progress.Bar style={styles.progressBar} progress={0.75} height={7.5} width={250} color={colors.greenBorder} />
                    </View>

                    <View style={styles.pointsContainer}>

                        <Text
                            style={styles.pointsTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            {typeof (userPointsData) === 'undefined' ? "" : userPointsData.points}
                        </Text>

                        <AntIcons name="star" size={23} color="#FFD600" style={styles.pointsIconStyle} />

                    </View>
                </View>

                <View style={styles.dashboardRosettes}>

                    {
                        typeof (featuredBadgesList) === 'undefined' ? null :

                            featuredBadgesList.map((badges, index) => {

                                return (

                                    index < 4 ?
                                        <TouchableOpacity
                                            key={index}
                                            style={{ marginRight: 10, marginBottom: 20 }}
                                            onLongPress={() => { setFeaturedBadgeModalVisible(true) }}
                                            activeOpacity={0.40}
                                            onPress={() => { setBadgeModalVisible(true); setBadgeModalEntry(badges); }}
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
                                        :
                                        null

                                )
                            })
                    }
                </View>
            </View>
        </BoxShadow >
    )
}

export default Header;

const styles = StyleSheet.create({

    dashboardHeader: {
        paddingTop: '15%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 245,
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: colors.greenDashboardHeader,
        zIndex: 10
    },
    dashboardContainer: {
        flexDirection: 'row',
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
    },

    headerIconContainerStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        borderRadius: 100,
        borderWidth: 4,
    },

    headerIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
    },

    headerUserInfo: {
        display: 'flex',
        paddingLeft: 10,
        paddingTop: 2,
        flexDirection: 'column',
        marginBottom: 15,
        width: widthOfScreen * 0.5,
        marginTop: -3
    },

    headerUser: {
        fontSize: 26,
        fontFamily: 'Comic-Regular',

    },
    headerUserLevel: {
        marginTop: '1%',
        fontFamily: 'Comic-Regular',
        fontSize: 14,
    },

    progressBar: {
        marginTop: '3%',
        width: '100%',
        backgroundColor: colors.grayProgressBarBG,
        borderColor: colors.grayProgressBarBorder,
        borderWidth: 0.7,

    },

    pointsContainer: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        width: 95,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.greenBorder,
        backgroundColor: colors.greenDashboardHeader,
        paddingLeft: 10,

    },

    pointsTextStyle: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 21,
        width: 50,
    },

    pointsIconStyle: {
        resizeMode: 'contain',
        height: 25,
        width: 25,
        marginLeft: 1.5,
    },

    dashboardRosettes: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginLeft: 5,
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

    badgeIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 1,
    },

    rainbowIconStyle: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -75,
        marginLeft: 1,
        height: 75
    },

    rainbowBadgeStyle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        borderWidth: 5,
        borderRadius: 100,
        borderColor: colors.black,
    },
})