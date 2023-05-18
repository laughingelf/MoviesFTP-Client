import { useState, useEffect, useContext } from "react"
import { MovieContext } from "../context/movie.context"
import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const MovieDetails = () => {

    const { movieData } = useContext(MovieContext)
    const [movie, setMovie] = useState('')
    const { id } = useParams()

    useEffect(() => {
        movieData.map((mov) => {
            if (id === mov._id) {
                setMovie(mov)
            }
        })

    }, [])

    // const addMovie = () => {
    //     console.log(movie)
    // }

    return (
        <div id="add-movie-card">
            <div id="movie-card-poster">
                <h4>{movie.Title}</h4>
                <img src={movie.Poster} />
            </div>
            <div id="movie-card-data">
                <p><span className="moviedata-details">Released Date:</span>&nbsp;{movie.Year}</p>
                <p><span className="moviedata-details">Rated: </span>&nbsp;{movie.Rated}</p>
                <p><span className="moviedata-details">Runtime: </span>&nbsp;{movie.Runtime}</p>
                <p><span className="moviedata-details">Genre: </span>&nbsp;{movie.Genre}</p>
                <p><span className="moviedata-details">Director: </span>&nbsp;{movie.Director}</p>
                <p><span className="moviedata-details">Main Actors: </span>&nbsp;{movie.Actors}</p>
                <p><span className="moviedata-details">Plot: </span>&nbsp;{movie.Plot}</p>
                <p><span className="moviedata-details">Awards: </span>&nbsp;{movie.Awards}</p>
                <p><span className="moviedata-details">IMDB Rating: </span>&nbsp;{movie.imdbRating}</p>
                <p><span className="moviedata-details">IMDB Votes: </span>&nbsp;{movie.imdbVotes}</p>
                <p><span className="moviedata-details">Box Office: </span>&nbsp;{movie.BoxOffice}</p>
                <button >Add Rating</button>


            </div>


        </div>
    )
}

export default MovieDetails