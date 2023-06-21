import React from "react";
import { Link } from "react-router-dom";
import { BsBroadcast } from "react-icons/bs";
import VideoLength from "./VideoLength";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function SearchResultVideoCard({ video }) {

    return (
        <>
            {video?.type === 'channel' ? <>
                <Link to={video?.url}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80">
                            <img
                                className="w-fit h-fit m-auto rounded-xl"
                                src={video?.avatar[1]?.url}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
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
                            <div className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 dark:text-white/[0.7] md:pr-24 md:my-4">
                                {video?.description}
                            </div>
                        </div>
                    </div>
                </Link>
            </> :
                <Link to={`/watch/${video?.id}`}>
                    <div className="flex flex-col md:flex-row gap-4 hover:bg-slate-100 dark:hover:bg-white/5">
                        <div className="relative shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80">
                            <LazyLoadImage
                                wrapperClassName="w-full h-full block"
                                className='block w-full h-full rounded-xl'
                                placeholderSrc='/img/1.jpg'
                                src={video?.thumbnails[0]?.url}
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