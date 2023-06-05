import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import colors from '../../colors/colors'
import { ModalContext } from '../../contexts/ModalContext';
import Modal from "react-native-modal";
import AntIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const StickerModal = () => {

    const [pointsNotEnoughMessage, setPointsNotEnoughMessage] = useState(false);
    const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState(false);

    const { stickerModalVisible, setStickerModalVisible, stickerModalEntry } = useContext(ModalContext);
    const { currentProfileSelected, userStatisticsData, userPointsData } = useContext(ProfileContext);

    const handleStickerPurchase = () => {
        if (userPointsData.points < stickerModalEntry.price) {
            setPointsNotEnoughMessage(true)
        }
        else if (userPointsData.points >= stickerModalEntry.price) {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
                .doc(currentProfileSelected).collection('stickerCollection').doc(stickerModalEntry.id).set({
                    stickerID: stickerModalEntry.id,
                })
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userProfiles')
                .doc(currentProfileSelected).collection('statisticsData').doc("statsData").update({
                    points: userPointsData.points - stickerModalEntry.price
                })
            setPurchaseSuccessMessage(true)
        }
    }

    return (
        <Modal
            animationIn={'flipInY'}
            animationOut={'flipOutY'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={stickerModalVisible}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            statusBarTranslucent
            onRequestClose={() => {
                setStickerModalVisible(!stickerModalVisible);
            }}
            style={{ margin: 0 }}
        >

            <View style={{ alignItems: 'center', marginTop: -50 }}>
                <View>
                    <Image
                        source={{ uri: stickerModalEntry.iconImage }}
                        style={styles.modalStickerImage}
                    >
                    </Image>
                </View>
                <View>
                    <Text style={styles.modalStickerNameText}>
                        {stickerModalEntry.name}
                    </Text>
                </View>

                <View style={
                    stickerModalEntry.stickerLevel === "Bronze" ?
                        styles.bronzePointsContainerUpper :
                        stickerModalEntry.stickerLevel === "Silver" ?
                            styles.silverPointsContainerUpper :
                            stickerModalEntry.stickerLevel === "Gold" ?
                                styles.goldPointsContainerUpper :
                                stickerModalEntry.stickerLevel === "Emerald" ?
                                    styles.emeraldPointsContainerUpper :
                                    stickerModalEntry.stickerLevel === "Diamond" ?
                                        styles.diamondPointsContainerUpper :
                                        styles.defaultPointsContainerUpper}>

                    <Text
                        style={styles.pointsTextStyleUpper}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>
                        {
                            stickerModalEntry.stickerLevel === "Bronze" ?
                                "Bronz" :
                                stickerModalEntry.stickerLevel === "Silver" ?
                                    "Gümüş" :
                                    stickerModalEntry.stickerLevel === "Gold" ?
                                        "Altın" :
                                        stickerModalEntry.stickerLevel === "Emerald" ?
                                            "Zümrüt" :
                                            stickerModalEntry.stickerLevel === "Diamond" ?
                                                "Elmas" :
                                                "Normal"}
                    </Text>

                </View>

                <TouchableOpacity
                    onPress={() => handleStickerPurchase()}
                    activeOpacity={0.75}>
                    <View style={
                        stickerModalEntry.stickerLevel === "Bronze" ?
                            styles.bronzePointsContainer :
                            stickerModalEntry.stickerLevel === "Silver" ?
                                styles.silverPointsContainer :
                                stickerModalEntry.stickerLevel === "Gold" ?
                                    styles.goldPointsContainer :
                                    stickerModalEntry.stickerLevel === "Emerald" ?
                                        styles.emeraldPointsContainer :
                                        stickerModalEntry.stickerLevel === "Diamond" ?
                                            styles.diamondPointsContainer :
                                            styles.defaultPointsContainer}>


                        <Text
                            style={styles.pointsTextStyle3}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            {stickerModalEntry.price}
                        </Text>

                        <AntIcons name="star" size={33} color="#FFB702" style={styles.pointsIconStyle3} />
                    </View>
                </TouchableOpacity>

                {purchaseSuccessMessage ? <Text style={styles.purchaseSuccess}>Çıkartma Satın Alındı</Text> : null}
                {pointsNotEnoughMessage ? <Text style={styles.featuredBadgeAddCompleteText}>Yetersiz Yıldız Puanı</Text> : null}

                <TouchableOpacity
                    onPress={() => { setStickerModalVisible(!stickerModalVisible); setTimeout(() => setPointsNotEnoughMessage(false), 500); setTimeout(() => setPurchaseSuccessMessage(false), 500) }}
                    activeOpacity={0.75}
                    style={styles.modalStickerCloseButton}>
                    <IonIcons name="ios-close" size={50} color="#000" style={styles.modalStickerCloseButtonIcon} />
                </TouchableOpacity>

            </View>


        </Modal >
    )
}

export default StickerModal;

const styles = StyleSheet.create({
    modalStickerNameText: {
        fontFamily: 'Comic-Regular',
        fontSize: 38,
        color: 'white',
    },

    modalStickerImage: {
        width: 200,
        height: 200,
        marginTop: 100,
        resizeMode: 'contain'
    },

    modalStickerCloseButton: {
        borderRadius: 500,
        borderWidth: 5,
        width: 70,
        height: 70,
        marginTop: 30,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleRegular
    },

    modalStickerCloseButtonIcon: {
        marginTop: 3,
        marginLeft: 5.5
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

    modalViewStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '80%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor: colors.white,
    },

    defaultPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 120,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleRegular,
    },

    bronzePointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 120,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.bronzeBadgeBorder,
        backgroundColor: colors.bronzeBadge,
    },

    silverPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 120,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.silverBadgeBorder,
        backgroundColor: colors.silverBadge,
    },

    goldPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 120,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.goldBadgeBorder,
        backgroundColor: colors.goldBadge,
    },

    emeraldPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 120,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.emeraldBadgeBorder,
        backgroundColor: colors.emeraldBadge,
    },

    diamondPointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 120,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.diamondBadgeBorder,
        backgroundColor: colors.diamondBadge,
    },

    // Upper

    defaultPointsContainerUpper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingRight: 7,
        marginTop: 50,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.purpleBorder,
        backgroundColor: colors.purpleRegular,
    },

    bronzePointsContainerUpper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingRight: 7,
        marginTop: 15,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.bronzeBadgeBorder,
        backgroundColor: colors.bronzeBadge,
    },

    silverPointsContainerUpper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingRight: 7,
        marginTop: 15,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.silverBadgeBorder,
        backgroundColor: colors.silverBadge,
    },

    goldPointsContainerUpper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingRight: 7,
        marginTop: 15,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.goldBadgeBorder,
        backgroundColor: colors.goldBadge,
    },

    emeraldPointsContainerUpper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingRight: 7,
        marginTop: 15,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.emeraldBadgeBorder,
        backgroundColor: colors.emeraldBadge,
    },

    diamondPointsContainerUpper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingRight: 7,
        marginTop: 15,
        borderRadius: 15,
        borderWidth: 2,
        paddingLeft: 5,
        borderColor: colors.diamondBadgeBorder,
        backgroundColor: colors.diamondBadge,
    },

    pointsTextStyleUpper: {
        fontFamily: 'Comic-Regular',
        textAlign: 'center',
        fontSize: 20,
        width: 65,
    },

    pointsTextStyle3: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 25,
        width: 65,
    },

    pointsIconStyle3: {
        //resizeMode: 'contain',
        height: 38,
        width: 38,
        paddingTop: 2,
        paddingLeft: 2
    },

    featuredBadgeAddCompleteText: {
        fontSize: 18,
        color: '#f26d74',
        fontFamily: 'Comic-Bold',
        marginTop: 5
    },

    purchaseSuccess: {
        fontSize: 18,
        color: '#83FCA7',
        fontFamily: 'Comic-Bold',
        marginTop: 5
    }
})