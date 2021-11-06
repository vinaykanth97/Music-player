const LibrarySongs = ({ songs, setActiveSong, audioRef, playPause, activeSong, allSongs, setAllSongs }) => {
    const SongSelectHandler = async () => {
        let audioPromise = await audioRef
        setActiveSong(songs)
        playPause ? audioPromise.current.play() : audioPromise.current.pause()
        let filteredSongs = allSongs.filter((allsong) => {
            if (songs.id === allsong.id) {
                return allsong.active = true
            } else {
                return allsong.active = false
            }
        })
        setActiveSong(...filteredSongs)
    }

    return (
       <>
        <div className={`library-list d-flex ${songs.active ? 'active-song' : ''}`} onClick={SongSelectHandler} >
            <figure className="song-cover">
                <img src={songs.cover} alt={songs.name}/>
            </figure>
            <div className="song-description">
                <h3>{songs.name}</h3>
                <h4>{songs.artist}</h4>
            </div>
        </div>
        </>
    )
}
export default LibrarySongs