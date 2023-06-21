import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoLength from './VideoLength';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function SuggestionCard({ video, loading = true }) {

    if (loading) {
        return (
            <>
                <div role="status" className="rounded animate-pulse relative flex gap-2 mb-2">
                    <div className="relative flex justify-center items-center h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl  bg-gray-300 dark:bg-white/10 overflow-hidden">
                        <div className="flex items-center justify-center">
                            <svg className="w-10 h-10 m-auto dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
                                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                            </svg>
                        </div>
                    </div>
                    <div className="details w-full grid gap-1">
                        <h3 className="title">
                            <div className="w-full h-8 bg-gray-200 rounded dark:bg-white/20"></div>
                        </h3>

                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-white/20"></div>
                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-white/20"></div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="flex gap-2 mb-2">
            <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                <Link to={`/watch/${video?.id}`} className="rounded-lg max-w-full h-full ">
                    <LazyLoadImage
                        wrapperClassName="w-full h-full block"
                        className='block w-full h-full'
                        placeholderSrc='/img/1.jpg'
                        src={video?.thumbnails[0]?.url}
                        alt={video?.title}
                    />
                </Link>

                <VideoLength text={video?.length} />
            </div>
            <div className="flex flex-col overflow-hidden">
                <Link to={`/watch/${video?.id}`} className="text-sm lg:text-xs xl:text-sm font-bold text-ellipsis line-clamp-2">
                    {video?.title}
                </Link>

                <Link to={video?.channel?.url} className="text-xs font-semibold mt-2 dark:text-white/70 flex items-center gap-2">
                    <div className="truncate">{video?.channel?.title}</div>
                    {video?.channel?.verified && (
                        <img src='/verified.svg' className='w-4 h-4 block' />
                    )}
                </Link>
                <div className='flex items-center gap-2 mt-1 text-xs font-semibold truncate overflow-hidden text-gray-700 dark:text-slate-400'>
                    <div className="views">{video?.views}</div>
                    <div className="mx-1">•</div>
                    <div className="uploaded truncate">
                        {video?.publishedAt}
                    </div>
                </div>
            </div>
        </div >
    );
}