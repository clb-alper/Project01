import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import colors from '../../colors/colors';
import * as Progress from 'react-native-progress';

var widthOfScreen = Dimensions.get('window').width; //full width

const Header = () => {
    return (
        <View style={[styles.dashboardHeader, styles.boxShadow]}>
            <View style={styles.dashboardContainer}>

                <View style={styles.headerIconContainerStyle}>
                    <Image source={require('../../images/icontest.png')} style={styles.headerIconStyle}></Image>
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
                        source={require('../../images/iconStar.png')}
                        style={styles.pointsIconStyle}>
                    </Image>

                </View>
            </View>

            <View style={styles.dashboardRosettes}>

                <View style={styles.silverBadgeStyle}>
                    <Image source={require('../../images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                </View>
                <View style={styles.goldBadgeStyle}>
                    <Image source={require('../../images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                </View>
                <View style={styles.emeraldBadgeStyle}>
                    <Image source={require('../../images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                </View>
                <View style={styles.diamondBadgeStyle}>
                    <Image source={require('../../images/iconBook.png')} style={styles.badgeIconStyle}></Image>
                </View>

            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    dashboardHeader: {
        width: widthOfScreen,
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

    dashboardRosettes: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',

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
        width: 50,
        height: 50,
        marginBottom: 5,
    },
})