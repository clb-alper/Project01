import { Dimensions } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import React from 'react';
import { firebase } from '../../firebase'
import { ProfileContext } from './ProfileContext'

var widthOfScreen = Dimensions.get('window').width; //full width

export const LibraryContext = React.createContext();



const LibraryProvider = ({ children }) => {



    const [categorySwitch, setCategorySwitch] = useState(0);

    const bookWidth = (widthOfScreen - 55) / 3;

    const [DATA, setDATA] = useState();
    const [sortedData, setSortedData] = useState();
    const [dataLetters, setDataLetters] = useState();



    const contextData = {
        DATA,
        setDATA,
        sortedData,
        setSortedData,
        dataLetters,
        categorySwitch,
        setCategorySwitch,
        bookWidth,
    }

    return (
        <LibraryContext.Provider value={contextData}>
            {children}
        </LibraryContext.Provider>
    )
}

export default LibraryProvider;