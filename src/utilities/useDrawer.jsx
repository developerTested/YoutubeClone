import React from 'react';
import { useMatch } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';

export default function useDrawer(pattern) {

    const { setMobileMenu } = useApp();
    const match = useMatch(pattern);

    if (!Boolean(match)) {
        setMobileMenu(false);
    }

    return Boolean(match);
}