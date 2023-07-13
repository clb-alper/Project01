import { useState } from 'react';
import React from 'react';
import stickerData from '../data/stickerData';

export const RewardsContext = React.createContext();

const RewardsProvider = ({ children }) => {

    const [categorySwitch, setCategorySwitch] = useState(true);

      // Reward Contexts
    const [stickerList, setStickerList] = useState([])
    const [userStickerList, setUserStickerList] = useState([])
    const [stickerBookList, setStickerBookList] = useState([])

    const [userOwnedStickerList, setUserOwnedStickerList] = useState([])

    const [backpackEnteredCheck, setBackpackEnteredCheck] = useState()

    const DATA = [];

    for (let i = 0; i < stickerData.length - 1; i++) {
        const index = DATA.findIndex((dataSticker) => dataSticker.bookName === stickerData[i].stickerBook);
        if (index == -1) {
            DATA.push({
                bookName: stickerData[i].stickerBook,
                stickers: [{
                    id: stickerData[i].id,
                    stickerName: stickerData[i].stickerName,
                    image: stickerData[i].image,
                    price: stickerData[i].spPrice
                }]
            })
        } else {
            DATA[index].stickers.push({
                id: stickerData[i].id,
                stickerName: stickerData[i].stickerName,
                image: stickerData[i].image,
                price: stickerData[i].spPrice
            })
        }
    }

    const contextData = {
        categorySwitch,
        setCategorySwitch,
        DATA,
        stickerList,
        setStickerList,
        userStickerList,
        setUserStickerList,
        stickerBookList,
        setStickerBookList,
        backpackEnteredCheck,
        setBackpackEnteredCheck,
        userOwnedStickerList,
        setUserOwnedStickerList
    }

    return (
        <RewardsContext.Provider value={contextData}>
            {children}
        </RewardsContext.Provider>
    )
}

export default RewardsProvider;