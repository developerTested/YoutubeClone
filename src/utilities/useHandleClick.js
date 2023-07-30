import React, { useState, useEffect, useReducer } from "react";

const initialState = {
    show: false,
    dark: false,
    settings: null,
    theme: 'System Theme',
    language: 'English',
};

export function useMenuHandleClick() {

    const [state, updateMenuClick] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        initialState
    );    

    return [state, updateMenuClick]
}

export function useAnchor() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        setAnchorEl(null);
    }, [])

    return [anchorEl, setAnchorEl]
}