import { Link } from "react-router-dom"
// import logo from '../images/mftpLogoUpdated.png'

const Navbar = () => {
    return (

        <div id="header">
            <nav>

                <div id="nav-links">

                    <Link to='/movies/all-movies'>
                        <img src="/img/Movie_Logo2-resize.png" alt='logo' />
                    </Link>

                    {/* <Link to='/movies/search'>
                        Search
                    </Link> */}
                </div>
                <div id="nav-login">
                    <Link to='/auth/login'>
                        Login
                    </Link>
                    <Link to='/auth/logout'>
                        Logout
                    </Link>
                    <Link to='/auth/signup'>
                        Sign Up
                    </Link>
                    <Link to='/users/all-users'>
                        Users
                    </Link>
                    <Link to='/'>
                        Genres
                    </Link>
                </div>
            </nav>

        </div>
    )
}

export default Navbar