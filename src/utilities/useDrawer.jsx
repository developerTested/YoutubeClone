import React from 'react';
import { useMatch } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';

export default function useDrawer(pattern) {

    const match = useMatch(pattern);

    return Boolean(match);
}