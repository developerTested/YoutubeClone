import React from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';
import useDrawer from '../utilities/useDrawer';
import Header from './Header';
import SideBar from './Sidebar';

export default function RootLayout() {

    const { mobileMenu, miniMenu, setMiniMenu, theme } = useApp();

    const watchPage = useDrawer("/watch/:id");

    return (
        <div className={`block w-full ${theme}`}>
            <Header />
            <div className="flex w-full h-full pt-14 dark:bg-black dark:text-white">
                <SideBar />
                <div className={`
                w-full dark:bg-black dark:text-white
                ml-auto
                ${watchPage ? 'ml-0' : miniMenu ? 'md:ml-20' : 'md:ml-60'}
                ${mobileMenu ? 'md:ml-0' : ''} w-full p-2 transition-all`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}