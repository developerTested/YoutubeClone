import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CommentCard from './cards/CommentCard'
import YoutubeApi from '../utilities/youtubeApi';

export default function CommentList({ items, video, loading = true }) {

    if (!video || loading) {
        return <CommentSkeleton />
    }

    const [comments, setComments] = useState(items);
    const [context, setContext] = useState(video.commentContext);
    const ref = useRef();

    const fetchComments = async () => {
        try {
            const response = await YoutubeApi.post(`/watch/${video.id}/comments`, {
                context,
            });

            const newComments = [...new Set([...comments, ...response.items])];

            setComments(newComments);
            setContext(response.nextPage);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div ref={ref} className="relative w-full h-fit overflow-auto flex flex-col gap-2 divide-y dark:divide-white/20">
            
            <h2 className='text-lg my-2 px-4 py-2'>{video?.comments?.text}</h2>

            {comments && comments.length ?

                <InfiniteScroll
                    next={fetchComments}
                    dataLength={comments.length}
                    hasMore={true}
                    loader={<CommentSkeleton />}
                >
                    {comments && comments?.length ? comments?.map((x, i) => <CommentCard comment={x} key={i} />) : ''}
                </InfiniteScroll> : <div className=""></div>}
        </div>
    )
}

function CommentSkeleton() {
    return (
        <div className='animate-pulse flex gap-2 p-1'>
            <div className="avatar mt-1 w-12 h-12 rounded-full shrink-0 bg-gray-200 dark:bg-white/10" />
            <div className="w-full flex flex-col gap-1 item-center">
                <div className="bg-gray-200 dark:bg-white/10 w-60 h-8 rounded-3xl"></div>
                <div className="content flex flex-col gap-2">
                    <div className="rounded-3xl h-20 bg-gray-200 dark:bg-white/10"></div>
                </div>
                <div className="btn-group flex items-center gap-2">
                    <div className="btn rounded-3xl bg-gray-200 dark:bg-white/10 w-20 h-8"></div>
                </div>
            </div>
        </div>

    )
}