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

export function useOutsideClick(ref, onClickOut, deps = []) {
    useEffect(() => {
        const onClick = ({ target }) => !ref?.contains(target) && onClickOut?.()
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, deps);
}