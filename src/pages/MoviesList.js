import { MovieContext } from "../context/movie.context"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

const MoviesList = () => {

    const { movieData, getMovies } = useContext(MovieContext)


    useEffect(() => {
        if (!movieData.length) {
            getMovies()
        }

    }, [])

    return (
        <div id="all-movie-cards" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movieData.map((movie) => {
                return (
                    <div key={movie._id} className="movie-card bg-white rounded-lg shadow-md overflow-hidden">
                        <Link to={`/movies/movie-details/${movie._id}`} className="flex flex-col items-center justify-center h-full text-center">
                            <img src={movie.Poster} alt="movie-poster" className="w-auto h-60 object-cover rounded-md" />
                            <h5 className="text-lg font-semibold mt-2">{movie.Title}</h5>
                        </Link>
                    </div>
                )
            })}
        </div>

    )
}

export default MoviesList