import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import SuggestionCard from '../components/cards/SuggestionCard';
import VideoDetails from "../components/VideoDetails";
import { useParams } from 'react-router-dom';
import YoutubeApi from '../utilities/youtubeApi';
import { useApp } from '../contexts/contextApi';
import CommentList from '../components/CommentList';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function WatchPage(props) {

    const { id } = useParams();

    const { loading, setLoading } = useApp();
    const [video, setVideo] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [context, setContext] = useState(null);

    const copySuggestionList = suggestions;

    const fetchData = async () => {

        setLoading(true);

        try {

            const response = await YoutubeApi.get('/watch/' + id);

            setVideo(response);
            setSuggestions(response.suggestion);
            setContext(response.suggestionContext);

            document.title = response.title;

            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }

    const fetchMoreSuggestions = async () => {

        try {

            const response = await YoutubeApi.post(`/watch/${id}/suggestions`, {
                context,
            });

            const newComments = [...new Set([...suggestions, ...response.items])];

            setSuggestions(newComments);
            setContext(response.nextPage);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    return (

        <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[calc(100%_-_320px)]">
                <div className="rounded-md h-80 md:h-[400px] lg:h-[400px] xl:h-[550px] overflow-hidden dark:shadow-lg dark:shadow-slate-400">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${id}`}
                        controls
                        width="100%"
                        height="100%"
                        playing={true}
                    />
                </div>
                <VideoDetails video={video} loading={loading} />

                <div className="comment-container">
                    <CommentList items={video?.comments?.items} video={video} loading={loading} />
                </div>
            </div>
            <div className="shrink-0 flex flex-col lg:w-80 xl:w-96 relative">
                <div className="w-full h-fit overflow-auto">
                    {loading ? Array.from(new Array(10)).map((_, i) => <SuggestionCard key={i} />) :
                        <InfiniteScroll
                            next={fetchMoreSuggestions}
                            dataLength={suggestions?.length}
                            hasMore={true}
                            loader={<SuggestionCard />}
                        >
                            {suggestions && suggestions.length ? suggestions.filter(x => x.type === 'video').map((x, i) => <SuggestionCard key={i} video={x} loading={false} />) : <SuggestionCard loading={true} />}
                        </InfiniteScroll>
                    }
                </div>
            </div>
        </div>


    );
}