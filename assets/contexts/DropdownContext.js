import { StyleSheet } from 'react-native';
import { useState } from 'react';
import React from 'react';

export const DropdownContext = React.createContext();

const DropdownProvider = ({ children }) => {

    const [closeDropdown, setCloseDropdown] = useState(false);

    const libraryCategories = ["Alfabe", "Kategoriler", "Yaş", "Tema"];

    const contextData = {
        libraryCategories,
        closeDropdown,
        setCloseDropdown,
    }

    return (
        <DropdownContext.Provider value={contextData}>
            {children}
        </DropdownContext.Provider>
    )
}

export default DropdownProvider;

const styles = StyleSheet.create({})