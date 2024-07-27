import React from 'react';
import { Link } from "react-router-dom";
import VideoLength from '../VideoLength';
import { BsBroadcast } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avatar from '../Avatar';
import PlayListCard from './PlayListCard';
import { MdMusicNote } from 'react-icons/md';

export default function VideoCard({ video, loading = true }) {

    if (loading || !video?.id) {
        return (
            <>
                <div className='relative w-full md:max-w-lg animate-pulse shrink-0'>
                    <div className="relative pointer poster-img rounded-xl">
                        <div className="flex items-center justify-center absolute inset-0 h-full md:max-h-60 rounded-xl overflow-hidden bg-gray-200 dark:bg-white/10">
                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                        </div>
                    </div>
                    <div className="details pt-2 flex gap-4">
                        <div className="avatar shrink-0">
                            <div className="w-9 h-9  rounded-full bg-gray-200 dark:bg-white/10"></div>
                        </div>
                        <div className="flex-1 info flex flex-col gap-y-1.5">
                            <h3 className="title">
                                <div className="w-full h-8 rounded bg-gray-200 dark:bg-white/10"></div>
                            </h3>

                            <div className="w-full h-4 rounded bg-gray-200 dark:bg-white/10"></div>
                            <div className="w-full h-4 rounded bg-gray-200 dark:bg-white/10"></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (['playlist'].includes(video?.type)) {
        return <PlayListCard video={video} loading={false} />
    }

    return (
        <div className='relative w-full md:max-w-lg shrink-0'>
            <div className="relative pointer poster-img rounded-xl">
                <Link to={`/watch/${video?.id}`} className={`block absolute inset-0 h-full md:max-h-60 rounded-xl overflow-hidden`}>
                    <LazyLoadImage
                        wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                        className="h-full w-full object-cover rounded-xl"
                        src={video?.thumbnail?.url}
                        alt={video?.title}
                    />
                </Link>
                {video?.length ? <VideoLength text={video?.length} /> : ''}
            </div>
            <div className="details p-2 flex gap-4">
                {video?.channel?.avatar?.url ?
                    <div className="avatar shrink-0">
                        <Avatar
                            src={video?.channel?.avatar?.url}
                            alt={video?.channel?.title}
                            rounded={true}
                        />
                    </div> : ""}
                <div className="flex-1 info flex flex-col gap-y-1.5">
                    <Link to={`/watch/${video?.id}`} className='text-sm font-semibold line-clamp-2'>
                        {video?.title}
                    </Link>

                    {video?.channel ?
                        <Link to={video?.channel?.url} className='user text-xs text-gray-800 dark:text-white/70 flex items-center gap-2'>
                            {video?.channel?.title}
                            {video?.channel?.verified && (
                                <img src='/verified.svg' className='w-4 h-4 block' />
                            )}
                            {video?.channel?.artist && (
                                <MdMusicNote className='w-4 h-4 block' />
                            )}
                        </Link> : ''
                    }
                    <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70'>
                        <div className="views">{video?.views}</div>
                        {video?.publishedAt ? (
                            <>
                                <div className="block">•</div>
                                <div className="uploaded">
                                    {video?.publishedAt}
                                </div>
                            </>
                        ) : ''}
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
    );
}