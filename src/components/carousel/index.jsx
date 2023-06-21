import React, { useRef } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md"
import VideoCard from '../VideoCard';
export default function Carousel({ data, loading }) {

    const carouselContainer = useRef();

    return (

        <div className='flex flex-col gap-4 relative w-full'>
            {b.map((v, i) => <>
                <div key={i} className="flex flex-col gap-4 relative w-full shadow-md">
                    <div className="text">
                        {v.title}
                    </div>
                    <div className="gap-4 flex items-center w-full h-56 md:h-96 p-5 overflow-x-auto rounded-lg shadow">
                        {v.videos.length ? v.videos.map((x, i) => <div key={i} className="w-60">
                            <VideoCard video={x} loading={false} title={v.title} counter={i} />
                        </div>) : ''}
                    </div>

                    <button type="button" className="absolute top-0 left-0 z-[1030] flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-white hover:bg-gray-200 dark:hover:bg-white/20">
                            <MdArrowBackIosNew />
                        </span>
                    </button>
                    <button type="button" className="absolute top-0 right-0 z-[1030] flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                        <span className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-white hover:bg-gray-200 dark:hover:bg-white/20 ">
                            <MdArrowForwardIos />
                        </span>
                    </button>
                </div>
            </>)}
        </div>
    )
}


