import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


const Navbar = () => {

    const { logOutUser } = useContext(AuthContext)

    const getToken = () => {
        return localStorage.getItem('authToken')
    }



    return (

        <div id="header" className="bg-gray-900 py-4 px-6">

            <nav className="flex items-center justify-between">

                <div id="nav-links">
                    <Link to="/movies/all-movies">
                        <img src="/img/Movie_Logo2-resize.png" alt="logo" className="w-auto sm:w-48" />
                    </Link>
                </div>

                <div id="nav-login">
                    {getToken() ? (
                        <>
                            <button className="text-white hover:text-gray-300 mx-2">
                                <Link to="/users/profile">Profile</Link>
                            </button>
                            <button className="text-white hover:text-gray-300 mx-2" onClick={logOutUser}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" className="text-white hover:text-gray-300 mx-2">
                                Login
                            </Link>
                            <Link to="/auth/signup" className="text-white hover:text-gray-300 mx-2">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

            </nav>

        </div>
    )
}

export default Navbar