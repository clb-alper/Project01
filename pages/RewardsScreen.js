import React, { useContext } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../assets/components/rewards/Header';
import { ModalContext } from '../assets/contexts/ModalContext';
import StickerModal from '../assets/components/rewards/StickerModal';
import MainContainer from '../assets/components/rewards/MainContainer';
import FocusAwareStatusBar from '../assets/components/FocusAwareStatusBar';
import { RewardsContext } from '../assets/contexts/RewardsContext';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const RewardsScreen = ({ navigation }) => {

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

            <TouchableOpacity onPress={() => { navigation.navigate('Backpack') }}
                activeOpacity={0.75} style={{ zIndex: 500 }}>
                <View style={styles.backpackButton}>
                    <Image style={{width: 40, height: 40, alignSelf: 'center', marginTop: 12, tintColor: '#716696'}} 
                    source={require('../assets/images/backpack.png')}></Image>
                </View>
            </TouchableOpacity>

            <FocusAwareStatusBar style="auto" />
            {/* {stickerModalVisible ? <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'#4A4B4D'} animated={true} /> : <FocusAwareStatusBar style="hidden" />} */}

            <SafeAreaView edges={['right', 'left']}>

                <Header />

            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                style={{ zIndex: 0 }}>

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

    backpackButton: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 500,
        backgroundColor: colors.purpleRegular,
        borderColor: colors.purpleBorder,
        marginRight: 20,
        position: 'absolute',
        top: heightOfScreen * 0.83,
        left: widthOfScreen * 0.78,
        zIndex: 500
    }

})