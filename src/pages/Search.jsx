import React, { useEffect, useState } from 'react';
import SearchResultVideoCard from '../components/SearchResultVideoCard';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useApp } from '../contexts/contextApi';
import YoutubeApi from '../utilities/youtubeApi';

export default function Search(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, setLoading } = useApp();
    const [result, setResult] = useState([]);

    const keyword = searchParams.get('q');

    const fetchData = async () => {

        try {
            const response = await YoutubeApi.get('/search?keyword=' + keyword)
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
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 p-5">
            {result.length ? result.map((item, i) => {
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
