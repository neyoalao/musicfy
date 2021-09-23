import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStepForward, faStepBackward } from "@fortawesome/free-solid-svg-icons";

const Player = ({ songs, currentSong, setCurrentSong, audioRef, isPlaying, setIsPlaying, songTime, setSongTime }) => {
  // states

  // methods
  const playSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongTime({ ...songTime, currentTime, duration });
  };

  const dragInput = (e) => {
    setSongTime({ ...songTime, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  // awaiting in this method so as to allow the song be played only
  // when the metadata has already been loaded and everything is ready
  const skipSong = async (direction) => {
    let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "forward") {
      await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);

      if (isPlaying) audioRef.current.play();

      console.log(currentSongIndex + 1);
    } else if ("backward") {
      if ((currentSongIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
    }
  };

  const autoPlayNext = async () => {
    let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
    audioRef.current.play();
  };

  const formatTime = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  };
  return (
    <div className="player-container">
      <div className="time-controller">
        <p>{songTime.currentTime ? formatTime(songTime.currentTime) : "0:00"}</p>
        <input type="range" value={songTime.currentTime || 0} onChange={dragInput} min={0} max={songTime.duration} />
        <p>{songTime.duration ? formatTime(songTime.duration) : "0:00"}</p>
      </div>

      <div className="player-controller">
        <FontAwesomeIcon size="3x" icon={faStepBackward} onClick={() => skipSong("backward")} />
        <FontAwesomeIcon size="3x" icon={isPlaying ? faPause : faPlay} onClick={playSong} />
        <FontAwesomeIcon size="3x" icon={faStepForward} onClick={() => skipSong("forward")} />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdate}
        onLoadedMetadata={timeUpdate}
        onEnded={autoPlayNext}
      ></audio>
    </div>
  );
};

export default Player;
