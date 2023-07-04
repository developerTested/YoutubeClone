import { useState, useEffect, useRef } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VideoCard from "../VideoCard";
import ChannelVideoCard from "../channel/ChannelVideoCard";
import ShortVideoCard from "../ShortVideoCard";

export default function Carousel({
    id,
    slides,
    card = 'video',
    loading = false,
}) {
    const [curr, setCurr] = useState(1);
    const ref = useRef(id);

    const paginate = (items = slides, page = 1, perPage = 5) => {
        const offset = perPage * (page - 1);
        const totalPages = Math.ceil(items.length / perPage);
        const paginatedItems = items.slice(offset, perPage * page);

        return {
            previousPage: page - 1 ? page - 1 : null,
            nextPage: (totalPages > page) ? page + 1 : null,
            total: items.length,
            totalPages: totalPages,
            items: paginatedItems
        };
    };

    const { items, nextPage, previousPage } = paginate(slides, curr);

    const prev = () => setCurr(previousPage ? previousPage : 1);
    const next = () => setCurr(nextPage ? nextPage : 1);

    return (
        <div className="relative" ref={ref}>
            <div className="grid grid-cols-5 gap-2 transition-all duration-500 px-4">
                {items.length ? items.map((x, i) => card === 'channel' ? <ChannelVideoCard key={i} video={x} loading={loading} /> :card === 'short' ? <ShortVideoCard key={i} video={x} loading={loading} /> : <VideoCard key={i} video={x} loading={loading} />) : ''}
            </div>

            <button
                onClick={prev}
                className={`${previousPage ? 'block' : 'hidden'} absolute top-1/2 left-0 p-1 rounded-full shadow-lg border bg-white text-gray-800 hover:bg-white`}
            >
                <MdChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={next}
                className={`${nextPage ? 'block' : 'hidden'} absolute top-1/2 right-0 p-1 rounded-full shadow-lg border bg-white text-gray-800 hover:bg-white`}
            >
                <MdChevronRight className="w-6 h-6" />
            </button>

        </div>
    )
}