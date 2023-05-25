import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


const Navbar = () => {

    const { logOutUser } = useContext(AuthContext)

    const getToken = () => {
        return localStorage.getItem('authToken')
    }



    return (

        <div id="header">
            <nav>

                <div id="nav-links">

                    <Link to='/movies/all-movies'>
                        <img src="/img/Movie_Logo2-resize.png" alt='logo' />
                    </Link>

                </div>
                <div id="nav-login">

                    {getToken() ?

                        <>
                            <button>
                                <Link to='/users/profile'>
                                    Profile
                                </Link>
                            </button>
                            <button onClick={logOutUser}>
                                Logout
                            </button>
                        </>

                        :

                        <>
                            <Link to='/auth/login'>
                                Login
                            </Link>

                            <Link to='/auth/signup'>
                                Sign Up
                            </Link>
                        </>

                    }

                </div>
            </nav>

        </div>
    )
}

export default Navbar