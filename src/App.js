import React, { useState, useRef, useEffect } from 'react'
import './styles/style.scss'
import SongsList from './components/SongsList'
import Player from './components/Player'
import Data from './Data'
import Header from './components/Header'
import Library from './components/Library'
function App() {
  const [allSongs, setAllSongs] = useState(Data())
  const [currentSong, setcurrentSong] = useState(allSongs[0])
  const [activeSong, setActiveSong] = useState(currentSong)
  const [playPause, setPlayPause] = useState(false)
  const audioRef = useRef()
  const [duration, setDuration] = useState({
    currentDuration: null,
    durationEnd: null
  })
  const [toggleLibrary, setToggleLibrary] = useState(false)
  const AudioHandler = () => {
    setDuration({
      ...duration,
      currentDuration: audioRef.current.currentTime,
      durationEnd: audioRef.current.duration
    })
  }
  const AutoSkipHandler = async () => {
    let getIndex = allSongs.findIndex((songs) => {
      return songs.active === true
    })
    let nextPrev;
    nextPrev = allSongs[getIndex + 1]
    if (getIndex >= allSongs.length - 1) {
      nextPrev = allSongs[getIndex % getIndex]
    }
    setActiveSong(nextPrev)
    let selectiveSongs = allSongs.map((allSong) => {
      if (allSong.id === nextPrev.id) {
        return {
          ...allSong,
          active: true
        }
      } else {
        return {
          ...allSong,
          active: false
        }
      }
    })
    setAllSongs(selectiveSongs)
    let audioPromise = await audioRef;
    if (playPause) {
      audioPromise.current.play()
    }
  }
  return (
    <>
      <div className={`container ${toggleLibrary ? 'move-container' : ''} ${playPause ? 'song-playing' : ''}`}>
        <Header setToggleLibrary={setToggleLibrary} toggleLibrary={toggleLibrary}/>
        <div className="song-player">
          <SongsList activeSong={activeSong} playPause={playPause}/>
          <Player audioRef={audioRef} duration={duration} playPause={playPause} setPlayPause={setPlayPause} setDuration={setDuration} activeSong={activeSong} allSongs={allSongs} setAllSongs={setAllSongs} setActiveSong={setActiveSong} />
        </div>
      </div>
      <Library allSongs={allSongs} setActiveSong={setActiveSong} audioRef={audioRef} playPause={playPause} activeSong={activeSong} setAllSongs={setAllSongs} toggleLibrary={toggleLibrary}/>
      <audio src={activeSong.audio} ref={audioRef} onLoadedMetadata={AudioHandler} onTimeUpdate={AudioHandler} onEnded={AutoSkipHandler}></audio>
    </>
  );

}

export default App;
