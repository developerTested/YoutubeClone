import React, { useEffect, useState } from 'react';
import YoutubeApi from '../utilities/youtubeApi';
import { useApp } from '../contexts/contextApi';
import VideoCard from '../components/VideoCard';
import ShortVideoCard from '../components/ShortVideoCard';

export default function TrendingPage() {
  const { loading, setLoading } = useApp();

  const [shortList, setShortList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const fetchData = async () => {

    try {
      setLoading(true);

      const { shorts, items: videos } = await YoutubeApi.get('/trending');


      console.log(videos, shorts);

      setVideoList(videos);
      setShortList(shorts)

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
      <div className="flex flex-col">
        <div className="px-4 py-2 text-2xl">Trending Shorts</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-5">
          {loading ? Array.from(new Array(30)).map((_, i) => <VideoCard key={i} loading={true} />) :
           shortList.length ? shortList.map((x, i) => <ShortVideoCard key={i} video={x} loading={false} />) : ''}
        </div>
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