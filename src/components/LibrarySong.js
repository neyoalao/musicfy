import React from "react";

const LibrarySong = ({ song, setCurrentSong, audioRef, setSongTime, isPlaying }) => {
  //methods
  const selectedSong = async () => {
    await setCurrentSong(song);
    setSongTime(audioRef.current.duration);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="library-song-container" onClick={selectedSong}>
      <img src={song.cover} alt={song.artist}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
