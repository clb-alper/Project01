import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Button, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';

const Login = () => {
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
        style: isPress ? styles.loginButtonPressed : styles.loginButton,
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => console.log("Giriş Yapıldı")
    };

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            <Image source={require('../assets/images/firstbg.png')} style={styles.backgroundImage} />
            <View style={[styles.login_container, styles.shadowProp]}>
                <View style={styles.textView}>
                    <Text style={styles.loginHeader}>Giriş Yap</Text>
                </View>

                <TextInput
                    style={[styles.inputStyle, styles.emailInputStyle]}
                    placeholder="Email"
                    placeholderTextColor={'#B8B8B8'}
                    keyboardType="text"
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Şifre"
                    placeholderTextColor={'#B8B8B8'}
                    keyboardType="text"
                />

                {/* <Pressable onPress={() => alert("Giriş Yapıldı")} style={[styles.loginButton, pressed ? styles.loginButtonPressed : null]}>
                    <Text style={styles.loginButtonText}>{"Giriş Yap"}</Text>
                </Pressable> */}

                <TouchableHighlight {...touchPropsLoginButton} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>{"Giriş Yap"}</Text>
                </TouchableHighlight>

                <Pressable onPress={() => console.log("Şifre unuttum'a basıldı")} style={styles.forgotPassButton}>
                    <Text style={styles.forgotPassButtonText}>{"Şifremi Unuttum?"}</Text>
                </Pressable>

                <View style={styles.signUpTextView}>
                    <Text style={styles.signUpText1}>{"Hesabın yok mu? "}</Text>
                    <Pressable onPress={() => console.log("Kayıt Ol'a basıldı")}>
                        <Text style={styles.signUpText2}>{"Kayıt Ol"}</Text>
                    </Pressable>
                    {/* <Text style={styles.signUpText2}>{"Kayıt Ol"}</Text> */}
                </View>


            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },

    login_container: {
        backgroundColor: colors.white,
        width: '100%',
        height: '53%',
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
        width: 350,
        height: 55,
        marginBottom: 27,
        backgroundColor: colors.white,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#DDD",
        paddingLeft: 25,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 23,
    },

    emailInputStyle: {
        marginTop: 15,

    },

    textView: {
        padding: 15,
    },

    loginHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 40,
    },

    loginButton: {
        alignItems: 'center',
        width: 350,
        padding: 12,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    loginButtonPressed: {

    },

    loginButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 23,
    },

    forgotPassButton: {
        // backgroundColor: colors.pinkRegular,
        alignSelf: 'flex-end',
        marginRight: 25,
        marginTop: 5,
    },

    forgotPassButtonText: {
        fontFamily: 'Comic-Light',
        padding: 10,
        fontSize: 16.5,
        textDecorationLine: 'underline',
    },

    signUpTextView: {
        marginTop: 65,
        flexDirection: 'row',
    },

    signUpText1: {
        fontFamily: 'Comic-Light',
        fontSize: 16.5,
    },

    signUpText2: {
        fontFamily: 'Comic-Bold',
        fontSize: 16.5,
        textDecorationLine: 'underline',
        color: colors.blueRegular,
    }

});