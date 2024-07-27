import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom';

export default function AlbumCard({ video, loading = true }) {

    if (!video) {
        return <React.Fragment></React.Fragment>
    }

    const thumbnail = video.thumbnails[0];

    return (
        <div className='flex gap-2 w-80 shrink-0 my-2'>
            {thumbnail ?
                <Link to={`/playlist/${video.id}`} className="w-32 h-32 shrink-0">
                    <LazyLoadImage
                        wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                        className="h-full w-full object-cover rounded-xl"
                        src={thumbnail?.url || ''}
                        alt={video?.title}
                    />
                </Link> : ''}

            <div className="flex flex-col relative gap-2">
                <Link to={`/playlist/${video.id}`} className="font-bold">
                    {video?.title}
                </Link>
                <div className="content line-clamp-2 text-xs">
                    {video?.description}
                </div>
                <div className="tracks mt-auto">
                    {video?.videos}
                </div>
            </div>
        </div>
    )
}
