import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';
import useDrawer from '../utilities/useDrawer';
import Header from './Header';
import SideBar from './Sidebar';

export default function RootLayout() {

    const { pathname } = useLocation();

    const { mobileMenu, setMobileMenu, miniMenu, setMiniMenu, theme } = useApp();

    useEffect(() => {
        window.scrollTo(0, 0);

        setMobileMenu(false);
        
    }, [pathname]);

    const watchPage = useDrawer("/watch/:id");

    return (
        <div className={`block w-full ${theme}`}>
            <Header />
            <div className="flex w-full h-full pt-16 dark:bg-black dark:text-white">
                <SideBar />
                <div className={`
                px-4
                w-full dark:bg-black dark:text-white
                ml-auto
                ${watchPage ? 'ml-0' : miniMenu ? 'md:ml-20' : 'md:ml-60'}
                ${mobileMenu ? 'md:ml-0' : ''} 
                transition-all`}>
                    <Outlet />
                </div>
            </div>

        </div>
    );
}