import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, TouchableHighlight, KeyboardAvoidingView, Dimensions, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const ProfileSelect = ({ navigation }) => {

    var [isPress, setIsPress] = React.useState(false);

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

    var touchPropsLoginButton = {
        activeOpacity: 1,
        underlayColor: '#ffe0e7',
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        //onPress: () => console.log("Giriş Yapıldı")
        onPress: () => navigation.navigate('MainScreen')

    };

    return (
        <View style={styles.profileSelectContainer} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            <ImageBackground source={require('../assets/images/loginbghd.jpg')} style={styles.backgroundImage}>
                <View style={styles.profileSelectChildContainer}>
                    <Text style={{color: colors.white}}>ProfileSelect</Text>
                    <TouchableHighlight {...touchPropsLoginButton} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>{"Cont"}</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        </View>
    )
}

export default ProfileSelect

const styles = StyleSheet.create({
    profileSelectContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileSelectChildContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },

    backgroundImage: {
        position: 'absolute',
        width: widthOfScreen,
        height: heightOfScreen,

    },

    backgroundDarkener: {
        backgroundColor: 'red',
    },

    loginButton: {
        alignItems: 'center',
        width: '85%',
        padding: 12,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    loginButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 23,
    },

})