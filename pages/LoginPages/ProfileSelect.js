import { StatusBar } from 'expo-status-bar';
import React, { Component, useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors';
import { auth, firebase } from '../../firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ProfileContext } from '../../assets/contexts/ProfileContext';
import Skeleton from '../../assets/components/skeletons/Skeleton';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width


const ProfileSelect = ({ navigation }) => {


    //const [profileIconList, setProfileIconList] = useState();

    const { currentProfileSelected, setCurrentProfileSelected, profileIconList, setProfileIconList } = useContext(ProfileContext);

    const [profileList, setProfileList] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const loadUserView = async () => {
        await sleep(1200)
        setIsLoaded(true)
    }


    const todoRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles').orderBy('name', 'asc');
    const profileIconsRef = firebase.firestore().collection('profileIcons')

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const profileList = []
                    querySnapshot.forEach((doc) => {
                        const { name, profileColor, profileIcon } = doc.data()
                        profileList.push({
                            id: doc.id,
                            name,
                            profileColor,
                            profileIcon
                        })
                    })
                    setProfileList(profileList)
                    loadUserView()
                }
            )


    }, [])




    const getProfileIcons = async () => {
        profileIconsRef
            .onSnapshot(
                querySnapshot => {
                    const profileIconList = []
                    querySnapshot.forEach((doc) => {
                        const { id, trName, image } = doc.data()

                        profileIconList.push({
                            engName: doc.id,
                            id,
                            trName,
                            image,
                        })

                    })
                    setProfileIconList(profileIconList)
                }
            )
    }

    useEffect(() => {
        getProfileIcons();
        //setDummy(true)
    }, [])

    //typeof(profileIconList) === 'undefined' ? 0 : profileIconList[1]["image"]


    const dummyData = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        }
    ]

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
                        {!isLoaded ?

                            <FlatList
                                overScrollMode={'never'}
                                horizontal={false}
                                scrollEnabled={false}
                                numColumns={2}
                                viewAreaCoveragePercentThreshold={10}
                                itemVisiblePercentThreshold={10}
                                data={dummyData}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index, separators }) => (

                                    <View style={styles.profileStyle}>
                                        <View
                                            key={item.key}
                                            // onPress={() => { setCurrentProfileSelected(item.id); navigation.navigate('MainScreen') }}
                                            activeOpacity={0.2}>


                                            <Skeleton
                                                height={styles.profileStyle2.height}
                                                width={styles.profileStyle2.width}
                                                lHeight={'100%'}
                                                lWidth={'200%'}
                                                duration={1200}
                                                style={[styles.profileStyle2, { borderWidth: 0 }]}
                                                backgroundColor='rgba(0,0,0,0.30)'
                                            >
                                            </Skeleton>
                                            <Skeleton
                                                height={24}
                                                width={125}
                                                lHeight={'100%'}
                                                lWidth={'200%'}
                                                duration={1200}
                                                style={[styles.userNicknameStyle, { borderRadius: 10 }]}
                                                backgroundColor='rgba(0,0,0,0.30)'
                                            >
                                            </Skeleton>

                                        </View>
                                    </View>

                                )} />

                            :

                            !(profileList.length < 1) ?
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
                                                <TouchableOpacity
                                                    key={item.key}
                                                    onPress={() => { setCurrentProfileSelected(item.id); navigation.navigate('MainScreen') }}
                                                    activeOpacity={0.2}>



                                                    <View style={[styles.profileStyle2, { backgroundColor: item.profileColor.regularColor, borderColor: item.profileColor.borderColor }]}>

                                                        <View style={[styles.pfpBackground, { backgroundColor: item.selectedBGColor }]}>
                                                            <Image source={{ uri: profileIconList[item.profileIcon]["image"] }} style={[styles.profileImageStyle, { tintColor: item.profileColor.borderColor }]} />
                                                        </View>

                                                    </View>
                                                    <Text style={[styles.userNicknameStyle, { color: item.profileColor.regularColor }]}>{item.name}</Text>




                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )} />

                                :
                                <View style={styles.addProfileButtonNoP}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProfileAddEdit')}
                                        activeOpacity={0.8}>

                                        <AntDesign name="pluscircleo" size={150} color={colors.pinkRegular} />
                                        <Text style={styles.addProfileButtonTextNoP}>Profil Ekle</Text>

                                    </TouchableOpacity>
                                </View>




                        }

                    </View>


                    <View style={styles.buttonsViewStyle}>

                        {profileList.length < 4 && profileList.length != 0 ?
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileAddEdit')} style={styles.addProfileButton}>
                                {/* TODO: Kapladığı alan yok edilecek */}
                                <Text style={styles.addProfileButtonText}>Profil Ekle</Text>
                            </TouchableOpacity>
                            : null}

                        {profileList.length != 0 ?
                            <>

                                <TouchableOpacity
                                    style={[styles.editProfileButton, { marginTop: 15 }]}
                                    onPress={() => { navigation.navigate('Login'); auth.signOut().then(() => console.log('User signed out!')); }}
                                >
                                    <Text style={styles.loginButtonText}>Çıkış Yap</Text>
                                </TouchableOpacity>
                            </>
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

    profileStyle2: {
        height: 125,
        width: 125,
        borderRadius: 100,
        borderWidth: 4
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
        width: 100,
        height: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: -13
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
        alignItems: 'center',
        marginTop: 10
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
    },

    skeletonStyle: {
        height: 250,
        width: 350,
        borderRadius: 8,
        marginTop: 16
    }



})