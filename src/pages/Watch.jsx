import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import SuggestionCard from '../components/SuggestionCard';
import VideoDetails from "../components/VideoDetails";
import { useParams } from 'react-router-dom';
import YoutubeApi from '../utilities/youtubeApi';
import { useApp } from '../contexts/contextApi';

export default function WatchPage(props) {

    const { id } = useParams();

    const [video, setVideo] = useState(null);
    const { loading, setLoading } = useApp();

    const fetchData = async () => {

        setLoading(true);

        try {

            const response = await YoutubeApi.get('/watch/' + id);

            setVideo(response);

            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }


    useEffect(() => {
        fetchData()
    }, [id])

    return (

        <div class="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
                <div className="h-80 md:h-[400px] lg:h-[400px] xl:h-[550px] dark:shadow-lg dark:shadow-slate-400">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${id}`}
                        controls
                        width="100%"
                        height="100%"
                        style={{ backgroundColor: "#000000" }}
                        playing={false}
                    />
                </div>
                <VideoDetails video={video} loading={loading} />
            </div>
            <div className="shrink-0 flex flex-col lg:w-[350px]">
                {loading ? Array.from(new Array(10)).map((_, i) => <SuggestionCard key={i} />) : video?.suggestion && video?.suggestion.length ? video?.suggestion.filter(x => x.type === 'video').map((x, i) => <SuggestionCard key={i} video={x} loading={false} />) : <SuggestionCard loading={true} />}
            </div>
        </div>


    );
}