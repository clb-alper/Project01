import { useState } from 'react';
import React from 'react';

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {

    const [currentProfileSelected, setCurrentProfileSelected] = useState();
    const [userBookProgress, setUserBookProgress] = useState(0.0);
    const [favorited, setFavorited] = useState(false);
    const [readed, setReaded] = useState();
    const [userPrefFontSize, setUserPrefFontSize] = useState(20);

    const contextData = {
        currentProfileSelected,
        setCurrentProfileSelected,
        userBookProgress,
        setUserBookProgress,
        favorited,
        setFavorited,
        readed,
        setReaded,
        userPrefFontSize,
        setUserPrefFontSize
    }

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;