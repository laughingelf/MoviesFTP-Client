import { MovieContext } from "../context/movie.context"
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"

const MovieCard = (movie) => {


    const { movieData } = useContext(MovieContext)
    const navigate = useNavigate()
    const { movieName } = useParams()
    console.log('bananna moosh', movie.Title)

    const addMovie = () => {
    }




    return (
        <div id="add-movie-card">
            <div id="movie-card-poster">
                <h4>{movie.Title}</h4>
                <img src={movie.Poster} />
            </div>
            <div id="movie-card-data">
                <p><span className="moviedata-details">Released Date: </span>{movie.Year}</p>
                <p><span className="moviedata-details">Rated: </span>{movie.Rated}</p>
                <p><span className="moviedata-details">Runtime: </span>{movie.Runtime}</p>
                <p><span className="moviedata-details">Genre: </span>{movie.Genre}</p>
                <p><span className="moviedata-details">Director: </span>{movie.Director}</p>
                <p><span className="moviedata-details">Main Actors: </span>{movie.Actors}</p>
                <p><span className="moviedata-details">Plot: </span>{movie.Plot}</p>
                <p><span className="moviedata-details">Awards: </span>{movie.Awards}</p>
                <p><span className="moviedata-details">IMDB Rating: </span>{movie.imdbRating}</p>
                <p><span className="moviedata-details">IMDB Votes: </span>{movie.imdbVotes}</p>
                <p><span className="moviedata-details">Box Office: </span>{movie.BoxOffice}</p>
                <button onClick={addMovie}>Add Movie</button>


            </div>


        </div>
    )
}

export default MovieCard