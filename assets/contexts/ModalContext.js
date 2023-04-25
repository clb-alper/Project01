import { useState } from 'react';
import React from 'react';
import booksListData from '../data/booksListData';
import stickerData from '../data/stickerData';
import translationData from '../data/translationData';


export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {


    const [modalEntry, setModalEntry] = useState(booksListData);
    const [modalVisible, setModalVisible] = useState(false);

    const [stickerModalEntry, setStickerModalEntry] = useState(stickerData);
    const [stickerModalVisible, setStickerModalVisible] = useState(false);

    const [translationModalEntry, setTranslationModalEntry] = useState(translationData);
    const [translationModalVisible, setTranslationModalVisible] = useState(false);


    const contextData = {
        modalVisible,
        setModalVisible,
        modalEntry,
        setModalEntry,

        stickerModalVisible,
        setStickerModalVisible,
        stickerModalEntry,
        setStickerModalEntry,

        translationModalEntry,
        setTranslationModalEntry,
        translationModalVisible,
        setTranslationModalVisible
    }

    return (
        <ModalContext.Provider value={contextData}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;