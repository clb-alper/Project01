import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors';
import { auth, firebase } from '../../firebase';
import { TextInput } from 'react-native-gesture-handler';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const ProfileSelect = ({ navigation }) => {

    const [profileName, setProfileName] = useState();

    const [iconIndex, setIconIndex] = useState();
    const [colorIndex, setColorIndex] = useState(colors.pinkRegular);

    const handleProfileColor = (colorHandle) => {
        switch (colorHandle) {
            case 0:
                setColorIndex(colors.pinkRegular)
                break;
            case 1:
                setColorIndex(colors.blueRegular)
                break;
            case 2:
                setColorIndex(colors.greenHeaderContainer)
                break;
            case 3:
                setColorIndex(colors.yellowBorder)
                break;
            case 4:
                setColorIndex(colors.purpleLight)
                break;
            default:
                setColorIndex(colors.pinkRegular)
        }
    }

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

    const iconArray = [
        {
            id: 1,
            image: "require('../../assets/images/icontest.png')"
        },
        {
            id: 2,
            image: "require('../../assets/images/icontest.png')"
        },
        {
            id: 3,
            image: "require('../../assets/images/icontest.png')"
        },
        {
            id: 4,
            image: "require('../../assets/images/icontest.png')"
        },
        {
            id: 5,
            image: "require('../../assets/images/icontest.png')"
        },
    ]


    const handleCreateProfile = async () => {
        // // main user
        // firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
        //     email: firebase.auth().currentUser.email

        // })

        // sub user
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles').doc().set({
            name: profileName,
            profileIcon: iconIndex,
            profileColor: colorIndex,

        })

        // // sub user's continueReading
        // firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
        // .doc("user4").collection('continueReading').doc().set({
        //     bookId: '1',
        //     progressStatus: '32'
        // })


        // const snapshot = await firebase.firestore().collection('storyBooks').get()
        // snapshot.docs.map(doc => {
        //     console.log(doc.id)
        //     console.log(doc.data().bookProgress)
        // })
    }

  

    return (
        <View style={styles.profileSelectContainer} onLayout={onLayoutRootView}>
            <StatusBar style="light" />

            <ImageBackground source={require('../../assets/images/backgrounds/loginbghdlong.png')} style={styles.backgroundImage}>
                <View style={styles.profileSelectChildContainer}>
                </View>
            </ImageBackground>

            <SafeAreaView edges={['bottom', 'top']}>

                <View style={styles.iconMapStyle}>
                    <Text style={styles.profileSelectHeader}>Ikonlar</Text>

                    <View style={{ flexDirection: 'row', }}>
                        {iconArray.map((icon, index) => {
                            return (
                                <TouchableOpacity
                                    key={icon.key}
                                    onPress={() => setIconIndex(index)}
                                    activeOpacity={0.8}>

                                    <ImageBackground key={index} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/project01-b18cf.appspot.com/o/icontest.png?alt=media&token=77150489-0217-4492-800d-e493d0d2d2c5" }} style={{ width: 50, height: 50 }} >
                                    </ImageBackground>

                                </TouchableOpacity>

                            )
                        })}
                    </View>

                </View>

                {console.log(iconIndex)}

                <View style={styles.colorMapStyle}>
                    <Text style={styles.profileSelectHeader}>Renkler</Text>

                    <View style={{ flexDirection: 'row', }}>
                        {iconArray.map((icon, index) => {
                            return (
                                <TouchableOpacity
                                    key={icon.key}
                                    onPress={() => handleProfileColor(index)}
                                    activeOpacity={0.8}
                                >

                                    <ImageBackground key={index} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/project01-b18cf.appspot.com/o/icontest.png?alt=media&token=77150489-0217-4492-800d-e493d0d2d2c5" }} style={{ width: 50, height: 50 }} >
                                    </ImageBackground>

                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <View style={styles.textViewStyle}>
                    <Text style={styles.profileSelectHeader}>Isim</Text>
                    <TextInput
                        style={styles.nameInputStyle}
                        placeholder="İsim Giriniz"
                        placeholderTextColor={'#B8B8B8'}
                        keyboardType="text"
                        value={profileName}
                        onChangeText={(e) => setProfileName(e)}
                    />
                </View>

            </SafeAreaView>

            <TouchableOpacity onPress={handleCreateProfile} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>

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
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: widthOfScreen,
        height: heightOfScreen * 1.1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },

    backgroundImage: {
        position: 'absolute',
        width: widthOfScreen,
        height: heightOfScreen * 1.1,

    },

    profileSelectHeader: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        marginTop: 120,
        fontSize: 40,
        marginBottom: 50,
        color: colors.white,

    },

    iconMapStyle: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',

    },

    colorMapStyle: {
        marginTop: -75,
        alignItems: 'center',
        justifyContent: 'center',

    },

    textViewStyle: {
        marginTop: -75,
        alignItems: 'center',
        justifyContent: 'center',

    },

    saveButton: {
        marginTop: 60,
        marginBottom: heightOfScreen * 0.15,
        width: '50%',
        padding: 3,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    saveButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 24,
    },

    nameInputStyle: {
        fontFamily: 'Comic-Bold',
        fontSize: 45,
        color: colors.blueContainer,
        textAlign: 'center',
        marginTop: -15
    }

})