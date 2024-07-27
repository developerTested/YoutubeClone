import React, { useEffect, useState } from 'react';
import { BsDownload, BsFillCheckCircleFill } from 'react-icons/bs';
import { MdMusicNote, MdPlaylistPlay } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import VideoLength from '../VideoLength';
import Avatar from '../Avatar';

export default function PlayListCard({ video = {}, loading = true }) {

    if (!video) {
        return <React.Fragment></React.Fragment>
    }

    return (
        <React.Fragment>
            <div className='relative w-full md:max-w-lg'>
                <div className="relative pointer poster-img rounded-xl">
                    <Link to={`/playlist/${video?.id}`} className={`block absolute inset-0 h-full md:max-h-60 rounded-xl overflow-hidden`}>
                        <LazyLoadImage
                            wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                            className="h-full w-full object-cover rounded-xl"
                            src={video?.thumbnail?.url}
                            alt={video?.title}
                        />
                    </Link>
                    {video?.length && <div className="absolute bottom-0 left-0 right-0 px-3 py-1 w-full bg-black/80 text-white text-center flex items-center justify-between">
                        <div className="block"><MdPlaylistPlay className='w-6 h-6' /></div>
                        <div className="block text-sm text-center">
                            {`${video?.length}`}
                        </div>
                    </div>}
                </div>
                <div className="details p-2">
                    <div className="block space-y-2">
                        <Link to={`/watch/${video?.id}`} className='text-lg font-semibold line-clamp-2'>
                            {video?.title}
                        </Link>

                        {video?.label &&
                        <div className="text-xs text-gray-800 dark:text-white/70">
                            {video.label}
                        </div> }

                        {video?.channel &&
                            <Link to={video?.channel?.url} className='user text-xs text-gray-800 dark:text-white/70 flex items-center gap-2'>
                                {video?.channel?.title}
                                {video?.channel?.verified && (
                                    <img src='/verified.svg' className='w-4 h-4 block' />
                                )}
                                {video?.channel?.artist && (
                                    <MdMusicNote className='w-4 h-4 block' />
                                )}
                            </Link>
                        }

                        <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70'>

                            {video?.views ? <div className="views">{video?.views}</div> : ''}
                            {video?.publishedAt && (
                                <>
                                    <div className="uploaded">
                                        {video?.publishedAt}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="block text-xs">
                            View full playlist
                        </div>
                        <div className="flex items-center gap-2">
                            {video?.isLive ?
                                <div className="flex items-center gap-2 rounded-sm text-center bg-red-600 text-xs text-white px-1.5 py-0">
                                    <BsBroadcast className="w-4 h-4" /> <div className="uppercase font-bold">Live</div>
                                </div>
                                : ''}

                            {video?.badges?.length ? video?.badges?.map((x, i) => <div key={i} className="block rounded-md text-xs bg-slate-100 dark:bg-white/20 px-2 py-1">
                                {x}
                            </div>) : ''}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
