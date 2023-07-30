import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useActiveMenu() {

    const [active, setActive] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    return [active, setActive];
}