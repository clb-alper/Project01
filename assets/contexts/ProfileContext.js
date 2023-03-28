import { useState } from 'react';
import React from 'react';

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {

    const [currentProfileSelected, setCurrentProfileSelected] = useState();
    const [userBookProgress, setUserBookProgress] = useState(0.0);
    const [favorited, setFavorited] = useState(false);

    const contextData = {
        currentProfileSelected,
        setCurrentProfileSelected,
        userBookProgress,
        setUserBookProgress,
        favorited,
        setFavorited,
    }

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;