import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { ModalContext } from '../../assets/contexts/ModalContext';
import { ProfileContext } from '../../assets/contexts/ProfileContext';

const Settings = () => {

    const navigation = useNavigation();

    const { modalVisible } = useContext(ModalContext);
    const { currentProfileSelectedInfo, currentAccountInfo, profileIconList } = useContext(ProfileContext);

    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../../assets/fonts/ComicNeue-Bold.ttf'),
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

            {modalVisible ? <StatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <StatusBar style="auto" />}

            <SafeAreaView>

                <ScrollView showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}>
                    <Text style={styles.settingsHeader}>Ayarlar</Text>

                    <View style={styles.dashboardContainer}>

                        <View style={styles.headerIconContainerStyle} backgroundColor={currentProfileSelectedInfo[0].profileColor["regularColor"]} borderColor={currentProfileSelectedInfo[0].profileColor["borderColor"]}>
                            <Image source={{uri: profileIconList[currentProfileSelectedInfo[0].profileIcon]["image"]}} style={[styles.headerIconStyle, { tintColor: currentProfileSelectedInfo[0].profileColor["borderColor"] }]}></Image>
                        </View>

                        <View style={styles.headerUserInfo}>
                            <Text style={styles.headerUser}
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}>
                                Profil Ismi: {typeof (currentProfileSelectedInfo) == 'undefined' ? "Default" : currentProfileSelectedInfo[0].name}</Text>
                            <Text style={styles.settingsHeaderEmail}
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}>
                                Hesap Emaili: {typeof (currentAccountInfo) == 'undefined' ? "Default" : currentAccountInfo[0].email}</Text>
                        </View>
                        <View style={[styles.headerUserInfo2, { marginLeft: 5 }]}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('ProfileSelect') }}
                                activeOpacity={0.6}>
                                <View style={styles.logOutButtonContainer}>
                                    <MaterialCommunityIcons
                                        name="logout"
                                        size={24}
                                        color={colors.black}
                                        style={styles.badgeIconStyle}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <Text style={styles.generalSettingsHeader}>Genel</Text>
                    <View style={styles.generalSettingsContainer}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("FontSizeSettings")}
                            style={[styles.rowContainer, { marginTop: '3%', marginBottom: '3%' }]}
                            activeOpacity={0.5}>
                            <View style={styles.iconBookBG}>
                                <IonIcons
                                    name="book-outline"
                                    size={23}
                                    color={'#000'}
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Yazı Boyutu</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.generalSettingsHeader}>Profil</Text>
                    <View style={styles.generalSettingsContainer}>

                        <TouchableOpacity
                            style={[styles.rowContainer, { marginTop: '3%', marginBottom: '3%' }]}
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate("ProfileEdit")}
                        >

                            <View style={styles.iconNotifBG}>
                                <MaterialCommunityIcons
                                    name="account-edit-outline"
                                    size={24}
                                    color={colors.black}
                                    style={styles.badgeIconStyle} />
                            </View>
                            <Text style={styles.settingsText}>Profil Düzenle</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </SafeAreaView>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.yellowLight
    },

    settingsHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 50,
        marginLeft: '7%',
        marginTop: '3%'
    },

    generalSettingsHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        marginLeft: '7%',
        marginTop: '7%'
    },

    generalSettingsContainer: {
        backgroundColor: '#FFF1D9',
        marginTop: '3%',
        marginLeft: '7.5%',
        marginRight: '7.5%',
        paddingLeft: '5%',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#ffe1ad'
    },

    rowContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },

    settingsText: {
        fontFamily: 'Comic-Regular',
        fontSize: 22,
        marginLeft: 10
    },

    iconNotifBG: {
        backgroundColor: colors.blueLibraryDropDown,
        width: 35,
        height: 35,
        paddingLeft: 4,
        paddingRight: 2.5,
        paddingBottom: 2,
        paddingTop: 2,
        borderWidth: 2,
        borderColor: colors.blueBorder,
        borderRadius: 10
    },

    iconBookBG: {
        backgroundColor: colors.pinkLight,
        width: 35,
        height: 35,
        paddingLeft: 5,
        paddingRight: 2.5,
        paddingBottom: 2,
        paddingTop: 4,
        borderWidth: 2,
        borderColor: colors.pinkBorder,
        borderRadius: 10
    },

    lineStyle: {
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: '#ffe1ad',
        marginRight: '6.5%',
        marginBottom: '3%',
        marginTop: '3%'
    },

    headerIconContainerStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
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
        width: 45,
        height: 45,
        marginLeft: 8.5
    },

    headerUserInfo: {
        marginTop: 22,
        paddingLeft: 10,
        paddingTop: 2,
        marginRight: 10
    },

    headerUserInfo2: {
        marginTop: 22,
        paddingLeft: 10,
        paddingTop: 2,
    },

    headerUser: {
        fontSize: 20,
        fontFamily: 'Comic-Regular',
        width: 180
    },

    dashboardContainer: {
        flexDirection: "row",
        backgroundColor: '#FFF1D9',
        marginTop: '7%',
        marginLeft: '7.5%',
        marginRight: '7.5%',
        paddingLeft: '5%',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#ffe1ad'
    },

    settingsHeaderEmail: {
        fontFamily: 'Comic-Regular',
        fontSize: 15,
        marginTop: 2,
        width: 180
    },

    logOutButtonContainer: {
        backgroundColor: colors.yellowRegular,
        borderWidth: 2,
        borderColor: colors.yellowBorder,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        padding: 4,
        paddingLeft: 6,
    }


})