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
import Skeleton from './skeletons/Skeleton';

var widthOfScreen = Dimensions.get('window').width; //full width
var heightOfScreen = Dimensions.get('window').height; //full widthF

const TranslationModal = () => {

    const [isLoaded, setIsLoaded] = useState(false);

    const { translationModalVisible, setTranslationModalVisible, translationModalEntry, setTranslationModalEntry } = useContext(ModalContext);

    const trValue = typeof (translationModalEntry.trTranslation) != 'undefined' ? (translationModalEntry.trTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).charAt(0).toUpperCase() + (translationModalEntry.trTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).slice(1) : ""
    const engValue = typeof (translationModalEntry.engTranslation) != 'undefined' ? (translationModalEntry.engTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).charAt(0).toUpperCase() + (translationModalEntry.engTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).slice(1) : ""

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const loadUserView = async () => {
        await sleep(700)
        setIsLoaded(true)
    }

    useEffect(() => {
        loadUserView()
    }, [translationModalEntry])

    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            transparent={true}
            hideModalContentWhileAnimating={true}
            isVisible={translationModalVisible}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            backdropColor={"rgba(0,0,0,0)"}
            onBackdropPress={() => { setTranslationModalVisible(!translationModalVisible); setIsLoaded(false) }}
            onRequestClose={() => {
                setTranslationModalVisible(!translationModalVisible);
            }}
            style={{ margin: 0 }}
        >

            <View style={styles.modalViewStyle}>

                <View style={styles.modalBookDetailHeader}>
                    <View>

                    </View>
                    <TouchableOpacity
                        onPress={() => { setTranslationModalVisible(!translationModalVisible); setIsLoaded(false) }}
                        activeOpacity={0.75}>
                        <IonIcons name="ios-close" size={35} color="#000" style={styles.modalBookDetailHeaderClose} />
                    </TouchableOpacity>
                </View>

                {isLoaded ?
                    <View style={styles.dashboardContainer}>
                        <Text
                            style={{ fontSize: 80 }}
                            numberOfLines={1}
                            adjustsFontSizeToFit={true}>
                            {trValue} 🇹🇷    {engValue} 🇺🇸
                        </Text>
                    </View>
                    :
                    <View style={{flexDirection: 'row'}}>
                        <Skeleton
                            height={30}
                            width={160}
                            backgroundColor={colors.grayProgressBarBG}
                            style={[{ borderRadius: 20, marginRight: 20, marginTop: 10 }]}

                        >
                        </Skeleton>
                        <Skeleton
                            height={30}
                            width={160}
                            backgroundColor={colors.grayProgressBarBG}
                            style={[{ borderRadius: 20,  marginTop: 10 }]}

                        >
                        </Skeleton>
                    </View>


                }

            </View>
        </Modal>
    )
}

export default TranslationModal;

const styles = StyleSheet.create({

    modalViewStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: '175%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor: colors.white,
    },

    dashboardContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: widthOfScreen * 0.9,
        marginTop: 10
    },

    translationNameContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: -20,
        marginBottom: 20
    },

    modalBookDetailHeaderClose: {
        //resizeMode: 'contain',
    },

    mainText: {
        fontFamily: 'Comic-Regular',
        textAlign: 'center',
    },

    mainText2: {
        fontFamily: 'Comic-Regular',
        fontSize: 20,
        textAlign: 'center',
    },

    modalBookDetailHeader: {
        width: '92%',
        top: 3,
        right: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute'
    },


})