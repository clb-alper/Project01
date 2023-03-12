import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../assets/components/rewards/Header';
import { ModalContext } from '../assets/contexts/ModalContext';
import StickerModal from '../assets/components/rewards/StickerModal';
import MainContainer from '../assets/components/rewards/MainContainer';

const RewardsScreen = () => {

    const { stickerModalVisible } = useContext(ModalContext);

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

            {stickerModalVisible ? <StatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <StatusBar style="hidden" />}

            <SafeAreaView edges={['right', 'left']}>

                <Header />

            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}>

                <StickerModal />

                <View style={{ marginTop: 10 }}>

                    <MainContainer />

                </View>

            </ScrollView>

        </View>
    )
}

export default RewardsScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.purpleLight,
    },

})