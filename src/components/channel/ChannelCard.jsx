import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

export default function ChannelCard({ channel }) {

    if (!channel) {
        return <h1>No Data!</h1>;
    }

    return (
        <div className={`flex flex-col ${channel?.description ? 'md:flex-row' : ''} gap-4 p-1`}>
            <Link to={`/channel/${channel.id}`} className={`relative shrink-0 ${channel?.description ? 'h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80' : 'w-full h-32'}`}>
                <LazyLoadImage
                    wrapperClassName="w-full h-full block bg-black/10 rounded-xl"
                    className="h-full w-full object-cover rounded-xl"
                    src={channel?.avatar?.url}
                    alt={channel?.title}
                />
            </Link>
            <div className="flex flex-col gap-1">
                <div className={`flex ${channel?.description ? 'flex-row' : 'flex-col justify-center'} items-center gap-4`}>
                    <div className={`flex flex-col`}>
                        <Link to={`/channel/${channel.id}`} className="text-lg text-center font-medium line-clamp-2 dark:text-white">
                            {channel?.title}
                        </Link>
                        <div className={`items-center flex ${channel?.description ? 'flex-row gap-2' : 'flex-col items-center justify-center'} text-xs stats text-gray-700 dark:text-white/70`}>
                            <div className="channelId block">@{channel?.id}</div>
                            <div className="subscribers">
                                {channel?.subscriber}
                            </div>
                        </div>
                    </div>
                    <div className="subscriber-btn rounded-full px-6 py-2 bg-black dark:bg-white dark:text-black text-white text-center">
                        Subscribe
                    </div>
                </div>
                <div className="empty:hidden text-sm dark:text-white/[0.7] md:pr-24 md:my-4">
                    {channel?.description && channel?.description.length ? channel?.description.split('\n').map((x, i) => {
                        return (
                            <React.Fragment key={i}>
                                {x}
                                <br />
                            </React.Fragment>
                        )
                    }) : ''}
                </div>
            </div>
        </div>
    );
}