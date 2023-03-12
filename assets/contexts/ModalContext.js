import { StyleSheet } from 'react-native';
import { useState } from 'react';
import React from 'react';
import booksListData from '../data/booksListData';

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [modalEntry, setModalEntry] = useState(booksListData);

    const contextData = {
        modalVisible,
        setModalVisible,
        modalEntry,
        setModalEntry,
    }

    return (
        <ModalContext.Provider value={contextData}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;

const styles = StyleSheet.create({})