
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
                navigate(`/`) //need to change this to go to Profile page once created
            })
            .catch((err) => {
                console.log('error Data', err.response.data)
            })

    }





    return (
        <div id="login-page">


            <form id="login-form" onSubmit={handleSignup}>
                Sign Up
                <label>Email:
                    <input type='email' name='email' id="email" value={newUser.email} onChange={handleChange} />
                </label>
                <label>UserName:
                    <input type='text' name='username' id="username" value={newUser.username} onChange={handleChange} />
                </label>
                <label>Password:
                    <input type='password' name='password' id="password" value={newUser.password} onChange={handleChange} />
                </label>
                <button type="submit">Sign Up</button>


            </form>


        </div>
    )
}

export default Signup