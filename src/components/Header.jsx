import React, { useEffect, useLayoutEffect } from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { MdWbSunny, MdSettings, MdNotifications, MdVideoCall } from 'react-icons/md';
import { Link, useMatch } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';
import SearchForm from "./SearchForm";
import Logo from './Logo';
import Loader from './Loader';
import SettingMenu from './settings/SettingMenu';
import ClickAwayListener from 'react-click-away-listener';
import { themeData } from './settings/ThemeSettings';
import useDrawer from '../utilities/useDrawer';

import { useMenuHandleClick } from '../utilities/useHandleClick';

export default function Header(props) {

  const { loading, mobileMenu, setMobileMenu, miniMenu, setMiniMenu, dark, setDark, theme, setTheme } = useApp();
  const [activeMenu, setActiveMenu] = useMenuHandleClick();

  const watchPage = useDrawer("/watch/:id");

  const menuToggle = () => {
    setMiniMenu(false);
    setMobileMenu(!mobileMenu);
  }

  const miniMenuToggle = () => {
    setMobileMenu(false);
    setMiniMenu(!miniMenu);
  }

  const handleResize = () => {
    if (window.innerWidth > 1450) {
      setMiniMenu(false);
    } else {
      setMiniMenu(true);
    }
  }



  const handleThemeToggle = () => {

    const newTheme = themeData.find((x) => x.label === theme);

    setActiveMenu({ ...activeMenu, theme: newTheme.title, dark: dark });
  }

  useEffect(() => {
    handleThemeToggle();
  }, [dark]);

  useLayoutEffect(() => {

    window.addEventListener('resize', handleResize, true)

    return () => {
      window.removeEventListener('resize', handleResize, true)
    }

  }, [window.innerWidth]);

  return (
    <div className='w-full fixed top-0 z-10 flex items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black dark:text-white'>
      {loading && <Loader />}
      <div className={`flex items-center gap-3`}>
        <div className={`${watchPage ? 'watch md:flex' : 'md:hidden'}  flex cursor-pointer items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 dark:text-white`}
          onClick={menuToggle}>
          <svg fill='currentColor' viewBox="0 0 24 24" focusable="false" className="block h-6 w-6">
            <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
          </svg>
        </div>

        <div className={`${watchPage ? 'md:hidden' : 'md:flex'} hidden cursor-pointer items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 dark:text-white`}
          onClick={miniMenuToggle}>
          <svg fill='currentColor' viewBox="0 0 24 24" focusable="false" className="block h-6 w-6">
            <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
          </svg>
        </div>

        <Link to='/' className="logo">
          <Logo className='w-auto h-6 hidden sm:block' />
          <Logo className='w-auto h-6 block sm:hidden' mini={true} />
        </Link>
      </div>

      <SearchForm />

      <div className="flex items-center gap-2">
        <div onClick={setTheme} className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20">
          {theme === 'dark' ? <MdWbSunny className='w-6 h-6' /> : <BsMoonStarsFill className='w-6 h-6' />}
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <>
            <ClickAwayListener onClickAway={() => setActiveMenu({ ...activeMenu, show: false, settings: null })}>
              <div className="relative dropdown">
                <div onClick={() => setActiveMenu({ show: !activeMenu.show })} className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20">
                  <MdSettings className="w-6 h-6" />
                </div>
                <div className={`dropdown-menu ${activeMenu.show ? 'block' : 'hidden'} overflow-y-auto w-80 h-fit shadow-lg rounded-md bg-white dark:bg-black dark:text-white border dark:border-white/5 mx-auto absolute top-full right-0 bottom-0`}>
                  <SettingMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
                </div>

              </div>
            </ClickAwayListener>
          </>
        </div>
      </div>
    </div>
  );
}