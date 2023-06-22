import React from 'react';
import { Link } from "react-router-dom";
import VideoLength from '../VideoLength';
import { BsBroadcast } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ChannelVideoCard({ video, loading = true }) {

    if (loading) {
        return (
            <>
                <div role="status" className="relative rounded animate-pulse p-3">
                    <div className="flex items-center justify-center w-auto h-40 bg-gray-300 rounded-lg dark:bg-white/10">
                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                    <div className="details pt-2 flex gap-4">
                        <h3 className="title">
                            <div className="w-full h-8 bg-gray-200 rounded dark:bg-white/10"></div>
                        </h3>
                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-white/10"></div>
                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-white/10"></div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='relative rounded-lg'>
                <div className="poster relative">
                    <Link to={`/watch/${video?.id}`} className="block relative w-auto h-48 md:h-40 md:rounded-xl overflow-hidden">
                        <LazyLoadImage
                            wrapperClassName="w-full h-full block"
                            className='block w-full h-full'
                            placeholderSrc='/img/1.jpg'
                            src={video?.thumbnails[0]?.url}
                            alt={video?.title}
                        />
                    </Link>
                    {video?.length && <VideoLength text={video?.length} />}
                </div>
                <div className="details p-2 flex flex-col gap-4">

                    <h3 className="title">
                        <Link to={`/watch/${video?.id}`} className='block text-sm font-semibold line-clamp-2'>
                            {video?.title}
                        </Link>
                    </h3>

                    <div className="flex items-center gap-2">
                        {video?.isLive ?
                            <div className="flex items-center gap-2 rounded text-center bg-red-600 text-sm text-white px-2">
                                <BsBroadcast className="w-4 h-4" /> <div className="uppercase">Live</div>
                            </div>
                            : ''}

                        {video?.badges?.length ? video?.badges?.map((x, i) => <div key={i} className="block rounded-md text-xs bg-slate-100 dark:bg-white/20 px-2 py-1">
                            {x}
                        </div>) : ''}
                    </div>
                </div>
            </div>
        </>
    );
}