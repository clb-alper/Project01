import { useState } from 'react';
import React from 'react';

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {

    const [currentProfileSelected, setCurrentProfileSelected] = useState('0Qhyn6dAsDUTpqYtamXB');

    const contextData = {
        currentProfileSelected,
        setCurrentProfileSelected
    }

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;