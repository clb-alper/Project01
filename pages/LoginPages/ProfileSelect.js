import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors';
import { auth, firebase } from '../../firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const ProfileSelect = ({ navigation }) => {

    const [profileList, setProfileList] = useState([]);
    const todoRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles');

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const profileList = []
                    querySnapshot.forEach((doc) => {
                        const { name, profileColor } = doc.data()
                        profileList.push({
                            id: doc.id,
                            name,
                            profileColor
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
        <>
            <ImageBackground source={require('../../assets/images/backgrounds/loginbghdlong.png')} style={styles.backgroundImage}>
                <View style={styles.profileSelectChildContainer}>
                </View>
            </ImageBackground>

            <View style={styles.profileSelectContainer} onLayout={onLayoutRootView}>

                <StatusBar style="light" />
                <SafeAreaView edges={['bottom', 'top']}>

                    <Text style={styles.profileSelectHeader}>Profil Seçin</Text>

                    <View style={styles.flatListStyle}>

                        {profileList.length < 1 ?
                            <View style={styles.addProfileButtonNoP}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileAddEdit')}
                                    activeOpacity={0.8}>

                                    <AntDesign name="pluscircleo" size={150} color={colors.pinkRegular} />
                                    <Text style={styles.addProfileButtonTextNoP}>Profil Ekle</Text>

                                </TouchableOpacity>
                            </View>

                            : <FlatList
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
                                            <TouchableOpacity
                                                key={item.key}
                                                onPress={() => navigation.navigate('MainScreen')}
                                                activeOpacity={0.8}>

                                                <View style={[styles.pfpBackground, { backgroundColor: item.selectedBGColor }]}>
                                                    <Image source={require('../../assets/images/icontest.png')} style={[styles.profileImageStyle, { tintColor: item.selectedColor }]} />
                                                </View>

                                            </TouchableOpacity>
                                            <Text style={[styles.userNicknameStyle, { color: item.profileColor.regularColor }]}>{item.name}</Text>

                                        </View>

                                    </>

                                )} />}


                    </View>

                    <View style={styles.buttonsViewStyle}>

                        {profileList.length < 4 && profileList.length != 0 ?
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileAddEdit')} style={styles.addProfileButton}>
                                {/* TODO: Kapladığı alan yok edilecek */}
                                <Text style={styles.addProfileButtonText}>Profil Ekle</Text>
                            </TouchableOpacity>
                            : null}

                        {profileList.length != 0 ?
                            <TouchableOpacity style={styles.editProfileButton}>
                                <Text style={styles.loginButtonText}>Profilleri Düzenle</Text>
                            </TouchableOpacity>
                            : null}

                    </View>

                </SafeAreaView>

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

    flatListStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        width: 375
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
        marginTop: '30%',
        marginBottom: '12%',
        fontSize: 40,
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

    editProfileButton: {
        width: '65%',
        padding: 3,
        backgroundColor: colors.pinkLight,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    addProfileButton: {
        marginBottom: '5%',
        width: '65%',
        padding: 3,
        backgroundColor: colors.pinkLight,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.pinkBorder
    },

    addProfileButtonText: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 24,
    },

    buttonsViewStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    addProfileButtonNoP: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },

    addProfileButtonTextNoP: {
        fontFamily: 'Comic-Bold',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 30,
        color: colors.pinkRegular
    }

})