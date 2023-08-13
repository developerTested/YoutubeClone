import useVideoPlayer from '../utilities/useVideoPlayer';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { MdClosedCaption, MdFullscreen, MdFullscreenExit, MdPause, MdPlayArrow, MdRefresh, MdSettings, MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Tooltip from './Tooltip';

export default function VideoPlayer({ src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', ...props }) {

    const [playing, setPlaying] = useState(false);
    const videoRef = useRef('');
    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
    } = useVideoPlayer(videoRef);

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

        handleOnTimeUpdate();

        const progress = playerState.progress.toFixed(2);

        document.querySelector('.player-progress').style.setProperty("--progress-position", progress + '%');

        document.querySelector('.currentTime').textContent = formatDuration(videoRef.current.currentTime);
    };

    return (
        <>
            <div className="mt-24">
                <Tooltip position="top" title="Top Tooltip">
                    Hello
                </Tooltip>

                <Tooltip position="bottom" title="Bottom Tooltip">
                    Hello
                </Tooltip>

                <Tooltip position="left" className="Left Tooltip">
                    Hello
                </Tooltip>

                <Tooltip position="right" className="Right Tooltip">
                    Hello
                </Tooltip>
            </div>

            <div className='relative group block m-auto w-full h-1/2 bg-gradient-to-t from-black/75'>
                <video
                    id='player-video'
                    className='w-full h-full'
                    ref={videoRef}
                    onTimeUpdate={handleProgress}
                    {...props}
                >

                    <source src={src} type="video/mp4" />
                </video>
                <div className={`animation absolute -z-0 inset-0 w-full h-full flex items-center justify-center`}>
                    <button className={`${playerState.isPlaying ? 'animate-play-fade' : 'animate-pause-fade'} bg-black text-white rounded-full p-4`}>
                        {playerState.isPlaying ? <MdPlayArrow className='w-8 h-8' /> : playerState.isEnded ? <MdRefresh className="w-8 h-8" /> : <MdPause className="w-8 h-8" />}
                    </button>

                    {playerState.isEnded &&
                        <button onClick={() => videoRef.current.play()} className="bg-black text-white rounded-full p-4">
                            <MdRefresh className="w-8 h-8" />
                        </button>
                    }
                </div>
                <div className="controls z-10 hidden group-hover:block hover:block w-full absolute left-0 right-0 bottom-0 hover:z-10 text-white bg-gradient-to-t from-black/75">
                    <div className="player-progress bg-white/20 w-full h-1"></div>
                    <input
                        className='w-full'
                        type="range"
                        min="0"
                        max="100"
                        value={playerState.progress}
                        onChange={(e) => handleVideoProgress(e)}
                    />
                    <div className="controls flex items-center justify-between gap-2 p-2">
                        <div className="flex items-center gap-2">

                            <button onClick={togglePlay}>
                                {playerState.isPlaying ? <MdPause className='w-8 h-8' /> : playerState.isEnded ? <MdRefresh className="w-8 h-8" /> : <MdPlayArrow className="w-8 h-8" />}
                            </button>

                            <button className='flex items-center gap-2 group' onClick={toggleMute}>
                                {playerState.isMuted ? (
                                    <MdVolumeOff className='w-6 h-6' />
                                ) : (
                                    <MdVolumeUp className='w-6 h-6' />
                                )}

                                <input
                                    className='hidden group-hover:block w-20'
                                    type="range"
                                    min="0"
                                    max="1"
                                    value={videoRef.current.volume}
                                    onChange={(e) => handleVideoProgress(e)}
                                />
                            </button>
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
        </>
    )
}
