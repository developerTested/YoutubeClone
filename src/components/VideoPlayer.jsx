import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { MdClosedCaption, MdFullscreen, MdFullscreenExit, MdPause, MdPlayArrow, MdSettings, MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";

export default function VideoPlayer({ src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', ...props }) {

    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const video = {};

    const toggleVideo = (e) => {

        if (videoRef.current && !videoRef.current.parentElement.contains(e.target)) {
            return false;
        }

        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }

        setPlaying((prevPlaying) => !prevPlaying);

    };

    function formatDuration(time) {

        if (!time) {
            return '0:00';
        }

        const date = moment()
            .startOf("day")
            .seconds(time);

        const formattedTime = time > 3600 ? date.format("hh:mm:ss") : date.format('mm:ss');

        return formattedTime;
    }


    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime / duration) * 100;
        document.querySelector('.player-progress').style.setProperty("--progress-position", progress + '%');

        document.querySelector('.currentTime').textContent = formatDuration(videoRef.current.currentTime);
    };


    useEffect(() => {
        window.addEventListener('click', toggleVideo);

//        const timer = setInterval()

        return () => {
            window.removeEventListener('click', toggleVideo);
        }
    });


    return (
        <div className='relative group block m-auto w-full h-full bg-gradient-to-t from-black/75'>
            <video
                className='w-full h-full'
                ref={videoRef}
                onTimeUpdate={handleProgress}
                {...props}
            >

                <source src={src} type="video/mp4" />
            </video>
            <div className={`animation absolute -z-0 inset-0 w-full h-full flex items-center justify-center`}>
                <button className={`${playing ? 'animate-play-fade' : 'animate-pause-fade'} bg-black text-white rounded-full p-4`}>
                    {playing ? <MdPlayArrow className='w-8 h-8' /> : <MdPause className="w-8 h-8" />}
                </button>
            </div>
            <div className="controls hidden group-hover:block hover:block w-full absolute left-0 right-0 bottom-0 hover:z-10 text-white bg-gradient-to-t from-black/75">
                <div className="player-progress bg-white/20 w-full h-1"></div>
                <div className="controls flex items-center justify-between gap-2 p-2">
                    <div className="flex items-center gap-2">

                        <button onClick={toggleVideo}> {playing ? <MdPause className='w-6 h-6' /> : <MdPlayArrow className='w-6 h-6' />}</button>
                        <MdVolumeUp className='w-6 h-6' />

                        <MdVolumeDown className='w-6 h-6' />

                        <MdVolumeOff className='w-6 h-6' />

                        <div className="block currentTime">{formatDuration(videoRef.current?.currentTime)}</div>
                        <div className="block">/</div>
                        <div className="block">{formatDuration(videoRef.current?.duration)}</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <MdClosedCaption className='w-6 h-6' />
                        <MdSettings className='w-6 h-6' />
                        <MdFullscreen className='w-6 h-6' />
                        <MdFullscreenExit className='w-6 h-6' />
                    </div>
                </div>
            </div>
        </div>
    )
}
