import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
    const navigate = useNavigate()

    return (

        navigate('/movies/all-movies')
    )
}

export default Homepage