import React, { useEffect, useState } from 'react'
import Carousel from '../../components/carousel';
import ChannelHeader from '../../components/channel/ChannelHeader';
import { useApp } from '../../contexts/contextApi';
import { useParams } from 'react-router-dom';
import YoutubeApi from '../../utilities/youtubeApi';
import ChannelCard from '../../components/channel/ChannelCard';

export default function Channel() {

    const { id } = useParams();

    const [channel, setChannel] = useState(null);
    const { loading, setLoading } = useApp();

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
        <>
            <div className="w-full transition-all"></div>
            <ChannelHeader data={channel} />

            <div className="block min-w-0 overflow-hidden">

                <div className="w-full">
                    {channel ? channel.results && channel.results.length && channel.results.map((v, i) =>

                        <div key={i} className="relative block w-full">
                            <h3 className='block text-lg my-2 px-4 py-2'>
                                {v.title}
                            </h3>
                            <div className="block overflow-hidden min-w-0">
                                {v.videos && v.videos.find((x) => x.type === 'channel' && x.description != null) ? v.videos && v.videos.filter((x) => x.type === 'channel').map((x) => <ChannelCard channel={x} />) : <Carousel id={v.title} slides={v.videos} card="channel" />}
                            </div>
                        </div>
                    ) : ''}
                </div>
                <div className="w-80">

                </div>
            </div>
        </>
    )
}
