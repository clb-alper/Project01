import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../assets/components/library/Header';
import AlphabetSlider from '../assets/components/library/AlphabetSlider';
import BookModal from '../assets/components/BookModal';
import BookShowcase from '../assets/components/library/BookShowcase';
import { ModalContext } from '../assets/contexts/ModalContext';

var heightOfScreen = Dimensions.get('window').height; //full width

const Library = () => {

    const { modalVisible } = useContext(ModalContext);

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

        <View style={styles.libraryBG} onLayout={onLayoutRootView}>

            {modalVisible ? <StatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <StatusBar style="hidden" />}

            <SafeAreaView edges={['right', 'left', 'bottom']}>

                <Header />

                <AlphabetSlider />

                <ScrollView
                    overScrollMode={'never'}
                    showsVerticalScrollIndicator={false}
                    style={[styles.FlatsScrollViewStyle, { width: '100%' }, { flexWrap: 'wrap' }]}
                    horizontal={false} >

                    <BookModal />

                    <BookShowcase />

                </ScrollView>

            </SafeAreaView>
        </View>
    )
}

export default Library

const styles = StyleSheet.create({

    libraryBG: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: colors.blueLight,
    },

    FlatsScrollViewStyle: {
        marginLeft: 50,
        height: heightOfScreen * 0.79,
    },

})