import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { ModalContext } from '../contexts/ModalContext';
import colors from '../colors/colors';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import AntIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { auth, firebase } from '../../firebase'
import { ProfileContext } from '../contexts/ProfileContext';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full widthF

const BookModal = () => {

    const [favoriteTest, setFavoriteTest] = useState();

    const { modalVisible, setModalVisible, modalEntry, setModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, favorited, setFavorited } = useContext(ProfileContext);

    const navigation = useNavigation();

    const handleAddFavorite = async () => {
        setFavorited(!favorited);
        modalEntry.favorited = favorited
        await handleCreateFavoriteBooks();
    }

    const db = firebase.firestore()

    const handleCreateFavoriteBooks = async () => {

        // sub user's favoriteBooks
        if (favorited) {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
                .doc(currentProfileSelected).collection('favoriteBooks').doc(modalEntry.id).set({
                    favorited: favorited,
                    bookRef: db.doc('storyBooks/' + modalEntry.id)
                })
        } else {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
                .doc(currentProfileSelected).collection('favoriteBooks').doc(modalEntry.id).delete();
        }
        //     firebase.firestore()
        //         .collection('users').doc(firebase.auth().currentUser.uid)
        //         .collection('userProfiles').doc(currentProfileSelected)
        //         .collection('favoriteBooks').doc(modalEntry.id)
        //         .get().then((snapshot) => {
        //             console.log("sdfsdf")
        //             console.log(snapshot.data().favorited)
        //             setFavoriteTest(snapshot.data().favorited)
        //           
        //         })
    }


    const [favoriteList, setFavoriteList] = React.useState([]);
    const todoRef = firebase.firestore()
        .collection('users').doc(firebase.auth().currentUser.uid)
        .collection('userProfiles').doc(currentProfileSelected)
        .collection('favoriteBooks')

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const favoriteList = []
                    querySnapshot.forEach((doc) => {
                        favoriteList.push(
                            doc.id
                        )
                    })
                    setFavoriteList(favoriteList)
                    console.log(favoriteList)
                }
            )
    }, [])
    const isIdEqual = (id) => id == modalEntry.id


    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={modalVisible}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            style={{ margin: 0 }}
        >

            <View style={styles.modalViewStyle}>
                <Image source={{ uri: modalEntry.image }} style={styles.modalBookImageStyle} />

                <View style={styles.modalBookDetailHeader}>
                    <View style={styles.titleHeartViewStyle}>
                        <Text
                            style={styles.modalText}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>{modalEntry.title}</Text>

                        <TouchableOpacity
                            onPress={handleAddFavorite}
                            activeOpacity={0.75}>
                            <AntIcons name={modalEntry.favorited ? "heart" : "hearto"} size={28} color="purple" style={styles.heartIconStyle} />

                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        activeOpacity={0.75}>
                        <IonIcons name="ios-close" size={40} color="#000" style={styles.modalBookDetailHeaderClose} />

                    </TouchableOpacity>
                </View>

                <Progress.Bar style={styles.modalProgressBar} borderRadius={15} progress={modalEntry.bookProgress} height={12} width={250} color={modalEntry.itemColor} />

                <View style={styles.modalTagContainer}>
                    <View style={styles.ageTagStyle}>
                        <Text
                            style={styles.tagTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>{modalEntry.ageTag}</Text>
                    </View>
                    <View style={styles.contentTagStyle}>
                        <Text
                            style={styles.tagTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>{modalEntry.contentTag}</Text>
                    </View>
                    <View style={styles.themeTagStyle}>
                        <Text
                            style={styles.tagTextStyle}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>{modalEntry.themeTag}</Text>
                    </View>
                    <View style={styles.rewardTagStyle}>

                        <Text
                            style={styles.tagTextStyle}>
                            {modalEntry.rewardTag}
                        </Text>

                        <AntIcons name="star" size={20} color="#FFD600" style={styles.rewardTagPointsIconStyle} />

                    </View>
                </View>

                <View style={styles.modalBookDescView}>
                    <Text
                        style={styles.modalBookDesc}
                        adjustsFontSizeToFit={true}
                        numberOfLines={6}>{modalEntry.itemDesc}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ReadingPage'); setModalVisible(false); setModalEntry(modalEntry) }}
                    activeOpacity={0.8}>
                    <View style={styles.modalBookStartButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>
                        <IonIcons name="play" size={70} color={modalEntry.itemBorder} style={styles.badgeIconStyle} />
                    </View>
                </TouchableOpacity>

            </View>
        </Modal>
    )
}

export default BookModal;

const styles = StyleSheet.create({

    modalViewStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '80%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor: colors.white,
    },

    modalViewDarkenStyle: {
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: widthOfScreen,
        height: heightOfScreen * 1.1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },

    modalBookImageStyle: {
        width: widthOfScreen + 5,
        height: 230,
        top: -130,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
    },

    modalBookDetailHeader: {
        width: '82%',
        top: -125,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    modalText: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        left: -20,
    },

    modalBookDetailHeaderClose: {
        resizeMode: 'contain',
        left: 25,
        top: -2,
    },

    modalProgressBar: {
        backgroundColor: colors.grayProgressBarBG,
        borderColor: colors.grayProgressBarBorder,
        borderWidth: 0.7,
        top: -120,
        left: -65,
    },

    modalTagContainer: {
        top: -100,
        left: 5,
        flexDirection: 'row',

    },

    ageTagStyle: {
        backgroundColor: colors.pinkLight,
        borderColor: colors.pinkBorder,
        alignItems: 'center',
        borderWidth: 3,
        marginRight: 7,
        width: 80,
        padding: 8,
        borderRadius: 50,

    },

    contentTagStyle: {
        backgroundColor: colors.blueRegular,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        borderWidth: 3,
        marginRight: 7,
        width: 70,
        padding: 8,
        borderRadius: 50,

    },

    themeTagStyle: {
        backgroundColor: colors.greenRegular,
        borderColor: colors.greenBorder,
        alignItems: 'center',
        borderWidth: 3,
        marginRight: 7,
        width: 70,
        padding: 8,
        borderRadius: 50,
    },

    rewardTagStyle: {
        flexDirection: 'row',
        backgroundColor: colors.purpleRegular,
        borderColor: colors.purpleBorder,
        alignItems: 'center',
        borderWidth: 3,
        marginRight: 7,
        width: 145,
        padding: 5,
        borderRadius: 50,
    },

    rewardTagPointsIconStyle: {
        resizeMode: 'contain',
        height: 25,
        width: 25,
        marginLeft: 2,
        paddingTop: 2
    },

    tagTextStyle: {
        fontFamily: 'Comic-Regular',
    },

    modalBookDescView: {
        width: widthOfScreen,
        top: -75,
        left: 15,
    },

    modalBookDesc: {
        fontFamily: 'Comic-Regular',
        width: widthOfScreen - 30,
        fontSize: 17,
    },

    modalBookStartButton: {
        width: 90,
        height: 90,
        alignItems: 'center',
        paddingLeft: 10,
        borderWidth: 4,
        borderRadius: 100,
        top: -40,
    },

    badgeIconStyle: {
        resizeMode: 'contain',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        marginLeft: -2,
    },

    heartIconStyle: {
        marginTop: 7,
        marginLeft: -4
    },

    titleHeartViewStyle: {
        flexDirection: 'row',
    }
})