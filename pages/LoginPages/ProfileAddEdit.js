import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, SafeAreaView, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors';
import { auth, firebase } from '../../firebase';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const ProfileSelect = () => {

    const [profileName, setProfileName] = useState();

    const [iconIndex, setIconIndex] = useState();
    const [colorIndex, setColorIndex] = useState({ regularColor: colors.pinkLight, borderColor: colors.pinkBorder });

    const navigation = useNavigation();

    const handleProfileColor = (colorHandle) => {
        switch (colorHandle) {
            case 0:
                setColorIndex(colors.pinkRegular)
                break;
            case 1:
                setColorIndex(colors.blueRegular)
                break;
            case 2:
                setColorIndex(colors.greenRegular)
                break;
            case 3:
                setColorIndex(colors.yellowRegular)
                break;
            case 4:
                setColorIndex(colors.purpleRegular)
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
        {
            id: 6,
            image: "require('../../assets/images/icontest.png')"
        },
        {
            id: 7,
            image: "require('../../assets/images/icontest.png')"
        },
        {
            id: 8,
            image: "require('../../assets/images/icontest.png')"
        },
    ]

    const colorArray = [
        {
            id: 1,
            regularColor: colors.pinkLight,
            borderColor: colors.pinkBorder
        },
        {
            id: 2,
            regularColor: colors.blueRegular,
            borderColor: colors.blueBorder
        },
        {
            id: 3,
            regularColor: colors.greenRegular,
            borderColor: colors.greenBorder
        },
        {
            id: 4,
            regularColor: colors.yellowRegular,
            borderColor: colors.yellowBorder
        },
        {
            id: 5,
            regularColor: colors.purpleRegular,
            borderColor: colors.purpleBorder
        },
    ]


    const handleCreateProfile = async () => {

        // Sub User
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles').doc().set({
            name: profileName,
            profileIcon: iconIndex,
            profileColor: colorIndex,
            tagsAdded: false,
        })
        setTimeout(() => { navigation.goBack() }, 600)
    }


    return (
        <>
            <ImageBackground source={require('../../assets/images/backgrounds/loginbghdlong.png')} style={styles.backgroundImage}>
                <View style={styles.profileSelectChildContainer}>
                </View>
            </ImageBackground>

            <View style={styles.profileSelectContainer} onLayout={onLayoutRootView}>
                <StatusBar style="light" />

                <SafeAreaView edges={['bottom', 'top']}>
                    <KeyboardAvoidingView behavior="padding" style={{ marginBottom: 20 }}>
                        <View style={styles.iconMapStyle}>
                            <Text style={styles.profileSelectHeader}>Ikonlar</Text>

                            <FlatList
                                overScrollMode={'never'}
                                horizontal={false}
                                scrollEnabled={false}
                                numColumns={4}
                                viewAreaCoveragePercentThreshold={10}
                                itemVisiblePercentThreshold={10}
                                data={iconArray}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index, separators }) => (

                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => setIconIndex(index)}
                                        activeOpacity={0.8}>

                                        <MaterialCommunityIcon key={index} name="dog" size={65} color={colorIndex.regularColor} style={styles.iconStyles} />

                                    </TouchableOpacity>

                                )} />


                        </View>

                        <View style={styles.colorMapStyle}>
                            <Text style={styles.profileColorHeader}>Renkler</Text>

                            <FlatList
                                overScrollMode={'never'}
                                horizontal={true}
                                scrollEnabled={false}
                                viewAreaCoveragePercentThreshold={10}
                                itemVisiblePercentThreshold={10}
                                data={colorArray}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index, separators }) => (

                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => setColorIndex({ regularColor: item.regularColor, borderColor: item.borderColor })}
                                        activeOpacity={0.8}>

                                        <View style={[styles.colorIconStyles, { backgroundColor: item.regularColor, borderColor: item.borderColor }]}>

                                        </View>

                                    </TouchableOpacity>

                                )} />

                        </View>

                        <View style={styles.textViewStyle}>
                            <Text style={styles.profileNameHeader}>Isim</Text>
                            <TextInput
                                style={[styles.nameInputStyle, { color: colorIndex.regularColor }]}
                                placeholder="İsim Giriniz"
                                placeholderTextColor={'#B8B8B8'}
                                keyboardType="text"
                                value={profileName}
                                onChangeText={(e) => setProfileName(e)}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>

                <TouchableOpacity onPress={handleCreateProfile} style={[styles.saveButton, { backgroundColor: colorIndex.regularColor, borderColor: colorIndex.borderColor }]}>
                    <Text style={styles.saveButtonText}>Kaydet</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

export default ProfileSelect

const styles = StyleSheet.create({
    profileSelectContainer: {
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
        fontSize: 40,
        marginBottom: 30,
        color: colors.white,

    },

    profileColorHeader: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 30,
        color: colors.white,

    },

    profileNameHeader: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 40,
        color: colors.white,
    },

    iconMapStyle: {
        marginTop: 110,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250

    },

    colorMapStyle: {
        marginTop: -10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150
    },

    textViewStyle: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveButton: {
        marginTop: 25,
        marginBottom: '5%',
        width: '60%',
        padding: 3,
        borderWidth: 2,
        borderRadius: 15,
    },

    saveButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 24,
    },

    nameInputStyle: {
        fontFamily: 'Comic-Bold',
        fontSize: 40,
        textAlign: 'center',
        marginTop: -15
    },

    iconMapContainerStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    iconStyles: {
        width: 65,
        height: 65,
        marginHorizontal: 8
    },

    colorIconStyles: {
        width: 60,
        height: 60,
        marginHorizontal: 6,
        borderRadius: 100,
        borderWidth: 3
    }


})