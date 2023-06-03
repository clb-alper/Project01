import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../colors/colors'
import { ModalContext } from '../../contexts/ModalContext';
import Modal from "react-native-modal";
import AntIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { auth, firebase } from '../../../firebase'
import { ProfileContext } from '../../contexts/ProfileContext';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const BackpackStickerModal = () => {

    const { stickerModalVisible, setStickerModalVisible, stickerModalEntry, backpackStickerModalEntry, setBackpackStickerModalEntry, backpackStickerModalVisible, setBackpackStickerModalVisible } = useContext(ModalContext);

    return (
        <Modal
            animationIn={'flipInY'}
            animationOut={'flipOutY'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={backpackStickerModalVisible}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            statusBarTranslucent
            onRequestClose={() => {
                setBackpackStickerModalVisible(!backpackStickerModalVisible);
            }}
            style={{ margin: 0 }}
        >

            <View style={{ alignItems: 'center', marginTop: -50 }}>
                <View>
                    <Image
                        source={{ uri: backpackStickerModalEntry.iconImage }}
                        style={styles.modalStickerImage}
                    >
                    </Image>
                </View>
                <View>
                    <Text style={styles.modalStickerNameText}>
                        {backpackStickerModalEntry.name}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={
                        backpackStickerModalEntry.stickerLevel === "Bronze" ?
                            [styles.bronzePointsContainerUpper, {marginRight: 10}] :
                            backpackStickerModalEntry.stickerLevel === "Silver" ?
                                [styles.silverPointsContainerUpper, {marginRight: 10}] :
                                backpackStickerModalEntry.stickerLevel === "Gold" ?
                                    [styles.goldPointsContainerUpper, {marginRight: 10}] :
                                    backpackStickerModalEntry.stickerLevel === "Emerald" ?
                                        [styles.emeraldPointsContainerUpper, {marginRight: 10}] :
                                        backpackStickerModalEntry.stickerLevel === "Diamond" ?
                                            [styles.diamondPointsContainerUpper, {marginRight: 10}] :
                                            [styles.defaultPointsContainerUpper, {marginRight: 10}]}>

                        <Text
                            style={styles.pointsTextStyleUpper}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            {
                                backpackStickerModalEntry.stickerLevel === "Bronze" ?
                                    "Bronz" :
                                    backpackStickerModalEntry.stickerLevel === "Silver" ?
                                        "Gümüş" :
                                        backpackStickerModalEntry.stickerLevel === "Gold" ?
                                            "Altın" :
                                            backpackStickerModalEntry.stickerLevel === "Emerald" ?
                                                "Zümrüt" :
                                                backpackStickerModalEntry.stickerLevel === "Diamond" ?
                                                    "Elmas" :
                                                    "Normal"}
                        </Text>

                    </View>

                    <View style={
                        backpackStickerModalEntry.stickerLevel === "Bronze" ?
                            styles.bronzePointsContainerUpper :
                            backpackStickerModalEntry.stickerLevel === "Silver" ?
                                styles.silverPointsContainerUpper :
                                backpackStickerModalEntry.stickerLevel === "Gold" ?
                                    styles.goldPointsContainerUpper :
                                    backpackStickerModalEntry.stickerLevel === "Emerald" ?
                                        styles.emeraldPointsContainerUpper :
                                        backpackStickerModalEntry.stickerLevel === "Diamond" ?
                                            styles.diamondPointsContainerUpper :
                                            styles.defaultPointsContainerUpper}>

                        <Text
                            style={[styles.pointsTextStyleUpper, { width: 120 }]}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                            Sticker Kitabı {backpackStickerModalEntry.stickerBookNo}
                        </Text>

                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => setBackpackStickerModalVisible(!backpackStickerModalVisible)}
                    activeOpacity={0.75}
                    style={styles.modalStickerCloseButton}>
                    <IonIcons name="ios-close" size={50} color="#000" style={styles.modalStickerCloseButtonIcon} />
                </TouchableOpacity>

            </View>


        </Modal >
    )
}

export default BackpackStickerModal;

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
    },

    modalStickerCloseButton: {
        borderRadius: 500,
        borderWidth: 5,
        width: 70,
        height: 70,
        marginTop: 75,
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
})