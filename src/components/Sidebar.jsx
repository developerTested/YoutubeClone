import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation, useMatch } from "react-router-dom";
import { useApp } from "../contexts/contextApi";
import { MdAddCircle, MdEmojiEvents, MdExplore, MdFeedback, MdHelp, MdHistory, MdHome, MdLightbulb, MdLocalMovies, MdMusicNote, MdReport, MdSettings, MdSubscriptions, MdVideoLibrary, MdWhatshot } from "react-icons/md";
import { IoLogoGameControllerB } from "react-icons/io";
import { ImNewspaper } from "react-icons/im";
import { GiEclipse } from "react-icons/gi";
import { BsBroadcast } from "react-icons/bs";
import useActiveMenu from "../utilities/useActiveMenu";
import useDrawer from "../utilities/useDrawer";

import Logo from "./Logo";

const menuItems = [
    {
        label: 'home',
        title: 'Home',
        url: '/',
        icon: <MdHome className="block w-6 h-6" />
    },

    {
        label: 'trending',
        title: 'Trending',
        url: '/trending',
        icon: <MdWhatshot className="block w-6 h-6" />
    },

    {
        label: 'explore',
        title: 'Explore',
        url: '/',
        icon: <MdExplore className="block w-6 h-6" />
    },

    {
        divider: true,
        label: 'subscriptions',
        title: 'Subscriptions',
        url: '/',
        icon: <MdSubscriptions className="block w-6 h-6" />
    },

    {
        divider: true,
        label: 'browse-channels',
        title: 'Browse channels',
        url: '/channels',
        icon: <MdAddCircle className="block w-6 h-6" />
    },

    {
        label: 'library',
        title: 'Library',
        url: '/',
        icon: <MdVideoLibrary className="block w-6 h-6" />
    },

    {
        divider: true,
        label: 'history',
        title: 'History',
        url: '/',
        icon: <MdHistory className="block w-6 h-6" />
    },

    {
        label: 'sports',
        title: 'Sports',
        url: '/sports',
        icon: <MdEmojiEvents className="block w-6 h-6" />
    },

    {
        label: 'gaming',
        title: 'Gaming',
        url: '/gaming',
        icon: <IoLogoGameControllerB className="block w-6 h-6" />
    },

    {
        label: 'news',
        title: "News",
        url: '/news',
        icon: <ImNewspaper className="block w-6 h-6" />
    },

    {
        label: 'learning',
        title: "Learning",
        url: '/learning',
        icon: <MdLightbulb className="block w-6 h-6" />
    },

    {
        label: 'fashion',
        title: "Fashion & beauty",
        url: '/fashion',
        icon: <GiEclipse className="block w-6 h-6" />
    },

    {
        label: 'live',
        title: 'Live',
        url: '/live',
        icon: <BsBroadcast className="block w-6 h-6" />,
    },

    {
        label: 'music',
        title: 'Music',
        url: '/music',
        icon: <MdMusicNote className="block w-6 h-6" />
    },

    {
        divider: true,
        label: 'movies',
        title: 'Movies',
        url: '/movies',
        icon: <MdLocalMovies className="block w-6 h-6" />
    },

    {
        label: 'settings',
        title: "Settings",
        icon: <MdSettings className="block w-6 h-6" />
    },

    {
        label: 'report',
        title: "Report History",
        icon: <MdReport className="block w-6 h-6" />
    },

    {
        label: 'help',
        title: "Help",
        icon: <MdHelp className="block w-6 h-6" />,
    },

    {
        label: 'feedback',
        title: "Send feedback",
        icon: <MdFeedback className="block w-6 h-6" />
    },
];

export default function SideBar(props) {

    const [active, setActive] = useActiveMenu();
    const [show, setShow] = useState(true);
    const { mobileMenu, setMobileMenu, miniMenu, loading, setLoading } = useApp();

    const watchPage = useDrawer("/watch/:id");

    const ref = useRef(null);

    const navigate = useNavigate();

    const handleClickOutside = useCallback((e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShow(false);
            setMobileMenu(false);
        }
    })

    useEffect(() => {

        window.addEventListener("click", handleClickOutside, true)

        return () => {
            window.removeEventListener('click', handleClickOutside, true)
        }
    }, []);

    const handleClick = (event, page, url) => {

        event.preventDefault();

        if (active !== url) {
            setLoading(true);
        }

        if (!watchPage) {
            setMobileMenu(false);
        }

        navigate(url);

    }

    return (
        <>
            {mobileMenu ? <div onClick={() => setMobileMenu(!mobileMenu)} className="fixed inset-0 z-10 bg-black/50 transition-opacity"></div> : ''}
            <div className={`
            transition-all
            fixed 
            h-full 
            top-0 
            left-0
            bg-white 
            dark:bg-black 
            dark:text-white 
            text-sm
            ${miniMenu ? 'w-20 -translate-x-16' : 'w-60 -translate-x-60'}
            ${mobileMenu ? 'z-50 translate-x-0 shadow-2xl' : '-translate-x-60'}
            ${watchPage ? 'z-50 w-60 -translate-x-60' : 'md:translate-x-0'}
            `}>
                <div className="px-4 md:px-5 py-1 flex items-center gap-3 h-14 border-b dark:border-white/20">
                    <div className={`${watchPage ? 'watch md:flex' : 'md:hidden'} flex cursor-pointer items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20`}
                        onClick={() => setMobileMenu(!mobileMenu)}>
                        <svg fill='currentColor' viewBox="0 0 24 24" focusable="false" className="block h-6 w-6">
                            <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
                        </svg>
                    </div>

                    <Link to='/' className={`${watchPage ? 'md:block' : 'md:hidden'} logo`}>
                        <Logo className="w-auto h-6" />
                    </Link>
                </div>

                <div className={`${miniMenu ? 'mt-2 p-0' : 'p-2'} overflow-y-auto custom-h`}>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {miniMenu ?
                                <div onClick={(e) => handleClick(e, item.label, item.url)} className={`cursor-pointer block px-1 py-2.5 text-center rounded-md ${(active === item.url) ? 'bg-black/5 dark:bg-white/10' : ''} hover:bg-black/10 dark:hover:bg-white/20`} key={index}>
                                    <div className={`m-auto h-6 w-6 icon ${(active === item.url) ? 'text-[red]' : ''}`}> {item.icon}</div>
                                    <div className={`label text-[0.65rem] ${(active === item.url) ? 'font-semibold' : ''}`}>{item.title}</div>
                                </div>
                                :
                                <div onClick={(e) => handleClick(e, item.title, item.url)} className={`cursor-pointer flex items-center gap-x-6 py-2.5 px-4 rounded-md ${(active === item.url) ? 'bg-black/5 dark:bg-white/10' : ''} hover:bg-black/10 dark:hover:bg-white/20`} key={index}>
                                    <div className={`h-6 w-6 icon ${(active === item.url) ? 'text-[red]' : ''}`}> {item.icon}</div>
                                    <div className={`label ${(active === item.url) ? 'font-semibold' : ''}`}>{item.title}</div>
                                </div>
                            }

                            {item.divider ? <hr className="border-black/10 dark:border-white/20 my-2" /> : ''}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}