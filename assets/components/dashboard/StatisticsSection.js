import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import colors from '../../colors/colors';
import { ProfileContext } from '../../contexts/ProfileContext';
import { auth, firebase } from '../../../firebase';

var widthOfScreen = Dimensions.get('window').width; //full width

const StatisticsSection = () => {

    const [userStatisticsData, setUserStatisticsData] = useState([]);

    const { currentProfileSelected, userPointsData } = useContext(ProfileContext);

    const profileRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected).collection('statisticsData');

    const getUserStatisticsData = async () => {
        profileRef
            .onSnapshot(
                querySnapshot => {
                    const userStatisticsData = []
                    querySnapshot.forEach((doc) => {
                        const { readedBooks, readedWords } = doc.data()

                        userStatisticsData.push({
                            readedBooks,
                            readedWords
                        })

                    })
                    setUserStatisticsData(userStatisticsData[0])
                }
            )
    }

    useEffect(() => {
        getUserStatisticsData();
    }, [])

    return (
        <View style={styles.statistics}>

            <View style={styles.statisticsHeader}>
                <Text style={styles.statisticsText}>İstatistikler</Text>
                <View style={styles.statisticsLine}></View>
            </View>

            <View style={styles.statisticsMain}>

                <View style={styles.statisticsMainFirstRow}>
                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>{typeof (userStatisticsData) === 'undefined' ? 0 : userStatisticsData.readedBooks}</Text>
                        <Text style={styles.userStatisticsTitle}>Kitap Okundu</Text>
                    </View>
                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>{typeof (userStatisticsData) === 'undefined' ? 0 : userStatisticsData.readedWords}</Text>
                        <Text style={styles.userStatisticsTitle}>Kelime Okundu</Text>
                    </View>
                </View>

                <View style={styles.statisticsMainSecondRow}>

                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>{typeof (userPointsData) === 'undefined' ? 0 : userPointsData.totalQuizzesCompleted}</Text>
                        <View>
                            <Text style={styles.userStatisticsTitle}>Quiz</Text>
                            <Text style={styles.userStatisticsTitle}>Tamamlandı</Text>
                        </View>
                    </View>

                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>{typeof (userPointsData) === 'undefined' ? 0 : userPointsData.totalPoints}</Text>
                        <View>
                            <Text style={styles.userStatisticsTitle}>Toplam Puan</Text>
                            <Text style={styles.userStatisticsTitle}>Kazanıldı</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default StatisticsSection;

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

    statisticsText: {
        fontSize: 32,
        fontFamily: 'Comic-Regular'
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

    statisticsMain: {
        padding: 20,
    },

    statisticsMainFirstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginRight: '10%',
        marginLeft: '10%'
    },

    statisticsMainSecondRow: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: '10%',
        marginLeft: '10%'
    },

    statisticsMainFirstRowElem: {
        flexDirection: 'column',
    },

})