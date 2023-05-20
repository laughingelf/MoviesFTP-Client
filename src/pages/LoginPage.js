import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { MovieContext } from "../context/movie.context"
import { baseUrl } from "../services/baseUrl"
import axios from "axios"

const LoginPage = () => {

    const { setUser } = useContext(MovieContext)

    const { storeToken } = useContext(AuthContext)

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
                setUser(res.data.user)
                navigate('/users/profile')
            })
            .catch((err) => {
                console.log(err)
            })

    }






    return (
        <div id="login-page">

            <form id="login-form" onSubmit={handleLogin}>
                Login
                <label>Email:
                    <input type='email' name='email' id="email" value={currUser.email} onChange={handleChange} />
                </label>
                <label>Password:
                    <input type='password' name='password' id="password" value={currUser.password} onChange={handleChange} />
                </label>
                <button type="submit">Login</button>


            </form>


        </div>
    )
}

export default LoginPage