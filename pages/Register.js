import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';
import { auth } from '../firebase';
import { sendEmailVerification } from "firebase/auth";


const Register = ({ navigation }) => {

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();





    const handleSignUp = (userCredetials) => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = userCredetials.user;
                console.log('Registered with:', user.email);
                sendEmailVerification(auth.currentUser)
                //not working properly


            })
            // CHECK FOR MORE ALERT SETTINGS 
            // https://reactnative.dev/docs/alert
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert("Bu mail adresi kullanılıyor.")
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        "Kayıt Hatası",
                        "Bu mail adresi geçerli değil.",
                    )
                }
            })

    }

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('user logged in:', user)
        } else {
            console.log(' user logged out')
        }
    })

//TODO : something like that should run;
    // const handleSignUp = async () => {
    //     try {
    //         await
    //             sendEmailVerification(auth.currentUser)
    //         auth
    //             .createUserWithEmailAndPassword(email, password)
    //     } catch (e) {
    //         console.log("hata hata hata", e)
    //     }
    // }




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
            <StatusBar style="auto" />
            <Image source={require('../assets/images/backgrounds/loginbghdlong.png')} style={styles.backgroundImage} />
            <View style={[styles.register_container, styles.shadowProp]}>
                <View style={styles.registerHeaderTextView}>
                    <Text style={styles.registerHeader}>Kayıt Ol</Text>
                </View>

                <TextInput
                    style={[styles.inputStyle, styles.emailInputStyle]}
                    placeholder="Email"
                    placeholderTextColor={'#B8B8B8'}
                    keyboardType="text"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Şifre"
                    placeholderTextColor={'#B8B8B8'}
                    secureTextEntry={true}
                    keyboardType="text"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Şifre (Tekrar)"
                    placeholderTextColor={'#B8B8B8'}
                    secureTextEntry={true}
                    keyboardType="text"
                />

                <TouchableOpacity onPress={handleSignUp} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>{"Kayıt Ol"}</Text>
                </TouchableOpacity>

                <KeyboardAvoidingView style={{}} behavior="padding">
                    <View style={styles.signUpTextView}>
                        <Text style={styles.signUpText1}>{"Zaten hesabın var mı? "}</Text>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signUpText2}>{"Giriş yap"}</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>


            </View>
        </View>
    );
}

export default Register;

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

    register_container: {
        backgroundColor: colors.white,
        width: '100%',
        height: '58%',
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

    emailInputStyle: {
        marginTop: '3.5%',
    },

    registerHeaderTextView: {
        padding: 15,
    },

    registerHeader: {
        fontFamily: 'Comic-Regular',
        fontSize: 40,
    },

    registerButton: {
        alignItems: 'center',
        width: '85%',
        padding: 12,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    registerButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 23,
    },

    signUpTextView: {
        top: '12%',
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