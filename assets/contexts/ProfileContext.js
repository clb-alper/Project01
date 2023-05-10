import { useState } from 'react';
import React from 'react';
import { auth, firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {

    const [currentProfileSelected, setCurrentProfileSelected] = useState();
    const [currentProfileSelectedInfo, setCurrentProfileSelectedInfo] = useState();
    const [currentAccountInfo, setCurrentAccountInfo] = useState();
    const [userBookProgress, setUserBookProgress] = useState(0.0);
    const [favorited, setFavorited] = useState(false);
    const [readed, setReaded] = useState(false);
    const [userPrefFontSize, setUserPrefFontSize] = useState(20);
    const [userPointsData, setUserPointsData] = useState();
    const [userStatisticsData, setUserStatisticsData] = useState([]);

    // Badge Contexts
    const [badgesList, setBadgesList] = useState([]);
    const [badgeLevelStyle, setBadgeLevelStyle] = useState(0);

    const getFontLocalStorage = async () => {
        setUserPrefFontSize(Number(await AsyncStorage.getItem('@profileFontSize:key')));
        // if (userPrefFontSize !== null) {
        //     console.log('storage value', userPrefFontSize)
        // } else {
        //     console.log('no size')
        // }

    }

    const getProfileInfoData = async () => {
        const profileInfoRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
        profileInfoRef
            .onSnapshot(
                querySnapshot => {
                    const profileInfoData = []
                    querySnapshot.forEach((doc) => {
                        if (doc.id === currentProfileSelected) {
                            const { name, profileColor, profileIcon } = doc.data()
                            profileInfoData.push({
                                id: doc.id,
                                name,
                                profileColor,
                                profileIcon
                            })
                        }

                    })
                    setCurrentProfileSelectedInfo(profileInfoData)
                }
            )
    }

    const getAccountInfoData = async () => {
        const accountInfoRef = firebase.firestore().collection('users')
        accountInfoRef
            .onSnapshot(
                querySnapshot => {
                    const accountInfoData = []
                    querySnapshot.forEach((doc) => {
                        if (doc.id === firebase.auth().currentUser.uid) {
                            const { email } = doc.data()
                            accountInfoData.push({
                                email,
                            })
                        }

                    })
                    setCurrentAccountInfo(accountInfoData)
                }
            )
    }

    const contextData = {
        currentProfileSelected,
        setCurrentProfileSelected,
        userBookProgress,
        setUserBookProgress,
        favorited,
        setFavorited,
        readed,
        setReaded,
        userPrefFontSize,
        setUserPrefFontSize,
        getProfileInfoData,
        currentProfileSelectedInfo,
        setCurrentProfileSelectedInfo,
        getAccountInfoData,
        currentAccountInfo,
        setCurrentAccountInfo,
        getFontLocalStorage,
        userPointsData,
        setUserPointsData,
        userStatisticsData,
        setUserStatisticsData,
        badgesList,
        setBadgesList,
        badgeLevelStyle,
        setBadgeLevelStyle
    }

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;