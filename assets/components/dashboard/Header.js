import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import colors from '../../colors/colors';
import * as Progress from 'react-native-progress';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { BoxShadow } from 'react-native-shadow';
import { ProfileContext } from '../../contexts/ProfileContext';

var widthOfScreen = Dimensions.get('window').width; //full width

const Header = () => {

    const { currentProfileSelectedInfo, userPointsData } = useContext(ProfileContext);

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
                            {userPointsData}
                        </Text>

                        <AntIcons name="star" size={23} color="#FFD600" style={styles.pointsIconStyle} />

                    </View>
                </View>

                <View style={styles.dashboardRosettes}>

                    <View style={styles.silverBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>
                    <View style={styles.goldBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>
                    <View style={styles.emeraldBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>
                    <View style={styles.diamondBadgeStyle}>
                        <IonIcons name="ios-book-outline" size={48} color="#000" style={styles.badgeIconStyle} />
                    </View>

                </View>
            </View>
        </BoxShadow>
    )
}

export default Header;

const styles = StyleSheet.create({

    dashboardHeader: {
        paddingTop: '15%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
        paddingBottom: 20

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