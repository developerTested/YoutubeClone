import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';
import Header from './Header';
import SearchForm from './SearchForm';
import SideBar from './Sidebar';
import { MdHome } from 'react-icons/md';

export default function ErrorPage(props) {
  const error = useRouteError();

  const { mobileMenu, miniMenu, theme } = useApp();

  return (
    <>
      <div className={`block w-full h-screen overflow-hidden ${theme}`}>
        <Header />
        <div className="flex w-full h-full overflow-y-auto dark:bg-black dark:text-white">
          <SideBar />
          <div className={`
                w-full dark:bg-black dark:text-white
                ml-auto
                ${miniMenu ? 'md:ml-20' : 'md:ml-60'}
                `}>
            <div className="flex flex-col gap-4 items-center justify-center h-screen text-center">
              <h1 className='text-3xl'>Oops! {error.status} - {error.statusText || error.message}</h1>
              <div>Sorry, an unexpected error has occurred.</div>


              <SearchForm />

              <Link to='/' className="
              flex items-center gap-2
              btn 
              uppercase
            bg-gray-200 
            dark:bg-white/20 
            text-center 
            py-2.5 
            px-4 
            rounded-full">
                <MdHome className='w-6 h-6' /> Go to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}