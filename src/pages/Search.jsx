import React, { useEffect, useState } from 'react';
import SearchResultVideoCard from '../components/cards/SearchResultVideoCard';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';
import YoutubeApi from '../utilities/youtubeApi';
import Carousel from '../components/carousel/Carousel';

export default function Search(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, setLoading } = useApp();
    const [result, setResult] = useState([]);

    const keyword = searchParams.get('q');

    const fetchData = async () => {

        setLoading(true);

        const query = new URLSearchParams({
            q: keyword
        })

        try {
            const response = await YoutubeApi.get('/search?' + query.toString())
            setResult(response.items);

            setLoading(false);

        } catch (error) {

            setLoading(true);
            setResult([]);
        }

    }

    useEffect(() => {
        fetchData()
    }, [keyword])

    return (
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-1 gap-2 p-5">
            {loading ? Array.from(new Array(5)).map((_, i) => <SearchResultVideoCard key={i} />) : result.length ? result.map((item, i) => {

                if (item.videos) {
                    return (
                        <div className='block my-2 space-y-2' key={i}>
                            <h3 className='text-lg font-semibold'>
                                {item.title}
                            </h3>

                            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-1 gap-2 p-5">
                                {Array.isArray(item.videos) && item.videos.every(x => x.type === "game" || x.type === "music" || x.type === "movie" || x.type === "reel") ? <Carousel card='shorts' loading={false} slides={item.videos} /> : Array.isArray(item.videos) ? item.videos.map((v, i) => <SearchResultVideoCard
                                    key={i}
                                    video={v}
                                />) : ''}
                            </div>
                        </div>
                    )
                }

                return (
                    <SearchResultVideoCard
                        key={i}
                        video={item}
                    />
                );
            }) : ''}
        </div>
    );
}
