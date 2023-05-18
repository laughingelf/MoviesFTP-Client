import { MovieContext } from "../context/movie.context"
import { useContext } from "react"
import { Link } from "react-router-dom"

const MoviesList = () => {

    const { movieData } = useContext(MovieContext)

    return (
        <div id="all-movie-cards">

            {movieData.map((movie) => {
                return (
                    <div key={movie._id} className="movie-card" >
                        <Link to={`/movies/movie-details/${movie._id}`}>
                            <img src={movie.Poster} alt='movie-poster' />
                            <h5>{movie.Title}</h5>
                        </Link>
                    </div>
                )
            })}

        </div>
    )
}

export default MoviesList