import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../colors/colors'
import { ModalContext } from '../../contexts/ModalContext';
import Modal from "react-native-modal";
import AntIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full width

const StickerModal = () => {

    const { stickerModalVisible, setStickerModalVisible, stickerModalEntry } = useContext(ModalContext);

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
                        source={stickerModalEntry.image}
                        style={styles.modalStickerImage}
                    >
                    </Image>
                </View>
                <View>
                    <Text style={styles.modalStickerNameText}>
                        {stickerModalEntry.stickerName} Sticker
                    </Text>
                </View>
                <View style={styles.pointsContainer3}>

                    <Text
                        style={styles.pointsTextStyle3}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>
                        {stickerModalEntry.price}
                    </Text>

                    <AntIcons name="star" size={33} color="#FFD600" style={styles.pointsIconStyle3} />

                </View>

                <TouchableOpacity
                    onPress={() => setStickerModalVisible(!stickerModalVisible)}
                    activeOpacity={0.75}
                    style={styles.modalStickerCloseButton}>
                        <IonIcons name="ios-close" size={50} color="#000" style={styles.modalStickerCloseButtonIcon} />
                </TouchableOpacity>

            </View>


        </Modal>
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

    pointsContainer3: {
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

    pointsTextStyle3: {
        fontFamily: 'Comic-Light',
        textAlign: 'center',
        fontSize: 25,
        width: 65,
    },

    pointsIconStyle3: {
        resizeMode: 'contain',
        height: 38,
        width: 38,
        paddingTop: 2,
        paddingLeft: 2
    },
})