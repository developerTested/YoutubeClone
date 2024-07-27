import classNames from 'classnames';
import React, { useRef, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdMusicNote, MdThumbDown, MdThumbUp } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom';

export default function CommentCard({ comment }) {

    const [showReply, setShowReply] = useState(false);

    const ref = useRef(comment?.channel?.title);

    const replyClass = classNames('reply-list transition-all ease-in-out', {
        'max-h-fit opacity-1': showReply,
        'hidden': !showReply,
    })

    return (
        <div className='flex gap-2 p-1'>
            <div className="avatar mt-1 w-12 h-12 rounded-full shrink-0">
                <LazyLoadImage
                    wrapperClassName="w-full h-full rounded-full block bg-black/10"
                    className='block w-full h-full rounded-full object-cover'
                    src={comment?.channel?.avatar}
                    alt={comment?.channel?.title}
                />
            </div>
            <div className="w-full flex flex-col gap-1 item-center">
                <div className="flex items-center gap-2">
                    <Link to={comment?.channel?.url} className={`${comment?.isOwner ? 'bg-black/80 text-white rounded-full px-2 py-1' : ''} font-semibold flex items-center gap-2`}>
                        <div className="block">
                            {comment?.channel?.title}
                        </div>

                        {comment?.channel?.artist ?
                            <MdMusicNote className='w-4 h-4 block' />
                        :
                        comment?.channel?.verified ?
                            <img src='/verified.svg' className='w-4 h-4 block' />
                         : ''}

                    </Link>
                    <div className="publish">{comment?.publishedAt}</div>
                </div>
                <div className="content flex flex-col gap-2">
                    {comment?.content?.split('\n').map((x, i) => {
                        return (
                            <React.Fragment key={i}>
                                {x}
                                <br />
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="btn-group flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/20">
                            <MdThumbUp className="w-6 h-6" />
                        </div>
                        <div className="text-sm">{comment?.likes}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/20">
                            <MdThumbDown className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="cursor-pointer text-sm px-4 py-1 font-semibold flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/20">
                        Reply
                    </div>
                </div>
                {comment?.replies && <div className='flex flex-col gap-2'>
                    <button onClick={() => setShowReply(!showReply)} className="text-blue-600 w-max cursor-pointer text-sm px-2 py-1 font-semibold flex items-center rounded-full hover:bg-gray-200 dark:hover:bg-white/20">
                        <div className="icon">
                            {showReply ? <MdKeyboardArrowUp className="w-6 h-6" /> : <MdKeyboardArrowDown className="w-6 h-6" />}
                        </div>
                        <div className="label">{comment?.replyCount} replies</div>
                    </button>
                    <div className={replyClass}>
                        {comment?.replies.items?.length ? comment?.replies?.items?.map((reply, i) => <CommentCard comment={reply} key={i} />) : ''}
                    </div>
                    {showReply ? <button onClick={() => setShowReply(false)} className='cursor-pointer w-fit text-sm px-4 py-1 font-semibold flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/20'>
                        Hide replies
                    </button> : ''}
                </div>
                }
            </div>
        </div>
    )
}
