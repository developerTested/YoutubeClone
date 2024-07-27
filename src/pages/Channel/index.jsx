import React, { useEffect, useState } from 'react'
import Carousel from '../../components/carousel/Carousel';
import ChannelHeader from '../../components/channel/ChannelHeader';
import { useParams } from 'react-router-dom';
import YoutubeApi from '../../utilities/youtubeApi';
import { useApp } from '../../contexts/contextApi';
import classNames from 'classnames';
import FeedCard from '../../components/cards/FeedCard';
import ChannelVideoCard from '../../components/channel/ChannelVideoCard';

export default function Channel() {

    const { id } = useParams();

    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const { miniMenu } = useApp();

    const fetchData = async () => {

        try {

            setLoading(true);

            const response = await YoutubeApi.get('/channel/' + id);

            setChannel(response);

            document.title = response.title;

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
        <div className="w-full transition-all">

            <ChannelHeader data={channel} loading={loading} />

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${miniMenu ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'} gap-4 mt-4`}>
                {loading ? Array.from(new Array(5)).map((_, x) => <ChannelVideoCard key={x} loading={true} />) :
                    <React.Fragment>
                        {Array.isArray(channel.results) && channel.results?.map((v, i) => <React.Fragment key={i}>

                            {Array.isArray(channel.results) ? <div key={i} className="grid-cols-full flex flex-col gap-2">
                                {v.title ?
                                    <div className="flex flex-col">
                                        <h2 className="px-2 text-lg font-semibold">{v?.title}</h2>
                                        {v.subtitle && <div className="px-2 text-sm font-normal">{v.subtitle}</div>}
                                    </div> : ''}

                                {v?.title && ['shorts', 'games', 'movies', 'selling'].some((el) => v.title.toLowerCase()?.includes(el)) ? <Carousel card='shorts' loading={false} slides={v.videos} /> :
                                    <React.Fragment>
                                        <div className={classNames("grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2", {
                                            'lg:grid-cols-3': !miniMenu,
                                            'lg:grid-cols-3 xl:grid-cols-4': miniMenu,
                                        })}>


                                            {v?.videos?.map((video, i) => <FeedCard key={i} video={video} />)}

                                        </div>
                                    </React.Fragment>
                                }
                            </div> : ''}
                        </React.Fragment>
                        )}
                    </React.Fragment>}
            </div>
        </div>
    )
}
