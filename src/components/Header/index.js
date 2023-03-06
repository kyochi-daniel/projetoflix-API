import './header.css'
import { Link } from 'react-router-dom'

function Header() {
    return(
        <header>
            <Link className='logo' to="/">Prime<span>Flix</span></Link>
            <Link className='favoritos' to="/favoritos">Meu filmes</Link>
        </header>
    )
}

export default Header