const b = [
    {
        "title": "Popular videos",
        "videos": [
            {
                "id": "GKYr5eWm8EY",
                "type": "video",
                "title": "Build a Full Stack E-Commerce Website with React 18, Strapi, Stripe | Complete E-Commerce Project",
                "publishedAt": "6 months ago",
                "views": "169K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/GKYr5eWm8EY/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCfKeTUG5mgPb3flKZeS9bn_5i_6w",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/GKYr5eWm8EY/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBpBrXfpow5BhLBeAjI4L3IPCcN2w",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/GKYr5eWm8EY/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCY2A5NimqZxHFw2I5KlyrZ_gnhuQ",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/GKYr5eWm8EY/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAWNq0y9_otdYdFQGR-jcVPnKeeFQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "VLgVw2NEqCM",
                "type": "video",
                "title": "Build & Deploy Movix Single Page Web Application with React & Redux Full Course | Fully Responsive",
                "publishedAt": "4 months ago",
                "views": "102K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAKBy-QR7Neqr3sOnFmUX0YwTBshQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCJSrXmiAzCoxPc-_KbRj8Ov1Z9hw",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB66sCdaiIP8EwYUk-pMww_NuDz2Q",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLASDLUME5rfeTQGvpo-9OswUiVjow",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "8xf78RNtfHY",
                "type": "video",
                "title": "Build & Deploy a Full Stack E-Commerce Website with Next.js 13, Strapi Headless CMS & Tailwind CSS",
                "publishedAt": "3 months ago",
                "views": "77K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA_Yn7TbM_H8L-E9T5Nnin0zbI4vQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAhFYuUN5hLETZ0hL0jOpRreABZGw",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCF6eFMoU8c6ia0vFHCSG0RqOSqPA",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCoVIgghR89GNOpD58-s79_mlN-9Q",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "8HTYXNLLLSQ",
                "type": "video",
                "title": "Build & Deploy Fully Functional YouTube Clone Single Page Application with React JS & Tailwind CSS",
                "publishedAt": "6 months ago",
                "views": "48K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/8HTYXNLLLSQ/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDNZ85bqvg38eA1PIlM1kfoSzYWnw",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8HTYXNLLLSQ/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBkd-n2G9NU0NoF6rhTO34BLdmVrA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8HTYXNLLLSQ/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA5PyMySocLgbVVU3pCrMf63fYLug",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8HTYXNLLLSQ/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD_pZrzxudoxtgyatZyVrpW-q0yyA",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "wFaPrqi1YFQ",
                "type": "video",
                "title": "Build & Deploy Fully Functional Personal Portfolio Website with Modern UI/UX in React JS",
                "publishedAt": "7 months ago",
                "views": "28K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/wFaPrqi1YFQ/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDoQIG2WAlAy3isoqTTotxPeiGHjA",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/wFaPrqi1YFQ/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBHUvTKvGL4Aamd6vAJ2BNALFQC8g",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/wFaPrqi1YFQ/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAJtuCgv0ogzHZqGiRF_Un-zLXEhg",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/wFaPrqi1YFQ/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDWwjxf4zz9zwNAFjaFNUo-PFEtwQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "a_GYyOijWBc",
                "type": "video",
                "title": "Build & Deploy a Full Stack E-Commerce Website with Next.js & Strapi | Part-2 (Backend & Deployment)",
                "publishedAt": "3 months ago",
                "views": "23K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAWPUjAvAdjH20PVxlF2C2Y1U86sw",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBjIlag5y-sOu4zKWza3G-6F9KHSQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLANR3miFq7q3sE3w9nit0Up8BsLUw",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBd6efvLstbv0N2DC7xQAe5uX20FQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "tMDFbRthM5s",
                "type": "video",
                "title": "Build & Deploy ChatGPT Ai App with React | OpenAI ChatGPT 3 NLP Model",
                "publishedAt": "5 months ago",
                "views": "12K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC5XFBDHjWaJS6Awt7QPYxNtZJb7g",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA4S2W_R41kWQl61KeFIqnju1YQiA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAGFsmaMu6_7aOjjASUvT7KMKa_WA",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAAbzqzqWKc6llJduCujUPmKjPsow",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "lRR-NOrkks4",
                "type": "video",
                "title": "Build & Deploy an App with Next.js and Firebase - Uncover the Secrets of CRUD and Authentication!",
                "publishedAt": "2 months ago",
                "views": "7K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLByGOKfnlHfGnOUgb9hVHrZ7xAA6Q",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDyHMPyTp3dUSIvzVTN7_SksCZQvQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAaUh86diUxkPd_pVN6aZYuepOojA",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAavY0klZX8x9FmdG2SJ_kt_PNVoQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "pJF6DBSjnaM",
                "type": "video",
                "title": "Build & Deploy Modern Portfolio Website with React, Tailwind & Framer Motion",
                "publishedAt": "4 months ago",
                "views": "6.6K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCrhvTPiUK8tyq0MP6yiVuTm4pGkw",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCR3-Hu9O4cguiZV02aGAciSj34ZQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDOT_bQssXRoAo31wmQdo1xhRPSIg",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCRFnJYjFVVwxdVzdRvmA23U8ArXA",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "HHoPiQx54Z8",
                "type": "video",
                "title": "React Development Master Class | 2 Real World Projects (YouTube & Google Clone) with React, Tailwind",
                "publishedAt": "3 months ago",
                "views": "6.2K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBHWDRlesm-QGEmGXqsapj06blCpA",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBgxqa47lwxhp9fguFG0SGyDf86NA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCPH7pcCLSdhQXal7GRWwtpSOfu4A",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCZaa5J48Kj5neTT1PIflagUPbRcQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "nvWwAYqL2U0",
                "type": "video",
                "title": "Build & Deploy Google Search Application with React JS & Tailwind CSS | Google Clone in React",
                "publishedAt": "6 months ago",
                "views": "6K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/nvWwAYqL2U0/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLB_sELtaJ24vCcWwwegXMxs8zONlQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/nvWwAYqL2U0/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDdWJjHu0U88ZMJih8gJ0JINXB5Ig",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/nvWwAYqL2U0/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD9Ro_EBxHgbFBl1ypP6jaCWh7-cg",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/nvWwAYqL2U0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD829cazrmU7hLu3soyYWuO1U2ROA",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "HPxd_0ECfG0",
                "type": "video",
                "title": "Build Fully Functional Personal Portfolio Website with Modern UI/UX in React JS - Part 2",
                "publishedAt": "7 months ago",
                "views": "4.9K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/HPxd_0ECfG0/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCiWxRbvSwEUKxORh3utzkKqgonbA",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HPxd_0ECfG0/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDcX6TAtTK7EdXT71w81iSCBvJTqg",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HPxd_0ECfG0/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAEYH2TyUsE-pmxktvUennWq59q5Q",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HPxd_0ECfG0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD7boaZsCquMgmsKtehZD_3qS0T_g",
                        "width": 336,
                        "height": 188
                    }
                ]
            }
        ]
    },
    {
        "title": "Created playlists",
        "videos": [
            {
                "id": "PL0kun6739zdU2At7rQCgEcdgaWa9mrX2S",
                "type": "playlist",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/E740iiqlHqA/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB47OGu_nl9cJxShwMxp3hZccWVPg",
                        "width": 480,
                        "height": 270
                    }
                ],
                "title": "Firebase & Next.js Chat Application",
                "publishedAt": "Updated yesterday",
                "length": "4 videos",
                "videos": "4 videos",
                "videoCount": "4",
                "isLive": false
            },
            {
                "id": "PL0kun6739zdWsRBPJWCOlSfBroWboCesu",
                "type": "playlist",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/5M7oldCh4Fw/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAa631fa2Ei9ZnTVX63bEt2gRZRrg",
                        "width": 480,
                        "height": 270
                    }
                ],
                "title": "React JS Course For Beginners",
                "length": "4 videos",
                "videos": "4 videos",
                "videoCount": "4",
                "isLive": false
            },
            {
                "id": "PL0kun6739zdViHyLiglb7U_1FW2bxdCRW",
                "type": "playlist",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/0wF8wrkjorg/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD7Ltj-ZHE5k3THmGBF8b95R1mUlg",
                        "width": 480,
                        "height": 270
                    }
                ],
                "title": "Personal Portfolio Website",
                "length": "3 videos",
                "videos": "3 videos",
                "videoCount": "3",
                "isLive": false
            },
            {
                "id": "PL0kun6739zdVkkopdsiSSbHMWVwbIYqUC",
                "type": "playlist",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/8HTYXNLLLSQ/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDrDf30XatBRwS_ck2FsD0imt9Org",
                        "width": 480,
                        "height": 270
                    }
                ],
                "title": "Projects",
                "publishedAt": "Updated yesterday",
                "length": "17 videos",
                "videos": "17 videos",
                "videoCount": "17",
                "isLive": false
            },
            {
                "id": "PL0kun6739zdW73fx4PWPdaYK1fJutyM96",
                "type": "playlist",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/zmRjb_duVn4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCz0JSZPp12NzAEWlSNX_bJFHJGIg",
                        "width": 480,
                        "height": 270
                    }
                ],
                "title": "JavaScript Interview Question",
                "length": "3 videos",
                "videos": "3 videos",
                "videoCount": "3",
                "isLive": false
            }
        ]
    },
    {
        "title": "Videos",
        "videos": [
            {
                "id": "k0N-lEJ5aiY",
                "type": "video",
                "title": "Build & Deploy a Full Stack Chat App with Next.js, Tailwind & Firebase | Part 3",
                "publishedAt": "1 day ago",
                "views": "661 views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/k0N-lEJ5aiY/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBwOpDuey1oftpoqggqZlocg-PHNg",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/k0N-lEJ5aiY/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBtUpNX78l1qniAa5vLLi9_YEXPNA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/k0N-lEJ5aiY/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBomUaJMgjqCTD7Re0fpc_JqyZrwQ",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/k0N-lEJ5aiY/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD5I5zfS6Me2RRKPiusV3zxU9BNyA",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "iaT3fFqas_I",
                "type": "video",
                "title": "Build & Deploy a Full Stack Chat App with Next.js, Tailwind & Firebase | Part 1",
                "publishedAt": "5 days ago",
                "views": "2.3K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/iaT3fFqas_I/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDr_P7VCqu43tJj_KJfQpodGlP0_g",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/iaT3fFqas_I/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLD7NU9z62OodUFp9mz0PFTwv88P3Q",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/iaT3fFqas_I/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAvoig5R6ZQjZokZxSiQBlag_RTKg",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/iaT3fFqas_I/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLANPFaXHJGNYzNKgvcuxAHBxyiA6A",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "E740iiqlHqA",
                "type": "video",
                "title": "Build & Deploy a Full Stack Chat App with Next.js, Tailwind & Firebase | Part 2",
                "publishedAt": "9 days ago",
                "views": "2.7K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/E740iiqlHqA/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLD0_ESEWX1U0Sj9T23X50EOM9dnNQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/E740iiqlHqA/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLD0zUjU1xLLTpxL_BgUpHkdfzbxwA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/E740iiqlHqA/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBO3Eez53NHcGAIqrVXEFM5BYMPSw",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/E740iiqlHqA/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDWVzI0rGXKGGkpDr7tUGUT6BbklA",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "lRR-NOrkks4",
                "type": "video",
                "title": "Build & Deploy an App with Next.js and Firebase - Uncover the Secrets of CRUD and Authentication!",
                "publishedAt": "2 months ago",
                "views": "7K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLByGOKfnlHfGnOUgb9hVHrZ7xAA6Q",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDyHMPyTp3dUSIvzVTN7_SksCZQvQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAaUh86diUxkPd_pVN6aZYuepOojA",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/lRR-NOrkks4/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAavY0klZX8x9FmdG2SJ_kt_PNVoQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "a_GYyOijWBc",
                "type": "video",
                "title": "Build & Deploy a Full Stack E-Commerce Website with Next.js & Strapi | Part-2 (Backend & Deployment)",
                "publishedAt": "3 months ago",
                "views": "23K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAWPUjAvAdjH20PVxlF2C2Y1U86sw",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBjIlag5y-sOu4zKWza3G-6F9KHSQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLANR3miFq7q3sE3w9nit0Up8BsLUw",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/a_GYyOijWBc/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBd6efvLstbv0N2DC7xQAe5uX20FQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "8xf78RNtfHY",
                "type": "video",
                "title": "Build & Deploy a Full Stack E-Commerce Website with Next.js 13, Strapi Headless CMS & Tailwind CSS",
                "publishedAt": "3 months ago",
                "views": "77K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA_Yn7TbM_H8L-E9T5Nnin0zbI4vQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAhFYuUN5hLETZ0hL0jOpRreABZGw",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCF6eFMoU8c6ia0vFHCSG0RqOSqPA",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/8xf78RNtfHY/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCoVIgghR89GNOpD58-s79_mlN-9Q",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "HHoPiQx54Z8",
                "type": "video",
                "title": "React Development Master Class | 2 Real World Projects (YouTube & Google Clone) with React, Tailwind",
                "publishedAt": "3 months ago",
                "views": "6.2K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBHWDRlesm-QGEmGXqsapj06blCpA",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBgxqa47lwxhp9fguFG0SGyDf86NA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCPH7pcCLSdhQXal7GRWwtpSOfu4A",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/HHoPiQx54Z8/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCZaa5J48Kj5neTT1PIflagUPbRcQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "1HDO14_cCp4",
                "type": "video",
                "title": "How to Deploy Strapi v4 on Render | Free Strapi Deployment | PostgreSQL | Cloudinary",
                "publishedAt": "4 months ago",
                "views": "4.5K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/1HDO14_cCp4/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAQUkeT7xpHRaBJoa1-euTHO0v4dg",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/1HDO14_cCp4/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCfBKED_JwAGpfG2-ujwu8-89A2Fg",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/1HDO14_cCp4/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB-OJlGAvbT2uCymJYqQ1tZhc4qLQ",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/1HDO14_cCp4/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBBRAHJKY4lUySOm0GhxPiDK5HLvA",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "pJF6DBSjnaM",
                "type": "video",
                "title": "Build & Deploy Modern Portfolio Website with React, Tailwind & Framer Motion",
                "publishedAt": "4 months ago",
                "views": "6.6K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCrhvTPiUK8tyq0MP6yiVuTm4pGkw",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCR3-Hu9O4cguiZV02aGAciSj34ZQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDOT_bQssXRoAo31wmQdo1xhRPSIg",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/pJF6DBSjnaM/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCRFnJYjFVVwxdVzdRvmA23U8ArXA",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "VLgVw2NEqCM",
                "type": "video",
                "title": "Build & Deploy Movix Single Page Web Application with React & Redux Full Course | Fully Responsive",
                "publishedAt": "4 months ago",
                "views": "102K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAKBy-QR7Neqr3sOnFmUX0YwTBshQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCJSrXmiAzCoxPc-_KbRj8Ov1Z9hw",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLB66sCdaiIP8EwYUk-pMww_NuDz2Q",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/VLgVw2NEqCM/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLASDLUME5rfeTQGvpo-9OswUiVjow",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "6qRoBQnUFhw",
                "type": "video",
                "title": "Best Way to Validate Form in React Without Using Library | Form Validations in React",
                "publishedAt": "5 months ago",
                "views": "1.9K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/6qRoBQnUFhw/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLB0azR6WCuoGG-mYbd4mO8vlkMPtg",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/6qRoBQnUFhw/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAuR7WWcJBnb7aoqfpHrSsJpffurw",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/6qRoBQnUFhw/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBt3tppwlVR6aeec6rnYwU-x7Jwzg",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/6qRoBQnUFhw/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDoLz6v-u85ii0BHOlqubbKMXZp5A",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "tMDFbRthM5s",
                "type": "video",
                "title": "Build & Deploy ChatGPT Ai App with React | OpenAI ChatGPT 3 NLP Model",
                "publishedAt": "5 months ago",
                "views": "12K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC5XFBDHjWaJS6Awt7QPYxNtZJb7g",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA4S2W_R41kWQl61KeFIqnju1YQiA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAGFsmaMu6_7aOjjASUvT7KMKa_WA",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/tMDFbRthM5s/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAAbzqzqWKc6llJduCujUPmKjPsow",
                        "width": 336,
                        "height": 188
                    }
                ]
            }
        ]
    },
    {
        "title": "React JS Course For Beginners",
        "videos": [
            {
                "id": "5M7oldCh4Fw",
                "type": "video",
                "title": "React JS Up & Running Course For Beginners - JSX Explained",
                "publishedAt": "6 months ago",
                "views": "1.6K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/5M7oldCh4Fw/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDNXb0fsJqRximkicdicyKWtWBEaQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/5M7oldCh4Fw/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDBKb4-keMeAlQltJG5DwR9J7WSvg",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/5M7oldCh4Fw/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBIf7iBvas1Sc2b9MMbWwgHmWPscQ",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/5M7oldCh4Fw/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAzRk_uU3Veq9Qq31T_eb-y_bST7Q",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "N7GxtZ2RonQ",
                "type": "video",
                "title": "React JS Up & Running Course For Beginners - Events Handling",
                "publishedAt": "6 months ago",
                "views": "655 views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/N7GxtZ2RonQ/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAVn8l6c9XRstTWXWKOovRslz58wQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/N7GxtZ2RonQ/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAtlFM1doacW8cgRg9k5Gz-6Josag",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/N7GxtZ2RonQ/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDI8OEyJ2DvkC1pg-46zzBDoKcaNQ",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/N7GxtZ2RonQ/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAghtxFDm3CVdYTvp8rEuWEVG3YdQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "qk1ihaHbKic",
                "type": "video",
                "title": "React JS Up & Running Course For Beginners - useState Explained",
                "publishedAt": "6 months ago",
                "views": "676 views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/qk1ihaHbKic/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCh6zIcbYgvVenKN3twH_R6sN2pMA",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/qk1ihaHbKic/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCf1qA-6fY3SnYz5LHKnEXL16CwgQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/qk1ihaHbKic/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAyOavAblkgA6Fsvj5d-GTN44Gr0A",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/qk1ihaHbKic/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCGUnE8G9DQg1zUUZx9LrtqeMgAjw",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "ymweMjILDtc",
                "type": "video",
                "title": "React JS Up & Running Course For Beginners - useReducer Explained",
                "publishedAt": "6 months ago",
                "views": "674 views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/ymweMjILDtc/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLA96D4MlrR_LCQUSmKVl8628Vv8Xw",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/ymweMjILDtc/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBLLOlsTSG_UYl2LZnZNMLOULLOsw",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/ymweMjILDtc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDJEybn-vNQQrAhiVsByuuqfG-7Ag",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/ymweMjILDtc/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBrR3ioyKQUdUyrmtE-x0r39_daSQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            }
        ]
    },
    {
        "title": "JavaScript Interview Question",
        "videos": [
            {
                "id": "zmRjb_duVn4",
                "type": "video",
                "title": "JavaScript Interview Question #1: Frequency Counter",
                "publishedAt": "8 months ago",
                "views": "1K views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/zmRjb_duVn4/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBvqeC09veChL9FwYXQUKW5pAHGoA",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/zmRjb_duVn4/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBbsaxmL_g84wWnnbLgqZcbY_KUlg",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/zmRjb_duVn4/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAS4S903ItdJWuVybPY10P7ig2zJw",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/zmRjb_duVn4/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDtKiLVjZj1iRxH04iiOppllQAoAQ",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "x_6RosyuxxE",
                "type": "video",
                "title": "JavaScript Interview Question #2: Anagram Challenge",
                "publishedAt": "8 months ago",
                "views": "285 views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/x_6RosyuxxE/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAd9-Z3kztudXDfr_3FtGln3cM4PQ",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/x_6RosyuxxE/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCE596_udQ9nzrti3SuqXR-Lw7OcQ",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/x_6RosyuxxE/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCKAtewKG73UrQle5Zycit6_dtYWQ",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/x_6RosyuxxE/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBH5pwKjApYTup3nk0zRguzWp1CIg",
                        "width": 336,
                        "height": 188
                    }
                ]
            },
            {
                "id": "6YMJ6Z3-Zg4",
                "type": "video",
                "title": "JavaScript Interview Question #3: Multiple Pointers Pattern | find sum zero in given array",
                "publishedAt": "8 months ago",
                "views": "325 views",
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/6YMJ6Z3-Zg4/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCTSkMjtbySKjykETPyyas0uBLDzg",
                        "width": 168,
                        "height": 94
                    },
                    {
                        "url": "https://i.ytimg.com/vi/6YMJ6Z3-Zg4/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDoxGoKrq8911FPENlP5AkU4AgYNA",
                        "width": 196,
                        "height": 110
                    },
                    {
                        "url": "https://i.ytimg.com/vi/6YMJ6Z3-Zg4/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD6Hd5YzRdmVJXvzh0YtqzocQn7Fg",
                        "width": 246,
                        "height": 138
                    },
                    {
                        "url": "https://i.ytimg.com/vi/6YMJ6Z3-Zg4/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAlNs3aBzoNUai9H7q5o7ws90wY4Q",
                        "width": 336,
                        "height": 188
                    }
                ]
            }
        ]
    }
];