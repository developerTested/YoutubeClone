import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

export default function ChannelCard({ channel }) {

    if (!channel) {
        return <h1>No Data!</h1>;
    }

    return (
        <div className='relative rounded-lg'>
            <div className="relative pointer poster-img">
                <Link to={`/channel/${channel.id}`} className={`block absolute inset-0 h-full md:max-h-60 rounded-xl overflow-hidden`}>
                    <LazyLoadImage
                        wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                        className="h-full w-full object-cover rounded-xl"
                        src={channel.avatar[channel.avatar.length - 1]?.url}
                        alt={channel.title}
                    />
                </Link>
            </div>
            <div className="details px-1 flex flex-col gap-2">
                <Link to={`/channel/${channel.id}`} className='block text-sm font-semibold line-clamp-2'>
                    {channel.title}
                </Link>
                <div className="flex flex-col gap-1 text-xs">
                    <div className='text-xs stats flex gap-2 items-center text-gray-700 dark:text-white/70'>
                        <div className="videos">{channel.videos}</div>
                        <div className="block">•</div>
                        <div className="subscribers">
                            {channel.subscriber}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}