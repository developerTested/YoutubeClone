import React from 'react'
import { MdMusicNote, MdThumbDown, MdThumbUp } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function CommentCard({ comment }) {
    return (
        <div className='flex gap-2 px-4 py-2'>
            <div className="avatar mt-1 w-12 h-12 rounded-full shrink-0">
                <LazyLoadImage
                    wrapperClassName="w-full h-full rounded-full block bg-black/10"
                    className='block w-full h-full rounded-full object-cover'
                    src={comment?.channel.avatar[comment?.channel.avatar.length - 1]?.url}
                    alt={comment?.channel?.title}
                />
            </div>
            <div className="w-full flex flex-col gap-1 item-center">
                <div className="flex items-center gap-2">
                    <div className={`${comment?.isOwner ? 'bg-black/80 text-white rounded-full px-2' : ''} font-semibold flex items-center gap-2`}>
                        <div className="block">
                            {comment?.channel?.title}
                        </div>

                        {comment?.channel?.artist && (
                            <MdMusicNote className='w-4 h-4 block' />
                        )}

                        {comment?.channel?.verified && (
                            <img src='/verified.svg' className='w-4 h-4 block' />
                        )}

                    </div>
                    <div className="publish">{comment?.publishedAt}</div>
                </div>
                <div className="content">
                    {comment?.content}
                </div>
                <div className="btn-group flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/20'">
                            <MdThumbUp className="w-6 h-6" />
                        </div>
                        <div className="text-sm">{comment?.likes}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/20'">
                            <MdThumbDown className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="cursor-pointer text-sm px-4 py-1 font-semibold flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/20">
                        Reply
                    </div>
                </div>
            </div>
        </div>
    )
}
