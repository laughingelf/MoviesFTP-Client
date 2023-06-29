
import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { MovieContext } from "../context/movie.context"
import { baseUrl } from "../services/baseUrl"






const Signup = () => {



    const { setUser } = useContext(MovieContext)

    const { storeToken } = useContext(AuthContext)

    // let storeToken

    const [newUser, setNewUser] = useState({
        email: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSignup = (e) => {
        e.preventDefault()

        axios.post(baseUrl + '/auth/signup', newUser)
            .then((res) => {
                // console.log('Signup results: ', res.data)
                storeToken(res.data.authToken)
                setUser(res.data.user)
                // console.log('this is the userdata i am looking for!!!!!!!!!!!!!!!!!!!!!', res.data.user)
                navigate(`/users/profile`) //need to change this to go to Profile page once created
            })
            .catch((err) => {
                console.log('error Data', err.response.data)
            })

    }





    return (
        <div id="login-page" className="bg-gray-200 py-8 px-4">

            <form id="login-form" onSubmit={handleSignup} className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6">

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>

                <label className="block mb-4">
                    Email:
                    <input type="email" name="email" id="email" value={newUser.email} onChange={handleChange} className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                </label>

                <label className="block mb-4">
                    Username:
                    <input type="text" name="username" id="username" value={newUser.username} onChange={handleChange} className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                </label>

                <label className="block mb-4">
                    Password:
                    <input type="password" name="password" id="password" value={newUser.password} onChange={handleChange} className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                </label>

                <button type="submit" className="w-full bg-[#15B7B9] text-white font-semibold rounded-lg px-4 py-2 hover:bg-gray-800">
                    Sign Up
                </button>

            </form>

        </div>
    )
}

export default Signup