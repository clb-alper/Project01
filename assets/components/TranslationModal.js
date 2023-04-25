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

const TranslationModal = () => {

    const { translationModalVisible, setTranslationModalVisible, translationModalEntry, setTranslationModalEntry } = useContext(ModalContext);

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
            onBackdropPress={() => setTranslationModalVisible(!translationModalVisible)}
            onRequestClose={() => {
                setTranslationModalVisible(!translationModalVisible);
                setTranslationModalEntry({ trTranslation: "", engTranslation: "" })
            }}
            style={{ margin: 0 }}
        >

            <View style={styles.modalViewStyle}>

                <View style={styles.modalBookDetailHeader}>
                    <View>

                    </View>
                    <TouchableOpacity
                        onPress={() => setTranslationModalVisible(!translationModalVisible)}
                        activeOpacity={0.75}>
                        <IonIcons name="ios-close" size={40} color="#000" style={styles.modalBookDetailHeaderClose} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dashboardContainer}>
                    <View>
                        <Text style={styles.mainText2}> Türkçe </Text>
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={styles.mainText}> {typeof (translationModalEntry.trTranslation) != 'undefined' ? (translationModalEntry.trTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).charAt(0).toUpperCase() + (translationModalEntry.trTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).slice(1) : ""} </Text>
                    </View>
                    <Text style={styles.mainText}> = </Text>
                    <View>
                        <Text style={styles.mainText2}> İngilizce </Text>
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={styles.mainText}> {typeof (translationModalEntry.engTranslation) != 'undefined' ? (translationModalEntry.engTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).charAt(0).toUpperCase() + (translationModalEntry.engTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).slice(1) : ""} </Text>
                    </View>
                </View>

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
        marginTop: '170%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        backgroundColor: colors.white,
    },

    dashboardContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: -30,
    },

    translationNameContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: -20,
        marginBottom: 20
    },

    modalBookDetailHeaderClose: {
        resizeMode: 'contain',
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
        top: -25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


})