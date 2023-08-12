import React from "react";
import { Link } from "react-router-dom";
import { BsBroadcast } from "react-icons/bs";
import VideoLength from "./VideoLength";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function SearchResultVideoCard({ video }) {

    if (!video?.id) {
        return (
            <div className="flex flex-col md:flex-row gap-4 animate-pulse">
                <div className="relative rounded-xl shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 bg-slate-200 dark:bg-white/20"></div>
                <div className="flex flex-col gap-1 w-full">
                    <div className="text-lg font-medium line-clamp-2 dark:text-white h-8 bg-slate-200 dark:bg-white/20"></div>
                    <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70 h-6 bg-slate-200 dark:bg-white/20'></div>
                    <div className="mt-2 flex items-center gap-2 rounded-full overflow-hidden">
                        <div className="w-8 h-8 block rounded-full bg-slate-200 dark:bg-white/20"></div>
                        <div className="text-sm flex gap-2 items-center text-gray-700 dark:text-white/70">
                            <div className="w-96 h-8 bg-slate-200 dark:bg-white/20"></div>
                        </div>
                    </div>
                    <div className="w-full h-8 bg-slate-200 dark:bg-white/20"></div>
                </div>
            </div>
        )
    }

    return (
        <>
            {video?.type === 'channel' ? <>
                <Link to={video?.url}>
                    <div className="flex flex-col md:flex-row gap-4 border border-slate-200">
                        <div className="relative shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80">
                            <LazyLoadImage
                                wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                                className="h-full w-full object-cover rounded-xl"
                                src={video?.avatar[video?.avatar?.length - 1]?.url}
                                alt={video?.title}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <div className="text-lg font-medium line-clamp-2 dark:text-white">
                                        {video?.title}
                                    </div>
                                    <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70'>
                                        <div className="channelId">{video?.id}</div>

                                        <div className="block">•</div>
                                        <div className="subscribers">
                                            {video?.subscriber}
                                        </div>
                                    </div>
                                </div>
                                <div className="subscriber-btn rounded-full px-6 py-2 bg-black dark:bg-white dark:text-black text-white text-center">
                                    Subscribe
                                </div>
                            </div>
                            <div className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 dark:text-white/[0.7] md:pr-24 md:my-4">
                                {video?.description}
                            </div>
                        </div>
                    </div>
                </Link>
            </> :
                <Link to={`/watch/${video?.id}`}>
                    <div className="flex flex-col md:flex-row gap-4 rounded-md hover:bg-slate-100 dark:hover:bg-white/5">
                        <div className="relative shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80">
                            <LazyLoadImage
                                wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                                className="h-full w-full object-cover rounded-xl"
                                src={video?.thumbnails[video?.thumbnails?.length - 1]?.url}
                                alt={video?.title}
                            />

                            {!video?.isLive && video?.length && (
                                <VideoLength isLive={false} text={video?.length} />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium line-clamp-2 dark:text-white">
                                {video?.title}
                            </div>
                            <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70'>
                                <div className="views">{video?.views}</div>
                                {video?.publishedAt && (
                                    <>
                                        <div className="block">•</div>
                                        <div className="uploaded">
                                            <time>
                                                {video?.publishedAt}
                                            </time>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mt-2 flex items-center gap-2 rounded-full overflow-hidden">
                                <img
                                    className="w-6 h-6 block rounded-full"
                                    src={video?.channel?.avatar?.url}
                                />

                                <div className="text-sm flex gap-2 items-center text-gray-700 dark:text-white/70">
                                    {video?.channel?.title}
                                    {video?.channel?.verified && (
                                        <img src='/verified.svg' className='w-4 h-4 block' />
                                    )}
                                </div>

                            </div>
                            <div className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 dark:text-white/[0.7] md:pr-24 md:my-4">
                                {video?.description}
                            </div>


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
                </Link>
            }
        </>
    );
};