import React, { useEffect, useState } from 'react';
import { BsDownload, BsFillCheckCircleFill } from 'react-icons/bs';
import { MdMusicNote, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Avatar from './Avatar';

export default function VideoDetails({ video = null, loading = true }) {

    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setShowMore(false);
    }, [video])

    if (loading) {
        return (
            <div className="details grid gap-4 w-full rounded animate-pulse relative ">
                <h1 className='h-8 text-2xl font-semibold bg-gray-200 rounded dark:bg-white/20'></h1>

                <div className="channel-details flex items-center gap-2">
                    <div className="w-full flex items-center mt-4 space-x-3">
                        <svg className="text-gray-200 w-14 h-14 dark:text-white/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                        </svg>
                        <div>
                            <div className="h-6 bg-gray-200 rounded dark:bg-white/20 w-32 mb-2"></div>
                            <div className="w-48 h-4 bg-gray-200 rounded dark:bg-white/20"></div>
                        </div>
                    </div>
                    <div className="video-stats flex gap-2 items-center">
                        {Array.from(new Array(5)).map((x, i) => <div key={i} className="btn-group px-4 py-2 bg-slate-100 dark:bg-white/20 flex gap-4 justify-center items-center rounded-full">
                            <div className="w-20 h-6 rounded-full"></div>
                        </div>
                        )}
                    </div>
                </div>

                <div className="description w-full h-6 px-4 py-2 block bg-slate-100 dark:bg-white/20 " />
            </div>
        )
    }


    return (
        <div className="details mt-2 grid gap-2">
            <h1 className='text-2xl font-semibold'>{video?.title}</h1>

            <div className="channel-details flex items-center gap-2">
                <div className="channel flex gap-4 w-full">
                    <div className="avatar shrink-0">
                        <Avatar src={video?.channel?.avatar?.url} alt={video?.channel?.title} rounded={true} />
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <div className="channel-info w-full md:w-auto flex items-center justify-between gap-4">
                            <div className="channel">
                                <Link className='flex items-center gap-2 user font-bold text-gray-800 dark:text-white/70' to={video?.channel.url ?? video?.channel.channelId}>
                                    {video?.channel?.title}
                                    {video?.channel?.verified && (
                                        <img src='/verified.svg' className='w-4 h-4 block' />
                                    )}
                                    {video?.channel?.artist && (
                                        <MdMusicNote className='w-4 h-4 block' />
                                    )}
                                </Link>
                                <div className="subscriber block text-sm text-gray-800 dark:text-white/70">
                                    {video?.channel?.subscriber}
                                </div>
                            </div>
                            <div className="subscriber-btn rounded-full px-6 py-2 bg-black dark:bg-white dark:text-black text-white text-center">
                                Subscribe
                            </div>
                        </div>
                    </div>
                </div>
                <div className="video-stats hidden lg:flex gap-2 items-center">
                    <div className="btn-group px-4 py-2 bg-slate-100 dark:bg-white/20 flex gap-4 justify-center items-center rounded-full">
                        <div className="like flex items-center gap-2 rounded-full text-center">
                            <div className="icon">
                                <MdThumbUp className='w-6 h-6' />
                            </div>
                            <div className="label">{video?.likes ?? 0}</div>
                        </div>
                        <div className="dislike flex items-center justify-center gap-4 rounded-full">
                            <div className="icon">
                                <MdThumbDown className='w-6 h-6' />
                            </div>
                        </div>
                    </div>


                    {video?.player?.media?.length && video?.player?.media?.find((x) => x.url) ?
                        <Dropdown icon={<BsDownload className='w-6 h-6' />} title='Download' rounded disableRightIcon>
                            {video?.player?.media?.filter((x) => x?.url?.length)?.map((x, i) => <Dropdown.Item key={i}>
                                <a href={x.url} title={x.label} target='_blank'>
                                    {x.type === 'audio' ? 'audio' : x.label} ({x.fileType})
                                </a>
                            </Dropdown.Item>)}
                        </Dropdown> : ''}
                </div>
            </div>

            <div className="description rounded-lg grid gap-4 px-4 py-2 bg-slate-100 dark:bg-white/20 ">
                <div className="flex items-center gap-2">
                    <div className="views">{video?.views}</div>
                    {video?.publishedAt && <>
                        <div className="block">•</div>
                        <div className="uploaded">
                            {video?.publishedAt}
                        </div>
                    </>}
                </div>

                {video?.description ?
                    <div className="grid transition-all">
                        {showMore ? video?.description && video?.description.length ? video?.description.split('\n').map((x, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {x}
                                    <br />
                                </React.Fragment>
                            )
                        }) : '' : <div className="text-ellipsis  ">{video?.description.length && video?.description.substring(0, 350) + "..."}</div>
                        }

                        <button onClick={() => setShowMore(!showMore)}>
                            {showMore ? "Show Less" : "Show More"}
                        </button>

                    </div> : ''}
            </div>


            {video?.player?.keywords ?
                <div className="keywords">
                    <h3>Keywords</h3>
                    <div className="flex flex-wrap items-center gap-1">
                        {video?.player?.keywords.map((x, i) => <div key={i} className="px-2 py-1 rounded-full bg-slate-100 dark:bg-white/20">
                            {x}
                        </div>)}
                    </div>
                </div>
                : ''}

            {video?.player?.category ?
                <div className="flex items-center gap-1">
                    <div className="">Posted in</div>
                    <div className="font-semibold">
                        {video?.player?.category}
                    </div>
                </div> : ''}

        </div>
    );
}