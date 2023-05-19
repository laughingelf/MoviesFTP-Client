import { useEffect, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { MovieContext } from "./movie.context"
import { get } from "../services/authService"


const AuthContext = createContext()

function AuthContextProvider({ children }) {

    const { setIsLoading, setUser } = useContext(MovieContext)

    const navigate = useNavigate()

    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const removeToken = () => {
        localStorage.removeItem("authToken")
    }

    const authenicateUser = () => {
        const storedToken = localStorage.getItem('authToken')



        // console.log('this is STORED TOKEN', storedToken)

        if (storedToken) {
            get('/auth/verify')
                .then((res) => {
                    const user = res.data
                    console.log('this is the user response', user)

                    setIsLoading(false)
                    setUser(user)
                })
                .catch((err) => {
                    console.log(err)

                    setIsLoading(false)
                    setUser(null)
                    removeToken()
                })
        } else {
            setIsLoading(false)
            setUser(null)
        }
    }

    const logOutUser = () => {
        removeToken()
        authenicateUser()
        navigate('/')
    }

    useEffect(() => {
        authenicateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ storeToken, authenicateUser, logOutUser }} >
            {children}
        </AuthContext.Provider>

    )
}

export { AuthContext, AuthContextProvider }