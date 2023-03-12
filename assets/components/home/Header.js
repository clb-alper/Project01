import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import colors from '../../colors/colors';

const Header = () => {
    return (
        <View style={styles.headerView1}>

            <Image source={require('../../images/iconBook.png')} style={styles.headerIconStyle}></Image>

            <Text
                style={styles.headerTextStyle}
                adjustsFontSizeToFit={true}
                numberOfLines={1}>
                Hoşgeldin Ömer
            </Text>

            <View style={styles.headerView2}>
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
        </View>
    )
}

export default Header

const styles = StyleSheet.create({

    headerView1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 17,
    },

    headerIconStyle: {
        resizeMode: 'contain',
        height: 35,
        width: 35,
    },

    headerTextStyle: {
        fontFamily: 'Comic-Regular',
        marginLeft: '2.5%',
        fontSize: 28,
        width: 200,
    },

    headerView2: {
        position: 'absolute',
        right: '-7%',
        marginHorizontal: 20,
        marginTop: 15,
    },

    pointsContainer: {
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
})