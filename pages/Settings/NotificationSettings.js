import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { ModalContext } from '../../assets/contexts/ModalContext';

const NotificationSettings = () => {

    const navigation = useNavigation();

    const { modalVisible } = useContext(ModalContext);

    // Contexte Koy
    const [isEnabled1st, setIsEnabled1st] = useState(false);
    const toggleSwitch1st = () => setIsEnabled1st(!isEnabled1st);

    const [isEnabled2nd, setIsEnabled2nd] = useState(false);
    const toggleSwitch2nd = () => setIsEnabled2nd(!isEnabled2nd);

    const [isEnabled3rd, setIsEnabled3rd] = useState(false);
    const toggleSwitch3rd = () => setIsEnabled3rd(!isEnabled3rd);


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

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}
                >
                    <View style={styles.notifSettingHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                            <Octicons name="arrow-left" size={38} color="#000" style={styles.goBackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.settingsHeader}>Bildirimler</Text>
                    </View>

                    <Text style={styles.generalSettingsHeader}>Uygulama</Text>
                    <View style={styles.generalSettingsContainer}>

                        <View
                            style={[styles.rowContainer, { marginTop: '3%' }]}>
                            <Text style={styles.settingsText}>Bildirimler</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.blueBorder }}
                                thumbColor={isEnabled1st ? colors.blueContainer : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch1st}
                                value={isEnabled1st}
                                style={{ height: 5, marginRight: '7%' }}
                            />
                        </View>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <View
                            style={styles.rowContainer}>
                            <Text style={styles.settingsText}>Bildirimler</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.blueBorder }}
                                thumbColor={isEnabled2nd ? colors.blueContainer : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2nd}
                                value={isEnabled2nd}
                                style={{ height: 5, marginRight: '7%' }}
                            />
                        </View>


                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <View
                            style={[styles.rowContainer, { marginBottom: '3%' }]}>
                            <Text style={styles.settingsText}>Bildirimler</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.blueBorder }}
                                thumbColor={isEnabled3rd ? colors.blueContainer : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch3rd}
                                value={isEnabled3rd}
                                style={{ height: 5, marginRight: '7%' }}
                            />
                        </View>
                    </View>

                    <Text style={styles.generalSettingsHeader}>Hesap</Text>
                    <View style={styles.generalSettingsContainer}>

                        <View
                            style={[styles.rowContainer, { marginTop: '3%' }]}>
                            <Text style={styles.settingsText}>Bildirimler</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.blueBorder }}
                                thumbColor={isEnabled1st ? colors.blueContainer : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch1st}
                                value={isEnabled1st}
                                style={{ height: 5, marginRight: '7%' }}
                            />
                        </View>

                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <View
                            style={styles.rowContainer}>
                            <Text style={styles.settingsText}>Bildirimler</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.blueBorder }}
                                thumbColor={isEnabled2nd ? colors.blueContainer : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2nd}
                                value={isEnabled2nd}
                                style={{ height: 5, marginRight: '7%' }}
                            />
                        </View>


                        {/* Line Seperator */}
                        <View style={styles.lineStyle} />

                        <View
                            style={[styles.rowContainer, { marginBottom: '3%' }]}>
                            <Text style={styles.settingsText}>Bildirimler</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: colors.blueBorder }}
                                thumbColor={isEnabled3rd ? colors.blueContainer : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch3rd}
                                value={isEnabled3rd}
                                style={{ height: 5, marginRight: '7%' }}
                            />
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default NotificationSettings

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.yellowLight
    },

    settingsHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 50,
        marginLeft: '5%',
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
        justifyContent: 'space-between'
    },

    settingsText: {
        fontFamily: 'Comic-Regular',
        fontSize: 22,
        marginLeft: '1%'
    },

    iconNotifBG: {
        backgroundColor: colors.blueContainer,
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
        backgroundColor: colors.silverBadge,
        width: 35,
        height: 35,
        paddingLeft: 5,
        paddingRight: 2.5,
        paddingBottom: 2,
        paddingTop: 4,
        borderWidth: 2,
        borderColor: colors.silverBadgeBorder,
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

    notifSettingHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    goBackButton: {
        marginLeft: '5%'
    },

    goBackIcon: {
        marginTop: 12,
    },
})