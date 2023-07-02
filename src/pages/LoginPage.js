import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { MovieContext } from "../context/movie.context"
import { baseUrl } from "../services/baseUrl"
import axios from "axios"

const LoginPage = () => {

    const { setUser } = useContext(MovieContext)

    const { storeToken, authenicateUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(false);
    const [currUser, setCurrUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCurrUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = (e) => {
        e.preventDefault()

        axios.post(baseUrl + '/auth/login', currUser)
            .then((res) => {
                console.log("this is the returned user details: ", res.data)
                storeToken(res.data.authToken)
                authenicateUser()
                navigate('/movies/all-movies')
            })
            .catch((err) => {
                console.log(err)
            })

    }






    return (
        <div id="login-page" className="min-h-screen flex flex-col bg-gray-100 py-8 items-center">
            <form id="login-form" onSubmit={handleLogin} className="max-w-sm mx-auto bg-gray-400 bg-opacity-60 rounded-lg shadow-md p-6 ">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
                <div className="flex flex-col space-y-4">
                    <label className="text-gray-700">
                        <span>Email:</span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={currUser.email}
                            onChange={handleChange}
                            className="block w-full border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="text-gray-700">
                        <span>Password:</span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={currUser.password}
                            onChange={handleChange}
                            className="block w-full border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <button type="submit" className="w-full bg-[#15B7B9] text-white border font-semibold rounded-lg px-4 py-2 mt-4 hover:bg-gray-800">
                    Login
                </button>
            </form>

            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>


    )
}

export default LoginPage