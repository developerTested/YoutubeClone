import React from 'react'

export default function ChannelLinks( { data }) {

    if(!data) {
        return;
    }

    return (
        <div className="flex items-center gap-2">
            {data.length ? data.map((x, i) => <a key={i} href={x.url} title={x.title} className='flex items-center justify-center'>
                <img src={x.icon} className='w-6 h-6 rounded-full' />
            </a>
            ) : ''}
        </div>
    )
}
