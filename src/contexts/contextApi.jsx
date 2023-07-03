import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(null);

export const useApp = () => useContext(Context);

export default function AppContextProvider(props) {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [miniMenu, setMiniMenu] = useState(false);
    const [dark, setDark] = useState(false);

    const themeList = ['light', 'dark', 'system'];

    // On mount, read the preferred theme from the persistence
    React.useEffect(() => {
        const isDark = localStorage.getItem('dark') === 'true'
        setDark(isDark);
    }, [dark])

    // To toggle between dark and light modes
    const toggleTheme = () => {
        const isDark = !dark
        localStorage.setItem('dark', JSON.stringify(isDark))
        setDark(isDark);
    }

    // Filter the styles based on the theme selected
    const theme = dark ? 'dark' : 'light';

    const value = {
        loading,
        setLoading,
        errors,
        setErrors,
        mobileMenu,
        setMobileMenu,
        miniMenu,
        setMiniMenu,
        theme: theme,
        setTheme: toggleTheme,
        dark,
        setDark,
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
}