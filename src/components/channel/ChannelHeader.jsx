import React, { useState } from 'react';
import ChannelLinks from './ChannelLinks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

export default function ChannelHeader({ data, ...props }) {

    const [activeMenu, setActiveMenu] = useState('/');
    const loading = true;

    if (!data) {
        return;
    }

    return (
        <>
            <div className="relative flex flex-col shadow">
                <div className="banner relative bg h-60 overflow-hidden object-center">
                    <img className='block w-full h-auto' src='/img/1.jpg' alt='cover' />

                    <div className="block w-auto h-10 px-4 absolute bottom-0 right-0">
                        <ChannelLinks data={data?.links} />
                    </div>
                </div>
                <div className='flex items-center justify-between px-4 py-2'>
                    <div className="flex gap-4">
                        <div className="avatar w-20 h-20 rounded-full flex shrink-0 items-center justify-center">
                            <LazyLoadImage
                                wrapperClassName="rounded-full w-full h-full object-cover"
                                className='block w-full h-full object-cover'
                                placeholderSrc='/img/1.jpg'
                                src={data?.avatar?.pop()}
                                alt={data?.title}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="text-2xl">
                                    {data.title}
                                </div>
                                {data?.verified && (
                                    <img src='/verified.svg' className='w-6 h-6 block' />
                                )}
                            </div>
                            <div className='text-sm text-gray-500'>{data.id}</div>
                            <div className="flex items-center gap-2">
                                <div className='text-sm'>{data?.subscriber ?? '0 subscribers'}</div>
                                <div className="block">•</div>
                                <div className='text-sm'>{data?.videos ?? '0 videos'}</div>
                            </div>
                            <div className="description">
                                {data?.description}
                            </div>
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