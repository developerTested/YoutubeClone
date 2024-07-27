import React from 'react';
import { Link } from "react-router-dom";
import VideoLength from '../VideoLength';
import { BsBroadcast } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ChannelCard from './ChannelCard';
import ShortVideoCard from '../cards/ShortVideoCard';

export default function ChannelVideoCard({ video, loading = true, ...props }) {

    if (loading && !video?.id) {
        return (
            <>
                <div role="status" className={"relative rounded animate-pulse p-3" + props.className}>
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
            {video.type.toLowerCase() === 'channel' ? <ChannelCard channel={video} /> :
                <div className='relative rounded-lg'>
                    <div className="relative pointer poster-img">
                        <Link to={`/watch/${video.id}`} className={`block absolute inset-0 h-full md:max-h-60 rounded-xl overflow-hidden`}>
                            <LazyLoadImage
                                wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                                className="h-full w-full object-cover rounded-xl"
                                src={video.thumbnail?.url}
                                alt={video.title}
                            />
                        </Link>
                        {video.type.toLowerCase() === 'reel' &&
                            <div className="absolute bottom-2 right-2 rounded flex items-center justify-center gap-1 text-center text-xs px-2 py-1 bg-black text-white">
                                <svg width="16" height="16" viewBox="0 0 16 16" focusable="false">
                                    <path fill='currentColor' d="M10.65,1C10.65,1,10.65,1,10.65,1c-0.37,0-0.75,0.1-1.09,0.31L4.25,4.46C3.44,4.93,2.96,5.89,3,6.9  C3.05,7.9,3.58,8.77,4.39,9.18c0.02,0.01,0.75,0.35,0.75,0.35l-0.9,0.53c-1.14,0.68-1.58,2.27-0.98,3.55C3.69,14.49,4.5,15,5.35,15  c0.37,0,0.74-0.1,1.09-0.31l5.31-3.15c0.8-0.48,1.29-1.43,1.24-2.45c-0.04-0.99-0.58-1.87-1.39-2.27c-0.02-0.01-0.75-0.35-0.75-0.35  l0.9-0.53c1.14-0.68,1.58-2.27,0.97-3.55C12.31,1.51,11.49,1,10.65,1L10.65,1z"></path>
                                </svg>
                                Shorts
                            </div>
                        }
                        {video.length && <VideoLength text={video.length} />}
                    </div>
                    <div className="details px-1 flex flex-col gap-2">
                        <Link to={`/watch/${video.id}`} className='text-sm font-semibold line-clamp-2'>
                            {video.title}
                        </Link>
                        <div className="flex flex-col gap-1 text-xs">
                            {video.channel &&
                                <Link to={video.channel.url} className='user text-xs text-gray-800 dark:text-white/70 flex items-center gap-2'>
                                    {video.channel.title}
                                    {video.channel.verified && (
                                        <img src='/verified.svg' className='w-4 h-4 block' />
                                    )}
                                </Link>
                            }
                            <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70'>
                                <div className="views">{video.views}</div>
                                {video.views && <div className="block">•</div>}
                                {video.publishedAt && (
                                    <>
                                        <div className="uploaded">
                                            {video.publishedAt}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {video.isLive ?
                                <div className="flex items-center gap-2 rounded text-center bg-red-600 text-sm text-white px-2">
                                    <BsBroadcast className="w-4 h-4" /> <div className="uppercase">Live</div>
                                </div>
                                : ''}

                            {video?.badges && video?.badges.length ? video.badges.map((x, i) => <div key={i} className="block rounded-md text-xs bg-slate-100 dark:bg-white/20 px-2 py-1">
                                {x}
                            </div>) : ''}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}