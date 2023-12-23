import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/contextApi';
import VideoCard from '../components/cards/VideoCard';
import YoutubeApi from '../utilities/youtubeApi';
import ShortVideoCard from '../components/cards/ShortVideoCard';
import Carousel from '../components/carousel/Carousel';
import ChipList from '../components/ChipList';
import FeedCard from '../components/cards/FeedCard';

export default function HomePage(props) {

    const { loading, setLoading, miniMenu } = useApp();

    const [data, setData] = useState([]);

    const fetchData = async () => {

        try {
            setLoading(true);

            const res = await YoutubeApi.get('/');

            setData(res);

            setLoading(false);

            document.title = import.meta.env.VITE_APP_NAME;
        } catch (error) {
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchData();

        return () => {
            setData([]);
        }
    }, [])


    return (
        <div className='grid gap-4'>
            <div className="w-full overflow-hidden">
            {loading ? Array.from(new Array(30)).map((_, i) => <ChipList key={i} loading={true} />) : <ChipList loading={false} items={data.chips} /> }
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${miniMenu ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'} gap-4 mt-4`}>
                {loading ? Array.from(new Array(30)).map((_, i) => <VideoCard key={i} loading={true} />) :
                    data?.items?.length ?

                        data?.items?.map((video, i) =>
                            Array.isArray(video.items) ? video.items.length && <div key={i} className="grid-cols-full flex flex-col gap-2 shadow-md">

                                <div className="flex flex-col">
                                    <h2 className="px-2 text-lg font-normal">{video.title}</h2>
                                    {video.subtitle && <div className="px-2 text-sm font-normal">{video.subtitle}</div>}
                                </div>

                                {['shorts'].includes(video?.title?.toLowerCase()) ? <Carousel loading={false} card='shorts' slides={video.items}>
                                    <div className={`grid grid-flow-col overflow-hidden gap-4 px-4 snap-x snap-mandatory transition-all duration-500`}>
                                        {video.items ? video.items.map((x, i) => <ShortVideoCard key={i} video={x} loading={loading} />) : ''}
                                    </div>
                                </Carousel> :

                                    <div className={`grid grid-cols-1 sm:grid-cols-2 ${miniMenu ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'} ${video?.title?.toLowerCase()?.includes('shorts') ? 'lg:grid-cols-5 xl:grid-cols-6' : ''}} gap-4 mt-2`}>
                                        {video?.items?.map((video, i) => <FeedCard key={i} video={video} />)}
                                    </div>
                                }

                            </div> : <VideoCard key={i} video={video} loading={false} />
                        ) : ''}
            </div>
        </div>
    );
}