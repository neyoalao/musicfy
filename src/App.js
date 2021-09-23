import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/App.scss";
import musics from "./musicMetadata";
import { useState, useRef } from "react";
import Library from "./components/Library";

function App() {
  // console.log(musics()[0]);

  // references
  const audioRef = useRef(null);

  //states
  const [songs, setSongs] = useState(musics());
  const [currentSong, setCurrentSong] = useState(songs[5]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songTime, setSongTime] = useState({
    currentTime: 0,
    duration: 0,
  });

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        songTime={songTime}
        setSongTime={setSongTime}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setSongTime={setSongTime}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default App;
