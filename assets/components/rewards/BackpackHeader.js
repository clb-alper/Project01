import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../colors/colors';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { BoxShadow } from 'react-native-shadow';
import { ProfileContext } from '../../contexts/ProfileContext';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';

var widthOfScreen = Dimensions.get('window').width; //full width

const BackpackHeader = () => {

    const { currentProfileSelectedInfo, currentAccountInfo, profileIconList } = useContext(ProfileContext);

    const navigation = useNavigation();

    const shadowOpt = {
        width: widthOfScreen,
        height: 125,
        color: "#000",
        border: 15,
        radius: 39,
        opacity: 0.2,
        x: -1,
        y: -6,
    }

    return (
        <BoxShadow setting={shadowOpt} style={{ textShadow: 'none' }}>
            <View style={styles.login_container} >

                <View style={styles.headerView1}>

                    {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                        <Octicons name="arrow-left" size={38} color="#000" style={styles.goBackIcon} />
                    </TouchableOpacity> */}

                    <Text
                        style={styles.headerTextStyle}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>
                        Çıkartma Çantası
                    </Text>

                    <View style={styles.headerView2}>
                        <View style={styles.headerIconContainerStyle} backgroundColor={currentProfileSelectedInfo[0].profileColor["regularColor"]} borderColor={currentProfileSelectedInfo[0].profileColor["borderColor"]}>
                            <Image source={{ uri: profileIconList[currentProfileSelectedInfo[0].profileIcon]["image"] }} style={[styles.headerIconStyle, { tintColor: currentProfileSelectedInfo[0].profileColor["borderColor"] }]}></Image>
                        </View>
                    </View>
                </View>
            </View >
        </BoxShadow>
    )
}

export default BackpackHeader

const styles = StyleSheet.create({

    login_container: {
        backgroundColor: colors.purpleRegular,
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
        fontSize: 35,
        marginLeft: 10
    },

    headerView1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 60,
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
        backgroundColor: colors.purpleRegular,
        paddingLeft: 12,
    },

    pointsTextStyle: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 35,
        width: 55,
    },

    pointsIconStyle: {
        //resizeMode: 'contain',
        height: 35,
        width: 35,
        marginLeft: 5,
        marginTop: 5
    },

    goBackButton: {
        marginLeft: '2%'
    },

    goBackIcon: {
        marginTop: 12,
    },

    headerIconContainerStyle: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
        borderRadius: 100,
        borderWidth: 4,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: -11
    },

    headerIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        marginLeft: 8.5
    },

})