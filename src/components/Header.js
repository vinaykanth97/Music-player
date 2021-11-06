import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
const Header = ({setToggleLibrary,toggleLibrary}) =>{
    const ToggleLibrary =()=>{
        setToggleLibrary(!toggleLibrary)
    }
    return(
        <header className="d-flex">
            <h1>ChillHop</h1>
            <button onClick={ToggleLibrary}><FontAwesomeIcon icon={faMusic}/><span>Library</span></button>
        </header>
    )
}
export default Header