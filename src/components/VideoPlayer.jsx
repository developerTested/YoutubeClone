import useVideoPlayer from '../utilities/useVideoPlayer';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { MdClosedCaption, MdFullscreen, MdFullscreenExit, MdPause, MdPictureInPictureAlt, MdPlayArrow, MdRefresh, MdSettings, MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Logo from './Logo';

export default function VideoPlayer({ src = '/bigbucksbunny.mp4', ...props }) {


    const [playing, setPlaying] = useState(false);
    const videoRef = useRef('');
    const {
        playerState,

        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        handleVideoKeys,
        toggleMute,
        toggleTheaterMode,
        toggleFullScreenMode,
        toggleMiniPlayerMode,
    } = useVideoPlayer(videoRef);

    const video = {};

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

        document.querySelector('.player-container').style.setProperty("--progress-position", progress + '%');

        document.querySelector('.currentTime').textContent = formatDuration(videoRef.current.currentTime);
    };

    return (
        <>

            <div className='relative group block m-auto w-full h-1/2 bg-gradient-to-t from-black/75'>
                <video
                    id='player-video'
                    className='w-full h-full'
                    ref={videoRef}
                    onTimeUpdate={handleProgress}
                    onKeyUp={handleVideoKeys}
                    {...props}
                >
                    {Array.isArray(src) ? src.filter((x) => x.fileType === 'mp4').map((s, i) => <source key={i} src={s.url} type="video/mp4" />) : <source src={src} type="video/mp4" />}

                    {Array.isArray(src) ? src.filter((x) => x.type === 'audio').map((s, i) => <source key={i} src={s.url} type={`audio/${s.fileType}`} />) : ''}
                </video>

                {!playerState.isPlaying && !playerState.isEnded && <button className='absolute inset-0 w-full h-full flex items-center justify-center' onClick={togglePlay}>
                    <Logo mini className={`w-20 h-20 hover:bg-white/10 rounded-full p-1`} /> </button>
                }

                {playerState.isEnded &&
                    <div className="absolute z-10 inset-0 w-full h-full flex items-center justify-center">
                        <button onClick={togglePlay} className="bg-black text-white rounded-full p-4">
                            <MdRefresh className="w-8 h-8" />
                        </button>
                    </div>
                }

                <div className={`${playerState.isEnded ? 'hidden' : playerState.isPlaying  ? 'block' : 'block'} absolute inset-0 w-full h-full flex items-center justify-center`}>
                    <button className={` ${playerState.isEnded ? 'hidden' : playerState.isPlaying ? 'animate-play-fade' : 'animate-pause-fade'} transition-all bg-black text-white rounded-full p-4`}>
                        {playerState.isPlaying ? <MdPlayArrow className='w-8 h-8' /> : playerState.isEnded ? <MdRefresh className="w-8 h-8" /> : <MdPause className="w-8 h-8" />}
                    </button>
                </div>
                <div className="controls z-10 w-full absolute top-auto left-0 right-0 bottom-0 hover:z-10 text-white bg-gradient-to-t from-black/75">

                    <div className="player-container w-full group flex items-center justify-center">
                        <label className="group overflow-hidden relative player-progress bg-white/20 w-full h-1 group-hover:h-2" htmlFor='progress-bar' />
                    </div>

                    <div className="controls transition-all h-10 flex items-center justify-between gap-2 px-2">
                        <div className="flex items-center gap-2">

                            <button onClick={togglePlay}>
                                {playerState.isEnded ? <MdRefresh className="w-8 h-8" /> : playerState.isPlaying ? <MdPause className='w-8 h-8' /> : <MdPlayArrow className="w-8 h-8" />}
                            </button>

                            <button className='flex items-center gap-2 group' onClick={toggleMute}>
                                {playerState.isMuted ? (
                                    <MdVolumeOff className='w-6 h-6' />
                                ) : (
                                    <MdVolumeUp className='w-6 h-6' />
                                )}
                            </button>
                            <div className="block currentTime">{formatDuration(videoRef.current?.currentTime)}</div>
                            <div className="block">/</div>
                            <div className="block">{formatDuration(videoRef.current?.duration)}</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <MdClosedCaption className='w-6 h-6' />
                            <MdSettings className='w-6 h-6' />
                            {!playerState.isFullScreen &&
                                <button onClick={toggleMiniPlayerMode}>
                                    <MdPictureInPictureAlt className='w-6 h-6' />
                                </button>
                            }
                            <button onClick={toggleFullScreenMode}>
                                {playerState.isFullScreen ? <MdFullscreenExit className='w-6 h-6' /> : <MdFullscreen className='w-6 h-6' />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
