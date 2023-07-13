import { useState } from 'react';
import React from 'react';

export const DropdownContext = React.createContext();

const DropdownProvider = ({ children }) => {

    const [closeLibraryDropdown, setCloseLibraryDropdown] = useState(false);
    const libraryCategories = ["Alfabe", "İçerik", "Yaş", "Tema"];

    const [closeRewardsDropdown, setCloseRewardsDropdown] = useState(false);
    const rewardsCategories = ["Sticker", "Seviye"];

    const contextData = {
        closeLibraryDropdown,
        setCloseLibraryDropdown,
        libraryCategories,

        closeRewardsDropdown,
        setCloseRewardsDropdown,
        rewardsCategories
    }

    return (
        <DropdownContext.Provider value={contextData}>
            {children}
        </DropdownContext.Provider>
    )
}

export default DropdownProvider;