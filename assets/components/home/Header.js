import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import colors from '../../colors/colors';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ProfileContext } from '../../contexts/ProfileContext';
import { auth, firebase } from '../../../firebase'

const Header = () => {

    const { currentProfileSelectedInfo, currentProfileSelected, userPointsData, setUserPointsData } = useContext(ProfileContext);

    const profileRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles');

    const getProfilePointsData = async () => {
        profileRef
            .onSnapshot(
                querySnapshot => {
                    const userPointsData = []
                    querySnapshot.forEach((doc) => {
                        const { points } = doc.data()
                        if (currentProfileSelected === doc.id) {
                            userPointsData.push({
                                points
                            })
                        }
                    })
                    setUserPointsData(userPointsData[0].points)
                }
            )
    }

    useEffect(() => {
        getProfilePointsData();
    }, [])

    return (
        <View style={styles.headerView1}>

            <IonIcons name="ios-book-outline" size={30} color="#000" style={styles.headerIconStyle} />

            <Text
                style={styles.headerTextStyle}
                adjustsFontSizeToFit={true}
                numberOfLines={1}>
                Hoşgeldin {typeof (currentProfileSelectedInfo) == 'undefined' ? "Default" : currentProfileSelectedInfo[0].name}
            </Text>

            <View style={styles.headerView2}>
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
        paddingTop: 4
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
        backgroundColor: colors.yellowRegular,
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
    },
})