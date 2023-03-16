import { useState } from 'react';
import React from 'react';
import stickerData from '../data/stickerData';

export const RewardsContext = React.createContext();

const RewardsProvider = ({ children }) => {

    const [categorySwitch, setCategorySwitch] = useState(true);

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
        DATA
    }

    return (
        <RewardsContext.Provider value={contextData}>
            {children}
        </RewardsContext.Provider>
    )
}

export default RewardsProvider;