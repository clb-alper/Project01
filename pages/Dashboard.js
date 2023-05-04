import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalContext } from '../assets/contexts/ModalContext';
import Header from '../assets/components/dashboard/Header';
import BadgesSection from '../assets/components/dashboard/BadgesSection';
import StatisticsSection from '../assets/components/dashboard/StatisticsSection';
import BadgeModal from '../assets/components/dashboard/BadgeModal';

const Dashboard = () => {

    const { badgeModalVisible } = useContext(ModalContext);

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


            {badgeModalVisible ? <StatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <StatusBar style="hidden" />}

            <SafeAreaView edges={['right', 'left']}>

                <Header />

            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                style={{ zIndex: -50 }}>

                <BadgeModal />

                <StatisticsSection />

                <BadgesSection />

            </ScrollView>

        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.greenLight,
    },

})