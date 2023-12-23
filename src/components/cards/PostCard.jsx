import React from 'react'
import Avatar from '../Avatar'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function PostCard({ video }) {

    if (!video) {
        return <React.Fragment></React.Fragment>
    }

    const thumbnails = video.thumbnails;

    return (
        <div className="flex flex-col gap-2 rounded-lg border p-2">
            <div className='flex items-center gap-2'>
                <div className="avatar shrink-0 flex items-center justify-center">
                    <Avatar
                        src={video?.channel?.avatar[video?.channel?.avatar?.length - 1]?.url}
                        alt={video?.channel?.title}
                        rounded={true}
                    />
                </div>
                <div className="channel">
                    {video?.channel ?
                        <Link to={video?.channel?.url} className='user text-xs text-gray-800 dark:text-white/70 flex items-center gap-2'>
                            {video?.channel?.title}
                        </Link>
                        : ''
                    }
                </div>
                <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70'>
                    <div className="views">{video?.views}</div>
                    {video?.publishedAt && (
                        <>
                            <div className="block">•</div>
                            <div className="uploaded">
                                {video?.publishedAt}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex gap-2">

                <div className="content flex-auto line-clamp-6">
                    {video?.content}
                </div>

                {thumbnails ?
                    <div className="w-32 h-32 shrink-0">
                        <LazyLoadImage
                            wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                            className="h-full w-full object-cover rounded-xl"
                            src={thumbnails[0]?.url}
                            alt={video?.title}
                        />
                    </div> : ''}
            </div>
        </div>
    )
}
