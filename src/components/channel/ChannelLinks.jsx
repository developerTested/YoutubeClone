import React from 'react'
import Tooltip from '../Tooltip';

export default function ChannelLinks({ data }) {

    if (!data) {
        return;
    }

    return (
        <div className="flex items-center gap-2">
            {Array.isArray(data) ? data.map((x, i) =>
                <Tooltip key={i} title={x.title} position='top'>
                    <a href={x.url} title={x.title} className='flex items-center justify-center'>
                        <img src={x.icon[0]} className='w-6 h-6 rounded-full' />
                    </a>
                </Tooltip>
            ) : ''}
        </div>
    )
}
