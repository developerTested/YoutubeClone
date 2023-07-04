import React, { useEffect, useState } from 'react';
import YoutubeApi from '../utilities/youtubeApi';
import { useApp } from '../contexts/contextApi';
import VideoCard from '../components/VideoCard';
import ShortVideoCard from '../components/ShortVideoCard';
import Carousel from '../components/carousel';

export default function TrendingPage() {
  const { loading, setLoading } = useApp();

  const [trending, setTrending] = useState([]);
  const [shortList, setShortList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const fetchData = async () => {

    try {
      setLoading(true);

      const response = await YoutubeApi.get('/trending');

      document.title = response.title;

      setTrending(response);
      setVideoList(response.items);
      setShortList(response.shorts)

      setLoading(false);
    } catch (error) {
      setLoading(true);

      console.log(error);
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
      <div className="flex flex-col md:flex-row items-center gap-4 px-4">
        <div className="relative shrink-0">
          {loading ? <img
            className="w-20 h-20 m-auto rounded-full"
            src='/img/1.jpg'
          /> :
            <img
              className="w-20 h-20 m-auto rounded-full"
              src={trending?.avatar?.url ?? '/img/1.jpg'}
            />}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-medium line-clamp-2 dark:text-white">
            {loading ? <h1 className='w-full h-8 animate-pulse'>Loading...</h1> : trending?.title}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4 py-2 text-2xl">Trending Shorts</div>
        {loading ? <div className='grid grid-cols-5 gap-2 p-2'>
          {
            Array.from(new Array(5)).map((_, i) => <ShortVideoCard key={i} loading={true} />)
          } </div> :
          shortList.length ? <Carousel id='short' card='short' slides={shortList} loading={false} /> : ''}
      </div>
      <div className="flex flex-col">
        <div className="px-4 py-2 text-2xl">Trending Videos</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">

          {loading ? Array.from(new Array(30)).map((_, i) => <VideoCard key={i} loading={true} />) :
            videoList.length ? videoList.map((x, i) => <VideoCard key={i} video={x} loading={false} />) : ''}
        </div>
      </div>
    </div>
  );
}