import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';

const Settings = () => {

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
            <SafeAreaView>

                <ScrollView showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}>
                    <Text style={styles.settingsHeader}>Ayarlar</Text>

                    <Text style={styles.generalSettingsHeader}>Genel</Text>

                    <View style={styles.generalSettingsContainer}>

                        <TouchableOpacity style={[styles.rowContainer, { marginTop: '5%' }]} activeOpacity={0.5}>
                            <View style={styles.iconNotifBG}>
                                <IonIcons
                                    name="notifications-outline"
                                    size={35}
                                    color={colors.bluePFPBG}
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <TouchableOpacity style={styles.rowContainer} activeOpacity={0.6}>
                            <View style={styles.iconBookBG}>
                                <IonIcons
                                    name="book-outline"
                                    size={33}
                                    color='#000'
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <TouchableOpacity style={[styles.rowContainer, { marginBottom: '5%' }]} activeOpacity={0.6}>
                            <View style={styles.iconBookBG}>
                                <IonIcons
                                    name="book-outline"
                                    size={33}
                                    color='#000'
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.generalSettingsHeader}>Hesap</Text>

                    <View style={styles.generalSettingsContainer}>

                        <TouchableOpacity style={[styles.rowContainer, { marginTop: '5%' }]} activeOpacity={0.5}>
                            <View style={styles.iconNotifBG}>
                                <IonIcons
                                    name="notifications-outline"
                                    size={35}
                                    color={colors.bluePFPBG}
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <TouchableOpacity style={styles.rowContainer} activeOpacity={0.6}>
                            <View style={styles.iconBookBG}>
                                <IonIcons
                                    name="book-outline"
                                    size={33}
                                    color='#000'
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <TouchableOpacity style={[styles.rowContainer, { marginBottom: '5%' }]} activeOpacity={0.6}>
                            <View style={styles.iconBookBG}>
                                <IonIcons
                                    name="book-outline"
                                    size={33}
                                    color='#000'
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.generalSettingsHeader}>Lorem Ipsum</Text>

                    <View style={[styles.generalSettingsContainer, { marginBottom: '5%' }]}>

                        <TouchableOpacity style={[styles.rowContainer, { marginTop: '5%' }]} activeOpacity={0.5}>
                            <View style={styles.iconNotifBG}>
                                <IonIcons
                                    name="notifications-outline"
                                    size={35}
                                    color={colors.bluePFPBG}
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <TouchableOpacity style={styles.rowContainer} activeOpacity={0.6}>
                            <View style={styles.iconBookBG}>
                                <IonIcons
                                    name="book-outline"
                                    size={33}
                                    color='#000'
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
                        </TouchableOpacity>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <TouchableOpacity style={[styles.rowContainer, { marginBottom: '5%' }]} activeOpacity={0.6}>
                            <View style={styles.iconBookBG}>
                                <IonIcons
                                    name="book-outline"
                                    size={33}
                                    color='#000'
                                    style={styles.badgeIconStyle}
                                />
                            </View>
                            <Text style={styles.settingsText}>Lorem Ipsum</Text>
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
        marginTop: '10%'
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
        fontSize: 25,
        marginLeft: 10
    },

    iconNotifBG: {
        backgroundColor: colors.blueContainer,
        width: 46,
        height: 46,
        paddingLeft: 4,
        paddingRight: 2.5,
        paddingBottom: 2,
        paddingTop: 2,
        borderWidth: 2,
        borderColor: colors.blueBorder,
        borderRadius: 10
    },

    iconBookBG: {
        backgroundColor: colors.silverBadge,
        width: 46,
        height: 46,
        paddingLeft: 5.5,
        paddingRight: 2.5,
        paddingBottom: 2,
        paddingTop: 4,
        borderWidth: 2,
        borderColor: colors.silverBadgeBorder,
        borderRadius: 10
    },

    lineStyle: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#ffe1ad',
        marginRight: '6.5%',
        marginBottom: '3%',
        marginTop: '3%'
    }

})