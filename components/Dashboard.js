import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../assets/colors/colors';
var width = Dimensions.get('window').width; //full width
import * as Progress from 'react-native-progress';

const Dashboard = () => {
    return (
        <View style={styles.container} >
            <StatusBar style="auto" />
            <ScrollView>
            <View style={[styles.dashboardHeader, styles.boxShadow]}>
                <View style={styles.dashboardContainer}>

                    <View style={styles.headerImageContainer}>
                        <Image source={require('../assets/images/icontest.png')} style={styles.headerIconStyle}></Image>
                    </View>

                    <View style={styles.headerUserInfo}>
                        <Text style={styles.headerUser}>Merhaba Ömer</Text>
                        <Text style={styles.headerUserLevel}>Seviye 25 - Kitap Kurdu</Text>
                        <Progress.Bar style={styles.progressBar} width={112} />

                    </View>


                    <View style={styles.pointsContainer}>

                        <Text
                            style={styles.pointsTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            1750
                        </Text>

                        <Image
                            source={require('../assets/images/iconStar.png')}
                            style={styles.pointsIconStyle}>
                        </Image>

                    </View>



                </View>

                <View style={styles.dashboardRosettes}>
                    <View style={styles.headerImageContainer3}>
                        <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle3}></Image>
                    </View>
                    <View style={styles.headerImageContainer2}>
                        <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle2}></Image>
                    </View>
                    <View style={styles.headerImageContainer1}>
                        <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle1}></Image>
                    </View>
                    <View style={styles.headerImageContainer}>
                        <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle}></Image>
                    </View>
                </View>
            </View>

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
                            <Text style={styles.userStatistics}>105</Text>
                            <Text style={styles.userStatisticsTitle}>Sayfa Okundu</Text>
                        </View>
                        <View style={styles.statisticsMainFirstRowElem}>
                            <Text style={styles.userStatistics}>105</Text>
                            <Text style={styles.userStatisticsTitle}>Kelime Okundu</Text>
                        </View>
                    </View>

                    <View style={styles.statisticsMainSecondRow}>
                        <View style={styles.statisticsMainFirstRowElem}>
                            <Text style={styles.userStatistics}>105</Text>
                            <View style={styles.userStatisticTitleCustomView}>
                                <Text style={styles.userStatisticsTitle}>Quiz</Text>
                                <Text style={styles.userStatisticsTitle}>Tamamlandı</Text>
                            </View>
                        </View>
                        <View style={styles.statisticsMainFirstRowElem}>
                            <Text style={styles.userStatistics}>105</Text>
                            <View style={styles.userStatisticTitleCustomView}>
                                <Text style={styles.userStatisticsTitle}>Toplam Puan</Text>
                                <Text style={styles.userStatisticsTitle}>Kazanıldı</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.rosettes}>
                <View style={styles.statisticsHeader}>
                    <Text style={styles.statisticsText}>Rozetler</Text>
                    <View style={styles.statisticsLine}></View>
                </View>
                <View style={styles.rosettesMain}>
                    <View style={styles.statisticsMainFirstRow}>
                        <View style={styles.headerImageContainer1}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle1}></Image>
                        </View>
                        <View style={styles.headerImageContainer2}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle2}></Image>
                        </View>
                        <View style={styles.headerImageContainer3}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle3}></Image>
                        </View>
                        <View style={styles.headerImageContainer4}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle4}></Image>
                        </View>

                    </View>
                    <View style={styles.statisticsMainFirstRow}>
                        <View style={styles.headerImageContainer1}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle1}></Image>
                        </View>
                        <View style={styles.headerImageContainer2}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle2}></Image>
                        </View>
                        <View style={styles.headerImageContainer3}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle3}></Image>
                        </View>
                        <View style={styles.headerImageContainer4}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.headerIconStyle4}></Image>
                        </View>

                    </View>


                    {/* 
                    <View style={styles.statisticsMainSecondRow}>
                        <View style={styles.statisticsMainFirstRowElem}>
                            <Text style={styles.userStatistics}>105</Text>
                            <Text style={styles.userStatisticsTitle}>Quiz Tamamlandı</Text>
                        </View>
                        <View style={styles.statisticsMainFirstRowElem}>
                            <Text style={styles.userStatistics}>105</Text>
                            <Text style={styles.userStatisticsTitle} >Toplam Puan Kazanıldı</Text>
                        </View>
                    </View> */}
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.yellowLight,
    },

    statisticsHeader: {
        flexDirection: 'row',
        width: width,
        paddingRight: 50
    },
    statisticsLine: {
        backgroundColor: 'green',
        width: width,
        height: 8,
        alignSelf: 'center',
        marginTop: 5,
        marginLeft: 10

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
    },
    rosettes: {
        padding: 20,
    },
    statisticsMain: {
        padding: 20,
    },
    rosettesMain: {
        padding: 10,
        flexDirection: 'column'
    },
    statisticsMainFirstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    statisticsMainFirstRowElem: {
        flexDirection: 'column',
    },


    dashboardHeader: {
        width: width,
        height: '32%',
        paddingTop: '15%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingLeft: '5%',
        paddingRight: '5%',

        backgroundColor: colors.yellowBorder
    },
    dashboardContainer: {
        flexDirection: 'row',
    },

    userStatisticTitleCustomView: {
        textAlign: 'center'
    },

    headerUserInfo: {
        display: 'flex',
        paddingLeft: 10,
        paddingTop: 2,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15
    },

    headerUser: {
        fontSize: 24,
        fontFamily: 'Comic-Regular',

    },
    headerUserLevel: {
        marginTop: '1%',
        fontFamily: 'Comic-Light',
        marginLeft: -10
    },

    loginButton: {
        alignItems: 'center',
        width: '85%',
        padding: 12,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    loginButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 23,
    },

    headerView1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 17,

    },

    headerView2: {
        position: 'absolute',
        right: '-7%',
        marginHorizontal: 20,
        marginTop: 15,
    },

    dashboardRosettes: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    headerImageContainer: {
        width: 70,
        height: 70,
        alignItems: 'center',
        paddingTop: 5,
        borderRadius: 35,
        borderColor: colors.pinkBorder,
        backgroundColor: colors.blueBorder,
    },



    headerIconStyle: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.blue,
    },

    headerImageContainer1: {
        width: 70,
        height: 70,
        alignItems: 'center',
        paddingTop: 5,
        borderRadius: 35,
        borderColor: colors.pinkBorder,
        backgroundColor: colors.brownBorder,
    },

    headerIconStyle1: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.brown,
    },

    headerImageContainer2: {
        width: 70,
        height: 70,
        alignItems: 'center',
        paddingTop: 5,
        borderRadius: 35,
        borderColor: colors.pinkBorder,
        backgroundColor: colors.grayBorder,
    },
    headerIconStyle2: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.gray,
    },

    headerImageContainer3: {
        width: 70,
        height: 70,
        alignItems: 'center',
        paddingTop: 5,
        borderRadius: 35,
        borderColor: colors.pinkBorder,
        backgroundColor: colors.greenBorder,
    },
    headerIconStyle3: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.green,
    },

    headerImageContainer4: {
        width: 70,
        height: 70,
        alignItems: 'center',
        paddingTop: 5,
        borderRadius: 35,
        borderColor: colors.pinkBorder,
        backgroundColor: colors.blueBorder,
    },
    headerIconStyle4: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.blue,
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

    headerTextStyle: {
        fontFamily: 'Comic-Regular',
        marginLeft: '2.5%',
        fontSize: 28,
        width: 200,
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
        borderColor: colors.yellowBorder,
        backgroundColor: colors.yellowTabBar,
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

    continueReadingHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 27,
        paddingLeft: 20,
        paddingTop: 20
    },

    otherBookHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 27,
        paddingLeft: 20,
        paddingTop: 10
    },

    continueReadingBookStyle: {
        width: 123,
        height: 200,
        marginTop: 10,
        marginRight: 15,
        marginBottom: 15
    },

    continueReadingBookStyleFirstItem: {
        width: 123,
        height: 210,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 25
    },

    otherBookStyle: {
        width: 123,
        height: 200,
        marginTop: 10,
        marginRight: 15
    },

    otherBookStyleFirstItem: {
        width: 123,
        height: 210,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 25
    },

    continueBookImageStyle: {
        width: 113,
        height: 190,
        borderRadius: 12,
    },

    otherBookImageStyle: {
        width: 113,
        height: 190,
        borderRadius: 12,
    },

    featuredBookBG: {
        width: width,
        height: 210,
        borderRadius: 12,
        marginTop: 10
    },

    progressBar: {
        marginTop: '3%',
        height: 12,
        width: '140%',
        marginLeft: 65,
        backgroundColor: colors.grayProgressBarBG,
        borderColor: colors.grayProgressBarBorder,
        borderWidth: 0.7,
    },

    featuredBookStyle: {
        borderWidth: 4,
        alignItems: 'flex-end',
        width: width,
        height: 210,
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 18,
        paddingTop: 6.5
    },

    featuredBookStyleFirstItem: {
        borderWidth: 4,
        alignItems: 'flex-end',
        width: width,
        height: 210,
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 18,
        paddingTop: 6.5
    },

    featuredBookTitle: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        zIndex: 1000,
        position: 'absolute',
        fontSize: 35,
        paddingTop: 25,
        paddingLeft: 20
    },

    featuredBookDescription: {
        fontFamily: 'Comic-Bold',
        zIndex: 1000,
        position: 'absolute',
        fontSize: 14,
        width: '63.5%',
        paddingTop: '28%',
        paddingLeft: 20
    },

})