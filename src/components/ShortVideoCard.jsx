import React, { useEffect, useState } from 'react'
import { ImImage } from 'react-icons/im';
import { Link } from 'react-router-dom';

export default function ShortVideoCard({ video }) {
    const [loading, setLoading] = useState();


    useEffect(() => {
        if (video.id) {
            setLoading(false);
        }
    }, [video]);

    return (
        <>

            <div className={`${loading ? 'animate-pulse bg-gray-300  dark:bg-white/10' : ''} flex flex-col w-auto h-auto`}>
                <div className="poster rounded-lg bg-gray-300  dark:bg-white/10">
                    {loading ? <ImImage className='w-full h-full block object-cover' /> :
                        <Link to={`/watch/${video?.id}`}>
                            <img className='rounded-lg object-cover w-full h-full' src={video?.thumbnail?.url} />
                        </Link>
                    }
                </div>
                <h3 className="title mt-2 font-semibold line-clamp-2">
                    {loading ? <div className="h-10 bg-gray-300  dark:bg-white/10"></div> :
                        <Link to={`/watch/${video?.id}`}>
                            {video?.title}
                        </Link>
                    }
                </h3>
                <div className='text-sm stats flex gap-2 items-center text-gray-700 dark:text-white/70'>
                    <div className="views">{video?.views}</div>
                    <div className="block">•</div>
                    <div className="uploaded">
                        <time>
                            {video?.publishedAt}
                        </time>
                    </div>

                </div>
            </div>

        </>
    )
}
