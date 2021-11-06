import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
const Player = ({ audioRef, duration, setPlayPause, playPause, setDuration, activeSong, allSongs, setAllSongs, setActiveSong }) => {


    const TrackPlayHandler = () => {
        setPlayPause(!playPause)
        if (!playPause) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }
    function AudioTimeFormatter(countdownNumber) {
        var m = ('0' + Math.floor(countdownNumber / 60 % 60)).slice(-2);
        var s = ('0' + Math.floor(countdownNumber % 60)).slice(-2);
        return m + ':' + s
    }
    AudioTimeFormatter()
    const TrackProgressHandler = (e) => {
        setDuration({
            ...duration,
            currentDuration: e.target.value,
            durationEnd: audioRef.current.duration
        })
        audioRef.current.currentTime = e.target.value;
    }
    const ConvertAudioPercentage = () => {
        let played;
        played = 100 * duration.currentDuration / duration.durationEnd;
        return played
    }
    const TrackChangeHandler = async(direction) => {
        let getIndex = allSongs.findIndex((songs) => {
            return songs.active === true
        })
        let nextPrev;
        if (direction === "skip-forward") {
            nextPrev = allSongs[getIndex + 1]
            if (getIndex >= allSongs.length - 1) {
                nextPrev = allSongs[getIndex % getIndex]
            }
            setActiveSong(nextPrev)
        }
        if (direction === "skip-backward") {
            nextPrev = allSongs[getIndex - 1]
            if (getIndex <= allSongs.length - allSongs.length) {
                nextPrev = allSongs[allSongs.length - 1]
            }
            setActiveSong(nextPrev)
        }
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
        <div className="overall-player">
            <div className="d-flex audio-range">
                <p>{AudioTimeFormatter(duration.currentDuration)}</p>
                <div className="track">
                    <input type="range" name="player" value={duration.currentDuration} min="0" max={duration.durationEnd} onChange={TrackProgressHandler} />
                    <div className="slide-range" style={{ backgroundImage: `linear-gradient(to right, ${activeSong.color[0]}, ${activeSong.color[1]})`, width: `${ConvertAudioPercentage()}%` }}></div>
                </div>

                <p>{AudioTimeFormatter(duration.durationEnd)}</p>
            </div>
            <div className="d-flex player-icons">
                <FontAwesomeIcon icon={faAngleLeft} size="2x" onClick={() => TrackChangeHandler('skip-backward')} />
                <FontAwesomeIcon icon={playPause ? faPause : faPlay} size="2x" onClick={TrackPlayHandler} />
                <FontAwesomeIcon icon={faAngleRight} size="2x" onClick={() => TrackChangeHandler('skip-forward')} />
            </div>
        </div>
    )
}
export default Player