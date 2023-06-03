import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import colors from '../../colors/colors';
import { auth, firebase } from '../../../firebase';
import { ModalContext } from '../../contexts/ModalContext';
import { ProfileContext } from '../../contexts/ProfileContext';
import Rainbow from '../Rainbow';
import Skeleton from '../skeletons/Skeleton';

var widthOfScreen = Dimensions.get('window').width; //full width

const BadgesSection = () => {

    const badgesRef = firebase.firestore().collection('badges')

    const { setBadgeModalVisible, setBadgeModalEntry } = useContext(ModalContext);
    const { badgesList, setBadgesList, badgeLevelStyle, userStatisticsData } = useContext(ProfileContext);

    const [dummy, setDummy] = useState();

    const getBadgesData = async () => {
        badgesRef
            .onSnapshot(
                querySnapshot => {
                    const badgesList = []
                    querySnapshot.forEach((doc) => {
                        const { name, description, tiers, statisticName, iconImageURL } = doc.data()

                        badgesList.push({
                            name,
                            description,
                            tiers,
                            statisticName,
                            iconImageURL

                        })
                    })
                    setBadgesList(badgesList)
                    setDummy(true)
                }
            )

    }

    dummyList = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },

    ]

    useEffect(() => {
        getBadgesData();
    }, [])

    return (

        <View style={styles.rosettes}>

            <View style={styles.statisticsHeader}>
                <Text style={styles.statisticsText}>Rozetler</Text>
                <View style={styles.badgesLine}></View>
            </View>
            <View style={styles.rosettesMain}>
                {
                    !dummy ?
                        dummyList.map((index) => {
                            return (
                                <Skeleton
                                    key={index.id}
                                    height={80}
                                    width={80}
                                    lHeight={'100%'}
                                    lWidth={'300%'}
                                    duration={1200}
                                    backgroundColor={'rgba(0,0,0,0.05)'}
                                    style={[{ borderRadius: 100, marginRight: 10, marginBottom: 20 }]}
                                />
                            )
                        })

                        :
                        typeof (badgesList) === 'undefined' ? null :

                            badgesList.map((badges, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ marginRight: 10, marginBottom: 20 }}
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
                                )
                            })
                }

            </View>
        </View>
    )
}

export default BadgesSection;

const styles = StyleSheet.create({
    statisticsHeader: {
        flexDirection: 'row',
        width: widthOfScreen,
        paddingRight: 50
    },
    statisticsLine: {
        backgroundColor: colors.greenBorder,
        width: widthOfScreen / 1.95,
        height: 8,
        alignSelf: 'center',
        marginTop: 5,
        marginLeft: 15,
    },
    badgesLine: {
        backgroundColor: colors.greenBorder,
        width: widthOfScreen / 1.70,
        height: 8,
        alignSelf: 'center',
        marginTop: 5,
        marginLeft: 15,
    },

    statisticsText: {
        fontSize: 32,
        fontFamily: 'Comic-Regular'
    },
    statisticsMainSecondRow: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    userStatistics: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Comic-Regular'
    },
    userStatisticsTitle: {
        fontSize: 16,
        fontFamily: 'Comic-Regular',
        textAlign: 'center'
    },
    statistics: {
        padding: 20,
        marginTop: 10,
        height: 250,
    },
    rosettes: {
        padding: 20,
    },
    statisticsMain: {
        padding: 20,
    },
    rosettesMain: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center',
        width: widthOfScreen,
    },
    statisticsMainFirstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    statisticsMainFirstRowElem: {
        flexDirection: 'column',
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
})