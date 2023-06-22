import React, { useState } from 'react';
import ChannelLinks from './ChannelLinks';

const menuItems = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Video',
        url: '/video'
    },
    {
        name: 'Shorts',
        url: '/shorts'
    },
    {
        name: 'Playlist',
        url: '/playlist'
    },
    {
        name: 'Channels',
        url: '/channels'
    },
    {
        name: 'About',
        url: '/about'
    }
]

export default function ChannelHeader(props) {

    const [activeMenu, setActiveMenu] = useState('/');
    const loading = true;

    let title, subscriber = null;

    const links = [];

    return (
        <>
            <div className="relative flex flex-col shadow">
                <div className="relative bg h-60 overflow-hidden object-center">
                    <img className='block w-full h-auto' src='/img/1.jpg' alt='cover' />

                    <div className="block w-auto h-10 px-4 absolute bottom-0 right-0">
                        <ChannelLinks data={links} />
                    </div>
                </div>
                <div className='flex items-center justify-between px-4 py-2'>
                    <div className="flex gap-4">
                        <div className="avatar flex items-center justify-center">
                            <img className="w-20 h-20 rounded-full" src='/img/1.jpg' alt='avatar' />
                        </div>
                        <div className="grid">
                            <div className="text-2xl">
                                {title}
                            </div>
                            <div className='text-sm text-gray-500'>@{title}</div>
                            <div className='text-sm text-gray-500'>{subscriber ?? 0} subscribers</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    {menuItems.map((x, i) => <div key={i} className={`grow text-center border-b-2 ${x.url === activeMenu ? 'border-black dark:bg-white/20' : ''} uppercase block py-2 px-4`}>
                        {x.name}
                    </div>)}
                </div>
            </div>
        </>
    );
}