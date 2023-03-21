import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../../assets/colors/colors';
import userData from '../../assets/data/userData';
import { auth, firebase } from '../../firebase';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const ProfileSelect = ({ navigation }) => {

    var [isPress, setIsPress] = React.useState(false);

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


    var touchPropsLoginButton = {
        activeOpacity: 1,
        underlayColor: '#ffe0e7',
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => navigation.navigate('MainScreen')

    };

    const handleCreateProfile = async () => {
        // main user
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
            email: firebase.auth().currentUser.email

        })

        // sub user
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles').doc("user4").set({
            name: 'subuser1'
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
                <View style={styles.flatListStyle}>
                    <Text style={styles.profileSelectHeader}>İkonlar</Text>


                </View>
            </SafeAreaView>
            <TouchableOpacity onPress={handleCreateProfile} style={{ width: 100, height: 100, backgroundColor: 'red' }}>
                <Text style={styles.loginButtonText}>Profilleri Düzenle</Text>
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

    flatListStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

})