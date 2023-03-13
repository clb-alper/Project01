import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '../../colors/colors';
import AntIcons from 'react-native-vector-icons/AntDesign';

const Header = () => {

    return (
        < View style={[styles.login_container, styles.shadowProp]} >

            <View style={styles.headerView1}>

                <Text
                    style={styles.headerTextStyle}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}>
                    Ödüller
                </Text>

                <View style={styles.headerView2}>
                    <View style={styles.pointsContainer}>

                        <Text
                            style={styles.pointsTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            1750
                        </Text>

                        <AntIcons name="star" size={30} color="#FFD600" style={styles.pointsIconStyle} />

                    </View>
                </View>
            </View>



        </View >
    )
}

export default Header

const styles = StyleSheet.create({

    login_container: {
        backgroundColor: colors.purpleHeaderContainer,
        width: '100%',
        height: 125,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8,
    },

    headerTextStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 57,
    },

    headerView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 50,
    },

    headerView2: {
        position: 'absolute',
        right: '-4.5%',
        marginHorizontal: 20,
        marginTop: 15,
    },

    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 42,
        width: 117,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleHeaderContainer,
        paddingLeft: 12,
    },

    pointsTextStyle: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 35,
        width: 55,
    },

    pointsIconStyle: {
        resizeMode: 'contain',
        height: 35,
        width: 35,
        marginLeft: 5,
        marginTop: 5
    },


})