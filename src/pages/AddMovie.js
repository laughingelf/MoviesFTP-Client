import { useParams, useNavigate } from "react-router-dom"
import { movieSearch } from "../services/searchService"
import { useState, useEffect, useContext } from "react"
// import { MovieContext } from "../context/movie.context"
import MovieCard from "../components/MovieCard"
import { MovieContext } from "../context/movie.context"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"



const AddMovie = () => {
    const { movieData, setMovieData } = useContext(MovieContext)
    const [movie, setMovie] = useState()
    const navigate = useNavigate()
    const { movieName } = useParams()

    const { authenicateUser } = useContext(AuthContext)

    const apiKey = '207ef136'

    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`


    useEffect(() => {
        const titleOptions = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: {
                s: movieName,
                r: 'json',
            },
            headers: {
                'X-RapidAPI-Key': '39af2f4383msha9a56f3ac4a9f8ep12c99ajsn19417c0ac7dd',
                'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
            }
        };

        axios.request(titleOptions)
            .then((foundMovie) => {
                if (foundMovie) {
                    const movId = foundMovie.data.Search[0].imdbID

                    const idOptions = {
                        method: 'GET',
                        url: 'https://movie-database-alternative.p.rapidapi.com/',
                        params: {
                            r: 'json',
                            i: movId
                        },
                        headers: {
                            'X-RapidAPI-Key': '39af2f4383msha9a56f3ac4a9f8ep12c99ajsn19417c0ac7dd',
                            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
                        }
                    };

                    axios.request(idOptions)
                        .then((foundMovieData) => {
                            console.log(movie)
                            setMovie(foundMovieData.data)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })


    }, [movieName])

    const handleAddMovie = () => {

        // console.log('this is the movie we are adding', movie)
        axios.post(baseUrl + '/movies/add-movie', movie)
            .then((newMovie) => {
                // console.log('this the created movie', newMovie.data)
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

    }








    return (
        <div className="min-h-screen flex flex-col items-center">
            <button id="add-movie-btn" onClick={handleAddMovie} className="px-4 py-2 bg-[#15B7B9] text-white rounded-lg shadow-md">
                Add Movie
            </button>

            {movie ? (
                <div id="add-movie-card" className="mt-8 bg-white rounded-lg shadow-md">
                    <div id="movie-card-poster" className="p-6">
                        <h4 className="text-xl font-semibold mb-4">{movie.Title}</h4>
                        <img src={movie.Poster} alt="movie-poster" className="w-auto h-100 rounded-md" />
                    </div>

                    <div id="movie-card-and-comments" className="p-6">
                        <div id="movie-card-data" className="grid grid-cols-2 gap-4 border rounded-lg p-4 bg-gray-200 shadow-xl bg-opacity-30">
                            <p className="text-sm">
                                <span className="moviedata-details underline">Released Date:</span>&nbsp;{movie.Year}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Rated:</span>&nbsp;{movie.Rated}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Runtime:</span>&nbsp;{movie.Runtime}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Genre:</span>&nbsp;{movie.Genre}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Director:</span>&nbsp;{movie.Director}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Main Actors:</span>&nbsp;{movie.Actors}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Plot:</span>&nbsp;{movie.Plot}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Awards:</span>&nbsp;{movie.Awards}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">IMDB Rating:</span>&nbsp;{movie.imdbRating}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">IMDB Votes:</span>&nbsp;{movie.imdbVotes}
                            </p>
                            <p className="text-sm">
                                <span className="moviedata-details underline">Box Office:</span>&nbsp;{movie.BoxOffice}
                            </p>
                        </div>

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    )

}

export default AddMovie


