import { useParams, useNavigate } from "react-router-dom"
import { movieSearch } from "../services/searchService"
import { useState, useEffect, useContext } from "react"
// import { MovieContext } from "../context/movie.context"
import MovieCard from "../components/MovieCard"
import { MovieContext } from "../context/movie.context"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"



const AddMovie = () => {
    const { movieData, setMovieData } = useContext(MovieContext)
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

        console.log('this is the movie we are adding', movie)
        axios.post(baseUrl + '/movies/add-movie', movie)
            .then((newMovie) => {
                console.log('this the created movie', newMovie.data)
                if (newMovie.data.message) {
                    navigate(`/movies/movie-details/${newMovie.data.f_id}`)

                } else {
                    setMovieData([...movieData, newMovie.data])
                    navigate(`/movies/all-movies`)
                }
            })
            .catch((err) => {
                console.log(err)
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
                    <p><span className="moviedata-details">Released Date: </span>&nbsp;{movie.Year}</p>
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



                </div>


            </div>

        </div>
    )
}

export default AddMovie