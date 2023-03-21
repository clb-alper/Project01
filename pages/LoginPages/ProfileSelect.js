import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors';
import userData from '../../assets/data/userData';
import { auth, firebase } from '../../firebase';


var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const ProfileSelect = ( {navigation}) => {

  
    const [profileList, setProfileList] = React.useState([]);
    const todoRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles');

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const profileList = []
                    querySnapshot.forEach((doc) => {
                        const { name } = doc.data()
                        profileList.push({
                            id: doc.id,
                            name
                        })
                    })
                    setProfileList(profileList)
                    
                }
            )
    }, [])
    console.log(profileList)

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


  

    

    return (
        <View style={styles.profileSelectContainer} onLayout={onLayoutRootView}>
            <StatusBar style="light" />

            <ImageBackground source={require('../../assets/images/backgrounds/loginbghdlong.png')} style={styles.backgroundImage}>
                <View style={styles.profileSelectChildContainer}>
                </View>
            </ImageBackground>
            <SafeAreaView edges={['bottom', 'top']}>
                <View style={styles.flatListStyle}>
                    <Text style={styles.profileSelectHeader}>Profil Seçin</Text>
                    <FlatList
                        overScrollMode={'never'}
                        horizontal={false}
                        scrollEnabled={false}
                        numColumns={2}
                        viewAreaCoveragePercentThreshold={10}
                        itemVisiblePercentThreshold={10}
                        data={profileList}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index, separators }) => (

                            <>
                                <View style={styles.profileStyle}>

                                    {/* map */}
                                    <TouchableOpacity
                                        key={item.key}
                                        onPress={() => navigation.navigate('MainScreen')}
                                        activeOpacity={0.8}>

                                        <View style={[styles.pfpBackground, { backgroundColor: item.selectedBGColor }]}>
                                            <Image source={require('../../assets/images/icontest.png')} style={[styles.profileImageStyle, { tintColor: item.selectedColor }]} />
                                        </View>



                                    </TouchableOpacity>
                                    <Text style={[styles.userNicknameStyle, { color: item.selectedColor }]}>{item.userNickname}</Text>

                                </View>

                            </>

                        )} />

                    {profileList.length < 4 ?
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileAddEdit')} style={styles.addProfileButton}>
                            {/* TODO: Kapladığı alan yok edilecek */}
                            <Text style={styles.addProfileButtonText}>Profil Ekle</Text>
                        </TouchableOpacity>
                        : null}

                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.loginButtonText}>Profilleri Düzenle</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>


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

    backgroundDarkener: {
        backgroundColor: 'red',
    },

    editProfileButton: {
        marginBottom: heightOfScreen * 0.15,
        width: '75%',
        padding: 3,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    loginButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 24,
    },

    profileStyle: {
        marginTop: 10,
        marginRight: 15,
        marginBottom: 15,
        marginLeft: 20,
    },

    profileSelectHeader: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        marginTop: 120,
        fontSize: 40,
        marginBottom: 50,
        color: colors.white,

    },

    profileImageStyle: {
        resizeMode: 'contain',
        width: 120,
        height: 120,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,

    },

    pfpBackground: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },

    userNicknameStyle: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },

    flatListStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    addProfileButton: {
        marginBottom: heightOfScreen * 0.02,
        width: '75%',
        padding: 3,
        backgroundColor: colors.pinkRegular,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    addProfileButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 24,
    },

})