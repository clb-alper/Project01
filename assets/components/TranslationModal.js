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

                <TouchableOpacity
                    onPress={() => setTranslationModalVisible(!translationModalVisible)}
                    activeOpacity={0.75}>
                    <IonIcons name="ios-close" size={40} color="#000" style={styles.modalBookDetailHeaderClose} />
                </TouchableOpacity>

                <View style={styles.dashboardContainer}>
                    <Text> {typeof(translationModalEntry.trTranslation) != 'undefined' ? (translationModalEntry.trTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).charAt(0).toUpperCase() + (translationModalEntry.trTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).slice(1) : ""} </Text>
                    <Text> = </Text>
                    <Text> {typeof(translationModalEntry.engTranslation) != 'undefined' ? (translationModalEntry.engTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).charAt(0).toUpperCase() + (translationModalEntry.engTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")).slice(1) : ""} </Text>
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
    },

    modalBookDetailHeaderClose: {
        resizeMode: 'contain',
        left: 25,
        top: -2,
    },


})