import React from 'react';
import { useMatch } from 'react-router-dom';

function useDrawer(pattern) {

    const match = useMatch(pattern);

    return Boolean(match);
}

export default useDrawer;