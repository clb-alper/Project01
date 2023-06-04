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

    // User Profile Icons List
    const [profileIconList, setProfileIconList] = useState();

    const [bookProgressDB, setBookProgressDB] = useState();

    // Badge Contexts
    const [badgesList, setBadgesList] = useState([]);
    const [featuredBadgesList, setFeaturedBadgesList] = useState([]);
    const [featuredBadgeData, setFeaturedBadgeData] = useState([]);
    const [featuredBadgeIndex, setFeaturedBadgeIndex] = useState([]);
    const [badgeLevelStyle, setBadgeLevelStyle] = useState(0);

    //Statisctic Data
    const [statisticData, getStatisticData] = useState([]);

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


    const getStatisticInfoData = async () => {
        const statisticInfoRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .collection('userProfiles').doc(currentProfileSelected)
            .collection('statisticsData')
            statisticInfoRef
            .onSnapshot(
                querySnapshot => {
                    const statisticData = []
                    querySnapshot.forEach((doc) => {
                        const { adventurer, animalLover, points, readedBooks, readedWords, totalPoints, totalQuizzesCompleted } = doc.data()
                        statisticData.push({
                            adventurer,
                            animalLover,
                            points,
                            readedBooks,
                            readedWords,
                            totalPoints,
                            totalQuizzesCompleted

                        })
                    })
                    getStatisticData(statisticData)
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
        setBadgeLevelStyle,
        featuredBadgesList,
        setFeaturedBadgesList,
        featuredBadgeIndex,
        setFeaturedBadgeIndex,
        featuredBadgeData,
        setFeaturedBadgeData,
        bookProgressDB,
        setBookProgressDB,
        profileIconList,
        setProfileIconList,
        getStatisticInfoData,

    }

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;