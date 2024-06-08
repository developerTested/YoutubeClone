import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function AlbumCard({ video, loading = true }) {

    if (!video) {
        return <React.Fragment></React.Fragment>
    }

    const thumbnails = video.thumbnails[0];

    return (
        <div className='flex gap-2 w-80 shrink-0'>
            {thumbnails ?
                <div className="w-32 h-32 shrink-0">
                    <LazyLoadImage
                        wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                        className="h-full w-full object-cover rounded-xl"
                        src={thumbnail?.url || ''}
                        alt={video?.title}
                    />
                </div> : ''}

            <div className="flex flex-col relative gap-2">
                <div className="font-bold">
                    {video?.title}
                </div>
                <div className="content line-clamp-5 text-xs">
                    {video?.description}
                </div>
                <div className="tracks">
                    {video?.videos}
                </div>
            </div>
        </div>
    )
}
