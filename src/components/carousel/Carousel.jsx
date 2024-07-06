import { useState, useEffect, useRef } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VideoCard from "../cards/VideoCard";
import ChannelVideoCard from "../channel/ChannelVideoCard";
import ShortVideoCard from "../cards/ShortVideoCard";
import GameCard from "../cards/GameCard";
import AlbumCard from "../cards/AlbumCard";
import MovieCard from "../cards/MovieCard";

export default function Carousel({
    id,
    slides = [],
    card = 'video',
    loading = false,
}) {

    if (!slides) {
        return <h1>Invalid Data</h1>
    }

    const [curr, setCurr] = useState(1);

    const gridRef = useRef(null);

    const paginate = (items = slides, page = 1, perPage = 5) => {
        const offset = perPage * (page - 1);
        const totalPages = Math.ceil(items.length / perPage);

        return {
            previousPage: page - 1 ? page - 1 : null,
            nextPage: (totalPages > page) ? page + 1 : null,
            total: items.length,
            totalPages: totalPages,
        };
    };

    const { nextPage, previousPage } = paginate(slides, curr);

    const navigation = (dir) => {
        const container = gridRef.current;

        const scrolled = dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);


        dir === "left" ? setCurr(previousPage ? previousPage : 1) : setCurr(nextPage ? nextPage : 1);

        container.scrollTo({
            left: scrolled,
            behavior: "smooth",
        });

    };



    return (
        <div className="relative p-1">
            <div ref={gridRef} className={`grid ${['shorts'].includes(card) ? 'grid-flow-col overflow-hidden' : 'grid-cols-4'} px-4 snap-x snap-mandatory" gap-2 transition-all duration-500`}>
                {slides.length ? slides.map((x, i) => x.type === 'channel' ? 
                <ChannelVideoCard key={i} video={x} loading={loading} /> : x.type === 'reel' ? 
                <ShortVideoCard key={i} video={x} loading={loading} /> : x.type === 'game' ? 
                <GameCard video={x} key={i} loading={loading} />  : x.type === 'album' ? 
                <AlbumCard video={x} key={i} loading={loading} /> : x.type === 'movie' ?  
                <MovieCard video={x} key={i} loading={loading} />  :
                <VideoCard key={i} video={x} loading={loading} />) : ''}
            </div>
            <button
                onClick={() => navigation('left')}
                className={`${previousPage ? 'block' : 'hidden'} absolute top-1/2 -left-4 p-1 rounded-full shadow-lg border bg-white text-gray-800 hover:bg-white`}
            >
                <MdChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={() => navigation('right')}
                className={`${nextPage ? 'block' : 'hidden'} absolute top-1/2 -right-4 p-1 rounded-full shadow-lg border bg-white text-gray-800 hover:bg-white`}
            >
                <MdChevronRight className="w-6 h-6" />
            </button>
        </div>
    )
}