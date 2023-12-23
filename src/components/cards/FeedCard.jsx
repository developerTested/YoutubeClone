import React from 'react'
import ShortVideoCard from './ShortVideoCard'
import VideoCard from './VideoCard'
import PlayListCard from './PlayListCard';
import ChannelCard from '../channel/ChannelCard';
import PostCard from './PostCard';

export default function FeedCard({ video }) {

    if (!video.id) {
        return <div className="block"></div>
    }

    const videoType = video.type?.toLowerCase();

    if (['reel', 'game'].includes(videoType)) {
        <ShortVideoCard video={video} loading={false} />
    }

    if(['video', 'live'].includes(videoType)){
        return <VideoCard video={video} loading={false} />
    }

    if(['playlist'].includes(videoType)) {
        return <PlayListCard video={video} />
    }

    if(['channel'].includes(videoType)) {
        return <ChannelCard channel={video} />
    }

    if(['post'].includes(videoType)){
        return <PostCard video={video} />
    }
}
