import React from 'react'
import ShortVideoCard from './ShortVideoCard'
import VideoCard from './VideoCard'
import PlayListCard from './PlayListCard';
import ChannelCard from '../channel/ChannelCard';
import PostCard from './PostCard';
import GameCard from './GameCard';
import AlbumCard from './AlbumCard';
import MovieCard from './MovieCard';

export default function FeedCard({ video }) {

    const videoType = video.type?.toLowerCase();

    if (['movie'].includes(videoType)) {
        return <MovieCard video={video} loading={false} />
    }

    if (['album'].includes(videoType)) {
        return <AlbumCard video={video} loading={false} />
    }

    if (['game'].includes(videoType)) {
        return <GameCard video={video} loading={false} />
    }

    if (['reel'].includes(videoType)) {
        return <ShortVideoCard video={video} loading={false} />
    }

    if (['video', 'live'].includes(videoType)) {
        return <VideoCard video={video} loading={false} />
    }

    if (['playlist'].includes(videoType)) {
        return <PlayListCard video={video} />
    }

    if (['channel'].includes(videoType)) {
        return <ChannelCard channel={video} />
    }

    if (['post'].includes(videoType)) {
        return <PostCard video={video} />
    }
}
