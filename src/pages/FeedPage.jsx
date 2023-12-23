import React, { useEffect, useState } from 'react';
import YoutubeApi from '../utilities/youtubeApi';
import { useApp } from '../contexts/contextApi';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/cards/VideoCard';
import Carousel from '../components/carousel/Carousel';
import FeedCard from '../components/cards/FeedCard';
import ChannelVideoCard from '../components/channel/ChannelVideoCard';
import classNames from 'classnames';
import ChannelCard from '../components/channel/ChannelCard';

export default function FeedPage() {
  const { loading, setLoading, miniMenu } = useApp();

  const [data, setData] = useState([]);

  const { name } = useParams();

  const fetchData = async () => {

    try {
      setLoading(true);

      const response = await YoutubeApi.get(`/${name}`);

      if (response.title) {
        document.title = response.title;
      }

      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(true);

      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();

    return () => {
      setData([]);
    }
  }, [name])


  return (
    <div className='grid gap-4 mt-2'>
      <div className="flex flex-col md:flex-row items-center gap-4 px-4">
        <div className="relative shrink-0">

          {loading && data?.avatar ? <img
            className="w-20 h-20 m-auto rounded-full"
            src='/img/1.jpg'
          /> :
            <img
              className="w-20 h-20 m-auto rounded-full"
              src={data?.avatar?.url ?? '/img/1.jpg'}
            />}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-medium line-clamp-2 dark:text-white">
            {loading && !data?.title ? <h1 className='w-full h-8 animate-pulse'>Loading...</h1> : data?.title}
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${miniMenu ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'} gap-4 mt-4`}>

        {loading ? Array.from(new Array(30)).map((_, i) => <VideoCard key={i} loading={true} />) :

          data && data?.items?.length ?

            <React.Fragment>


              {data?.items?.map((video, i) => <React.Fragment>


                {Array.isArray(video.items) ? <div key={i} className="grid-cols-full flex flex-col gap-2 shadow-md">
                  <div className="flex flex-col">
                    <h2 className="px-2 text-lg font-normal">{video?.title}</h2>
                    {video.subtitle && <div className="px-2 text-sm font-normal">{video.subtitle}</div>}
                  </div>

                  {['shorts', 'games'].some((el) => video?.title?.toLowerCase()?.includes(el)) ? <Carousel loading={false} card='shorts' slides={video.items}></Carousel> :
                    <React.Fragment>
                      <div className={classNames("grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2", {
                        'lg:grid-cols-3': !miniMenu,
                        'lg:grid-cols-3 xl:grid-cols-4': miniMenu,
                      })}>

                        {video?.items?.filter((x) => !['channel', 'album', 'game', 'movie'].includes(x?.type?.toLowerCase())).map((video, i) => <FeedCard key={i} video={video} />)}

                      </div>
                    </React.Fragment>
                  }


                </div> : <VideoCard key={i} video={video} loading={false} />}
              </React.Fragment>)}
            </React.Fragment> : ''}
      </div>
    </div>
  );
}