import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const ForgotPass = ({ navigation }) => {
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

    var touchPropsSendButton = {
        activeOpacity: 1,
        underlayColor: '#ffe0e7',
        style: isPress ? styles.loginButtonPressed : styles.loginButton,
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Gönderildi',
                textBody: 'Geçici şifreniz emailinize gönderildi.',
            })
            setTimeout(() => {
                navigation.navigate('Login')
            }, 1500)    
        }
    };

    return (
        <AlertNotificationRoot>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar style="auto" />
                <Image source={require('../assets/images/loginbghdlong.png')} style={styles.backgroundImage} />
                <View style={[styles.forgotpass_container, styles.shadowProp]}>
                    <View style={styles.forgotPassHeaderView}>
                        <Text style={styles.forgotPassHeader}>Şifremi Unuttum</Text>
                    </View>

                    <Text style={styles.descriptionStyle}>
                        Geçici şifrenizi almak için hesabınıza bağlı e-mail adresinizi giriniz.
                    </Text>

                    <TextInput
                        style={[styles.inputStyle, styles.emailInputStyle]}
                        placeholder="Email"
                        placeholderTextColor={'#B8B8B8'}
                        keyboardType="text"
                    />

                    <TouchableHighlight {...touchPropsSendButton} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>{"Gönder"}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </AlertNotificationRoot>
    );
}

export default ForgotPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backgroundImage: {
        resizeMode: 'contain',
        width: '110%',
    },

    forgotpass_container: {
        backgroundColor: colors.white,
        width: '100%',
        height: '42%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },

    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 13,
    },

    inputStyle: {
        fontFamily: 'Comic-Light',
        width: '85%',
        marginBottom: '6.5%',
        backgroundColor: colors.white,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#DDD",
        paddingLeft: 25,
        paddingTop: 11,
        paddingBottom: 11,
        fontSize: 23,
    },

    descriptionInputStyle: {
        marginTop: '3.5%',
    },

    descriptionStyle: {
        fontFamily: 'Comic-Regular',
        width: '85%',
        marginTop: '1%',
        textAlign: 'justify',
        fontSize: 17,
    },

    emailInputStyle: {
        marginTop: '4.5%',
    },

    forgotPassHeaderView: {
        padding: 15,
    },

    forgotPassHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 40,
    },

    sendButton: {
        alignItems: 'center',
        width: '85%',
        padding: 12,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    sendButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 23,
    },

});