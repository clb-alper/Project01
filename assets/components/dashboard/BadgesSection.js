import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../colors/colors';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { auth, firebase } from '../../../firebase';
import { ModalContext } from '../../contexts/ModalContext';

var widthOfScreen = Dimensions.get('window').width; //full width

const BadgesSection = () => {

    const [badgesList, setBadgesList] = useState([]);
    const badgesRef = firebase.firestore().collection('badges')

    const { setBadgeModalVisible, setBadgeModalEntry } = useContext(ModalContext);

    const getBadgesData = async () => {
        badgesRef
            .onSnapshot(
                querySnapshot => {
                    const badgesList = []
                    querySnapshot.forEach((doc) => {
                        const { name, description, tiers } = doc.data()

                        badgesList.push({
                            name,
                            description,
                            tiers
                        })
                    })
                    setBadgesList(badgesList)
                }
            )
    }

    useEffect(() => {
        getBadgesData();
    }, [])

    return (

        <View style={styles.rosettes}>
            {/* <View style={styles.statisticsMainFirstRow}>
                    <View style={styles.bronzeBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>
                    <View style={styles.silverBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>
                    <View style={styles.goldBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>
                    <View style={styles.emeraldBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>

                </View>               */}
            <View style={styles.statisticsHeader}>
                <Text style={styles.statisticsText}>Rozetler</Text>
                <View style={styles.badgesLine}></View>
            </View>
            <View style={styles.rosettesMain}>
                {
                    typeof (badgesList) === 'undefined' ? null :

                        badgesList.map((badges, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{ marginRight: 10 }}
                                    onPress={() => { setBadgeModalVisible(true); setBadgeModalEntry(badges); }}
                                >
                                    <View style={styles.bronzeBadgeStyle}>
                                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />

                                    </View>
                                    <Text style={{ fontSize: 10, alignSelf: 'center' }}>{badges.name}</Text>
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
        marginTop: 10,
        marginLeft: 10,
        alignSelf: 'center'
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

    badgeIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 3,
    },
})