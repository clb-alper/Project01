import { useState } from 'react';
import React from 'react';

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {

    const [currentProfileSelected, setCurrentProfileSelected] = useState();
    const [userBookProgress, setUserBookProgress] = useState();

    const contextData = {
        currentProfileSelected,
        setCurrentProfileSelected,
        userBookProgress,
        setUserBookProgress
    }

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;