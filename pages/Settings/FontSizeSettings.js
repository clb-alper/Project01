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
import { ProfileContext } from '../../assets/contexts/ProfileContext';

const FontSizeSettings = () => {

    const navigation = useNavigation();

    const { modalVisible } = useContext(ModalContext);
    const { userPrefFontSize, setUserPrefFontSize } = useContext(ProfileContext);

    const [fontSizeNum, setFontSizeNum] = useState(20);

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
                    <View style={styles.fontSizeSettingHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                            <Octicons name="arrow-left" size={38} color="#000" style={styles.goBackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.fontSizeSettingsHeader}>Yazı Boyutu</Text>
                    </View>

                    <Text style={styles.textViewHeader}>Yazı Görünümü</Text>

                    <View style={styles.textViewContainer}>

                        <ScrollView
                            overScrollMode={'never'}
                        >
                            <View
                                style={[styles.rowContainer, { marginTop: '3%' }]}>
                                <Text style={[styles.textViewText, { fontSize: userPrefFontSize }]}>
                                    Mehmet, ailesi ile gemide yolculuk yaparken aniden fırtına çıkıyor ve kendilerini bir adada buluyorlar. Mehmet, uyandıgında kendisini kumsal bir bölgenin üstünde buluyor. İlk olarak ailesini bulmaya başlayan Mehmet, ilk önce babasını görüyor ve daha sonra da annesini buluyor. Mehmet ve ailesi iyi durumda fakat ne gemiden, ne de gemideki diğer yolculardan bir iz var. Sanki herkes yok olmuş gibi.
                                </Text>

                            </View>
                        </ScrollView>

                    </View>

                    <Text style={styles.textViewHeader}>Boyut Ayarı</Text>

                    <View style={styles.textFontSizeContainer}>

                        <View style={styles.numberContainer}>
                            <Text style={styles.sliderNumText}>16</Text>
                            <Text style={styles.sliderNumText}>20</Text>
                            <Text style={styles.sliderNumText}>24</Text>

                        </View>

                        <View style={styles.sliderContainer}>
                            <Slider
                                style={[styles.sliderStyle, { width: 292, height: 30 }]}
                                minimumValue={16}
                                maximumValue={24}
                                step={1}
                                value={userPrefFontSize}
                                onValueChange={(e) => setUserPrefFontSize(e)}
                                minimumTrackTintColor={colors.blueRegular}
                                maximumTrackTintColor="#000000"
                                thumbTintColor={colors.blueRegular}
                            />

                            <Text style={styles.sliderSideText}>{fontSizeNum}</Text>

                        </View>
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

    fontSizeSettingsHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 50,
        marginLeft: '5%',
        marginTop: '3%'
    },

    textViewHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        marginLeft: '7%',
        marginTop: '10%'
    },

    textViewContainer: {
        backgroundColor: '#FFF1D9',
        marginTop: '3%',
        marginLeft: '7.5%',
        marginRight: '7.5%',
        paddingLeft: '5%',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#ffe1ad',
        height: 280
    },

    textFontSizeContainer: {
        backgroundColor: '#FFF1D9',
        marginTop: '3%',
        marginLeft: '7.5%',
        marginRight: '7.5%',
        paddingLeft: '5%',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#ffe1ad',
    },

    rowContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },

    textViewText: {
        fontFamily: 'Comic-Regular',
        marginRight: '7%',
        marginBottom: '3%',
        textAlign: 'justify'
    },

    fontSizeSettingHeader: {
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
        marginTop: '3%',
        width: 280,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    sliderContainer: {
        marginBottom: '2%',
        width: 280,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    sliderNumText: {
        fontFamily: 'Comic-Regular',
        fontSize: 20
    },

    sliderSideText: {
        fontFamily: 'Comic-Regular',
        fontSize: 20,
        marginLeft: 4
    },

    sliderStyle: {
        marginLeft: -6
    }
})