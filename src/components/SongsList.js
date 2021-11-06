const SongsList = ({activeSong,playPause}) =>{

    return(
       <div className="songlist">
           <img src={activeSong.cover} alt={activeSong.name} />
           <h2>{activeSong.name}</h2>
           <h3>{activeSong.artist}</h3>
       </div>
    )
}
export default SongsList