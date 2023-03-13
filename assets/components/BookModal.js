import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { ModalContext } from '../contexts/ModalContext';
import colors from '../colors/colors';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full widthF

const BookModal = () => {

    const { modalVisible, setModalVisible, modalEntry } = useContext(ModalContext);

    const navigation = useNavigation();

    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={modalVisible}
            useNativeDriver={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            style={{ margin: 0 }}
        >

            <View style={styles.modalViewStyle}>
                <Image source={modalEntry.image} style={styles.modalBookImageStyle} />
                <View style={styles.modalBookDetailHeader}>
                    <Text
                        style={styles.modalText}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>{modalEntry.title}</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        activeOpacity={0.75}>
                        <Image
                            source={require('../images/closeIcon.png')}
                            style={styles.modalBookDetailHeaderClose}
                        />
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

                        <Image
                            source={require('../images/iconStar.png')}
                            style={styles.rewardTagPointsIconStyle}>
                        </Image>

                    </View>
                </View>

                <View style={styles.modalBookDescView}>
                    <Text
                        style={styles.modalBookDesc}
                        adjustsFontSizeToFit={true}
                        numberOfLines={6}>{modalEntry.itemDesc}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ReadingPage'); setModalVisible(false) }}
                    activeOpacity={0.8}>
                    <View style={styles.modalBookStartButton} backgroundColor={modalEntry.itemColor} borderColor={modalEntry.itemBorder}>

                        <Image source={require('../images/startIcon.png')} tintColor={modalEntry.itemBorder} style={styles.badgeIconStyle} />
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
        top: -125,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    modalText: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        width: 300,
        left: -20,
    },

    modalBookDetailHeaderClose: {
        resizeMode: 'contain',
        height: 45,
        width: 45,
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
        backgroundColor: colors.pinkTagBG,
        borderColor: colors.pinkTagBorder,
        alignItems: 'center',
        borderWidth: 3,
        marginRight: 7,
        width: 80,
        padding: 8,
        borderRadius: 50,

    },

    contentTagStyle: {
        backgroundColor: colors.blueTagBG,
        borderColor: colors.blueTagBorder,
        alignItems: 'center',
        borderWidth: 3,
        marginRight: 7,
        width: 70,
        padding: 8,
        borderRadius: 50,

    },

    themeTagStyle: {
        backgroundColor: colors.greenTagBG,
        borderColor: colors.greenTagBorder,
        alignItems: 'center',
        borderWidth: 3,
        marginRight: 7,
        width: 70,
        padding: 8,
        borderRadius: 50,
    },

    rewardTagStyle: {
        flexDirection: 'row',
        backgroundColor: colors.purpleTagBG,
        borderColor: colors.purpleTagBorder,
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
        marginLeft: 1.5,
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
        width: 45,
        height: 45,
    },
})