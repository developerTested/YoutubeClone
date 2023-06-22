import React, { useEffect, useRef, useState } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md"
import ChannelVideoCard from '../channel/ChannelVideoCard';

export default function Carousel({ data, loading }) {

    const carouselContainer = useRef();
    const [carouselItems, setCarouselItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageTotal, setPageTotal] = useState(1);

    useEffect(() => {

        if (data?.videos) {
            setCarouselItems(data.videos.slice(0, 5));
            setPageTotal(data.videos.length);
        }

    }, [data]);

    const paginate = (array, pageSize, pageNumber) => {
        return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        console.log(scrollAmount);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className="flex flex-col gap-4 relative w-full px-4 mt-2 overflow-hidden">
                <div className="text-lg font-semibold my-2">
                    {data.title}
                </div>
                <div ref={carouselContainer} className="transition-all shadow gap-x-4 flex py-2 md:p-0 overflow-y-auto md:overflow-hidden">
                    {carouselItems.length ? carouselItems.map((x, i) => <div key={i} className="flex-shrink-0 min-w-0 w-60">
                        <ChannelVideoCard video={x} loading={false} />
                    </div>) : ''}
                </div>
                {page &&
                    <button onClick={() => navigation("left")} type="button" className="absolute top-0 left-0 z-[1030] flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-white hover:bg-gray-200 dark:hover:bg-white/20">
                            <MdArrowBackIosNew />
                        </span>
                    </button>
                }
                {page < pageTotal &&
                    <button onClick={() => navigation("right")} type="button" className="absolute top-0 right-0 z-[1030] flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-white hover:bg-gray-200 dark:hover:bg-white/20 ">
                            <MdArrowForwardIos />
                        </span>
                    </button>
                }
            </div>
        </>
    )
}

