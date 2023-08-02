import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/contextApi';
import VideoCard from '../components/VideoCard';
import YoutubeApi from '../utilities/youtubeApi';

export default function HomePage(props) {

    const { loading, setLoading, miniMenu } = useApp();

    const [shortList, setShortList] = useState([]);
    const [videoList, setVideoList] = useState([]);

    const fetchData = async () => {

        try {
            setLoading(true);

            const { shorts, items: videos } = await YoutubeApi.get('/');

            setVideoList(videos);
            setShortList(shorts);

            setLoading(false);

            document.title = import.meta.env.VITE_APP_NAME;
        } catch (error) {
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchData();

        return () => {
            setVideoList([]);
            setShortList([])
        }
    }, [])


    return (
        <div className='grid gap-4'>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${miniMenu ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 mt-4`}>
                {loading ? Array.from(new Array(30)).map((_, i) => <VideoCard key={i} loading={true} />) :
                    videoList.length ? videoList.map((x, i) => <VideoCard key={i} video={x} mobileMenu loading={false} />) : ''}
            </div>
        </div>
    );
}