import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import colors from '../../colors/colors';

var widthOfScreen = Dimensions.get('window').width; //full width

const StatisticsSection = () => {
    return (
        <View style={styles.statistics}>
            <View style={styles.statisticsHeader}>
                <Text style={styles.statisticsText}>İstatistikler</Text>
                <View style={styles.statisticsLine}></View>
            </View>

            <View style={styles.statisticsMain}>
                <View style={styles.statisticsMainFirstRow}>
                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>105</Text>
                        <Text style={styles.userStatisticsTitle}>Kitap Okundu</Text>
                    </View>
                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>1520</Text>
                        <Text style={styles.userStatisticsTitle}>Sayfa Okundu</Text>
                    </View>
                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>5682</Text>
                        <Text style={styles.userStatisticsTitle}>Kelime Okundu</Text>
                    </View>
                </View>

                <View style={styles.statisticsMainSecondRow}>
                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>28</Text>
                        <View style={styles.userStatisticTitleCustomView}>
                            <Text style={styles.userStatisticsTitle}>Quiz</Text>
                            <Text style={styles.userStatisticsTitle}>Tamamlandı</Text>
                        </View>
                    </View>
                    <View style={styles.statisticsMainFirstRowElem}>
                        <Text style={styles.userStatistics}>2460</Text>
                        <View style={styles.userStatisticTitleCustomView}>
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
        backgroundColor: colors.greenSpacer,
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

    statisticsMain: {
        padding: 20,
    },
    statisticsMainFirstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    statisticsMainFirstRowElem: {
        flexDirection: 'column',
    },
})