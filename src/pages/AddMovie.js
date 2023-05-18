import { useParams, useNavigate } from "react-router-dom"
import { movieSearch } from "../services/searchService"
import { useState, useEffect, useContext } from "react"
// import { MovieContext } from "../context/movie.context"
import MovieCard from "../components/MovieCard"
import { MovieContext } from "../context/movie.context"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"



const AddMovie = () => {
    const { movieData } = useContext(MovieContext)
    const [movie, setMovie] = useState('')
    const navigate = useNavigate()
    const { movieName } = useParams()

    useEffect(() => {
        movieSearch(movieName)
            .then((res) => {
                setMovie(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log('got you ', movieData)

    }, [movieName])

    const handleAddMovie = () => {
        axios.post(baseUrl + '/movies/add-movie', movie)
            .then((newMovie) => {
                navigate(`/movies/all-movies`)
            })

        // movieData.map((mov) => {
        //     if (movie.Title === mov.Title) {
        //         console.log('it exist')
        // navigate(`/movies/movie-details/${mov._id}`)
        // }
        // if (movie.Title !== mov.Title) {
        //     console.log('it does not exist')
        // axios.post(baseUrl + '/movies/add-movie', movie)
        //     .then((newMovie) => {
        //         navigate(`/movies/all-movies`)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }








    return (
        <div>
            <button onClick={handleAddMovie} >Add Movie</button>
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



                </div>


            </div>

        </div>
    )
}

export default AddMovie