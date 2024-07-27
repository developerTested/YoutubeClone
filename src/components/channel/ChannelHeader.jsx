import React, { useState } from 'react';
import ChannelLinks from './ChannelLinks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdMusicNote } from 'react-icons/md';
import Avatar from '../Avatar';

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

export default function ChannelHeader({ data, loading, ...props }) {

    const [activeMenu, setActiveMenu] = useState('/');

    return (
        <>
            <div className="relative flex flex-col">
                <div className="banner relative bg h-72 overflow-hidden object-cover shadow">
                    {loading ? <div className="block animate-pulse bg-gray-200 dark:bg-white/10 w-full h-full"></div> : data.banner ? <React.Fragment>
                        <LazyLoadImage
                            wrapperClassName="block w-full h-full !bg-cover"
                            className='block w-full h-full object-cover'
                            placeholderSrc='/img/1.jpg'
                            src={data?.banner && data?.banner[data?.banner?.length - 1].url}
                            alt={data?.title}
                        />

                        <div className="block w-auto h-10 px-4 absolute bottom-0 right-0">
                            {loading ? <div className="w-full h-8 rounded bg-gray-200 dark:bg-white/10"></div> : <ChannelLinks data={data?.links} />}
                        </div>
                    </React.Fragment> : ''}
                </div>
                <div className='flex items-start justify-between gap-4 px-4 py-2'>
                    <Avatar
                        rounded
                        className="shrink-0"
                        size="large"
                        src={data?.avatar?.url}
                        alt={data?.title}
                    />
                    <div className="block space-y-2 w-full">
                        {loading ? <div className="animate-pulse w-full h-12 rounded bg-gray-200 dark:bg-white/10"></div> :

                            <div className="flex items-center gap-2">
                                <div className="text-4xl font-bold">
                                    {data.title}
                                </div>
                                {data?.artist && (
                                    <MdMusicNote className='w-6 h-6 block' />
                                )}

                                {data?.verified && (
                                    <img src='/verified.svg' className='w-6 h-6 block' />
                                )}
                            </div>}

                        {loading ? <div className="animate-pulse w-full h-8 rounded bg-gray-200 dark:bg-white/10"></div> :
                            <div className='text-lg font-semibold'>@{data.id}</div>}

                        {loading ? <div className="animate-pulse w-full h-8 rounded bg-gray-200 dark:bg-white/10"></div> :
                            <div className="flex items-center gap-2">
                                <div className='text-sm'>{data?.subscriber ?? '0 subscribers'}</div>
                                <div className="block">•</div>
                                <div className='text-sm'>{data?.videos ?? '0 videos'}</div>
                                <div className="block">•</div>
                                <div className='text-sm'>{data?.joinAt}</div>
                                <div className="block">•</div>
                                <div className='text-sm'>{data?.views}</div>
                            </div>}

                        {loading ? <div className="animate-pulse w-full h-8 rounded bg-gray-200 dark:bg-white/10"></div> :
                            <div className="description">
                                {data?.description && data?.description.length && data?.description.split('\n').map((x, i) =>
                                    <React.Fragment key={i}>
                                        {x}
                                        <br />
                                    </React.Fragment>
                                )}
                            </div>}
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