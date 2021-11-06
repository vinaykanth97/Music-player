import LibrarySongs from './LibrarySongs'
const Library = ({ allSongs,setActiveSong,audioRef,playPause,activeSong,setAllSongs,toggleLibrary }) => {

    return (
        <div className={`overall-library ${toggleLibrary ? 'open-library' : ''}`}>
            <h1>Library</h1>
            {allSongs.map((songs,index) => {
                return (
                    <LibrarySongs allSongs ={allSongs} songs={songs} setActiveSong={setActiveSong} activeSong={activeSong} audioRef={audioRef} playPause={playPause} setAllSongs={setAllSongs} key={index}/>
                )
            })}

        </div>
    )
}
export default Library