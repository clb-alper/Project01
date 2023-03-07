import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import booksListData from '../assets/data/booksListData';
import { BoxShadow } from 'react-native-shadow';
import * as Progress from 'react-native-progress';

var width = Dimensions.get('window').width; //full width

const Dashboard = () => {

    var [isPress, setIsPress] = React.useState(false);

    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            <SafeAreaView edges={['right', 'left']}>

                <View style={[styles.dashboardHeader, styles.boxShadow]}>
                    <View style={styles.dashboardContainer}>

                        <View style={styles.headerIconContainerStyle}>
                            <Image source={require('../assets/images/icontest.png')} style={styles.headerIconStyle}></Image>
                        </View>

                        <View style={styles.headerUserInfo}>
                            <Text style={styles.headerUser}>Merhaba Ömer</Text>
                            <Text style={styles.headerUserLevel}>Seviye 25 - Kitap Kurdu</Text>
                            <Progress.Bar style={styles.progressBar} progress={0.75} height={7.5} width={250} color={colors.greenDashboardBar} />

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
                        <View style={styles.silverBadgeStyle}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                        </View>
                        <View style={styles.goldBadgeStyle}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                        </View>
                        <View style={styles.emeraldBadgeStyle}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                        </View>
                        <View style={styles.diamondBadgeStyle}>
                            <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                        </View>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}>

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

                    <View style={styles.rosettes}>
                        <View style={styles.statisticsHeader}>
                            <Text style={styles.statisticsText}>Rozetler</Text>
                            <View style={styles.badgesLine}></View>
                        </View>
                        <View style={styles.rosettesMain}>
                            <View style={styles.statisticsMainFirstRow}>
                                <View style={styles.bronzeBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.silverBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.goldBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.emeraldBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>

                            </View>
                            <View style={styles.statisticsMainFirstRow}>
                                <View style={styles.diamondBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.bronzeBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.silverBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.goldBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>

                            </View>

                            <View style={styles.statisticsMainFirstRow}>
                                <View style={styles.bronzeBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.silverBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.goldBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                                </View>
                                <View style={styles.emeraldBadgeStyle}>
                                    <Image source={require('../assets/images/iconBook.png')} style={styles.badgeIconStyle}></Image>
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
            </SafeAreaView>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.greenLight,
    },

    statisticsHeader: {
        flexDirection: 'row',
        width: width,
        paddingRight: 50
    },
    statisticsLine: {
        backgroundColor: colors.greenSpacer,
        width: width / 1.95,
        height: 8,
        alignSelf: 'center',
        marginTop: 5,
        marginLeft: 15,
    },
    badgesLine: {
        backgroundColor: colors.greenSpacer,
        width: width / 1.70,
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
        flexDirection: 'column',
        marginTop: 10,
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
        height: 240,
        paddingTop: '15%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingLeft: '5%',
        paddingRight: '5%',

        backgroundColor: colors.greenHeaderContainer
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
        fontSize: 26,
        fontFamily: 'Comic-Regular',

    },
    headerUserLevel: {
        marginTop: '1%',
        fontFamily: 'Comic-Regular',
        marginLeft: -25,
        fontSize: 14,
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
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    headerIconContainerStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: colors.blueRegular,
        borderWidth: 4,
        borderColor: colors.bluePFPBG,

    },

    headerIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        tintColor: colors.blueLight

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

    badgeIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        marginBottom: 5,
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
        borderColor: colors.greenSpacer,
        backgroundColor: colors.greenHeaderContainer,
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
        width: '100%',
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