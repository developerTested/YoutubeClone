import { useState, useEffect } from "react";

export default function useVideoPlayer(videoElement) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isEnded: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    isFullScreen: false,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;

    const ended = Boolean(progress === 100);

    setPlayerState({
      ...playerState,
      progress,
      isEnded: progress === 100 ? true : false,
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  function toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
      videoElement?.current?.parentElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setPlayerState({
      ...playerState,
      isFullScreen: !playerState.isFullScreen,
    });
  }

  function toggleTheaterMode() {
    videoElement.current.classList.toggle("theater")
  }

  function toggleMiniPlayerMode() {
    if (videoElement.current.classList.contains("mini-player")) {
      document.exitPictureInPicture()
    } else {
      videoElement.current.requestPictureInPicture()
    }
  }

  function skip(duration) {
    videoElement.currentTime += duration
  }

  const handleVideoKeys = (event) => {

    console.log(event.key);

    switch (event.key.toLowerCase()) {
      case "k":
        togglePlay()
        break
      case "f":
        toggleFullScreenMode()
        break
      case "t":
        toggleTheaterMode()
        break
      case "i":
        toggleMiniPlayerMode()
        break
      case "m":
        toggleMute()
        break
      case "arrowleft":
      case "j":
        skip(-5)
        break
      case "arrowright":
      case "l":
        skip(5)
        break
      case "c":
        toggleCaptions()
        break
      default:
        break;
    }
  }

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  return {
    playerState,
    isPlaying: playerState.isPlaying,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullScreenMode,
    toggleMiniPlayerMode,
    toggleTheaterMode,
    handleVideoKeys
  };
};