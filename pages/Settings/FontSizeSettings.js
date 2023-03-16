import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import { ModalContext } from '../../assets/contexts/ModalContext';
import Slider from '@react-native-community/slider';

const FontSizeSettings = () => {

    const navigation = useNavigation();

    const { modalVisible } = useContext(ModalContext);

    const [fontSizeNum, setFontSizeNum] = useState(14);

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
                        <Text style={styles.settingsHeader}>Yazı Boyutu</Text>
                    </View>

                    <Text style={styles.generalSettingsHeader}>Yazı Görünümü</Text>
                    <View style={styles.generalSettingsContainer}>

                        <View
                            style={[styles.rowContainer, { marginTop: '3%' }]}>
                            <Text style={[styles.settingsText, {fontSize: fontSizeNum}]}>Bildirimler</Text>

                        </View>

                    </View>

                    <Text style={styles.generalSettingsHeader}>Boyut Ayarı</Text>
                    <View style={styles.generalSettingsContainer}>

                        <View style={styles.numberContainer}>
                            <Text style={styles.sliderNumText}>10</Text>
                            <Text style={styles.sliderNumText}>18</Text>
                            <Text style={styles.sliderNumText}>26</Text>
                        </View>
                        <Slider
                            style={{ width: 250, height: 40 }}
                            minimumValue={10}
                            maximumValue={26}
                            step={1}
                            value={fontSizeNum}
                            onValueChange={(event) => setFontSizeNum(event)}
                            minimumTrackTintColor={colors.blueBorder}
                            maximumTrackTintColor="#000000"
                        />

                        <Text>{fontSizeNum}</Text>

                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default FontSizeSettings;

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

    numberContainer: {
        width: '93%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    sliderNumText: {
        fontFamily: 'Comic-Regular',
    }
})