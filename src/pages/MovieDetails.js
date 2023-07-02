import { useState, useEffect, useContext } from "react"
import { MovieContext } from "../context/movie.context"
import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { baseUrl } from "../services/baseUrl"
import { AuthContext } from "../context/auth.context"
import axios from "axios"


const MovieDetails = () => {

    const { movieData, user, getMovies } = useContext(MovieContext)
    const { authenicateUser } = useContext(AuthContext)
    const [movie, setMovie] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [ratingId, setRatingId] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [updatedCommentData, setUpdatedCommentData] = useState()

    const [commentData, setCommentData] = useState({

        userComments: '',
        overallRating: '1',
        watchAgainRating: '1',
        trashCanRating: '1'
    })


    // console.log('MOVIE', movie.userRatings)

    const { id } = useParams()

    const handleRatingUpdateInfo = (e) => {
        setUpdatedCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        // console.log('the value', e.target.value)
    }

    const handleRatingUpdateSubmit = (e) => {
        e.preventDefault()
        setShowEditModal(false)
        console.log('updated comment data', updatedCommentData)
        axios.post(baseUrl + `/comment/update-comment/${ratingId}`, updatedCommentData)
            .then((updatedComment) => {
                console.log('updated COMMENT', updatedComment.data)
                setToggle(prev => !prev)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleRatingInfo = (e) => {
        setCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleRatingEdit = (e) => {
        setShowEditModal(true)
    }

    const openEditModal = (e, specRatingId) => {
        setShowEditModal(true)
        setRatingId(specRatingId)
    }

    const handleRatingDelete = (e) => {
        console.log('deleting')
        e.preventDefault()
        setShowEditModal(false)
        axios.get(baseUrl + `/comment/delete-comment/${ratingId}`)
            .then((deletedMovie) => {
                setToggle(prev => !prev)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleRatingSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)

        axios.post(baseUrl + `/comment/add-comment/${movie._id}`, { ...commentData, username: user._id, movieId: movie._id })
            .then((updatedMovie) => {
                console.log('Added Comment', updatedMovie.data)//need to do more not sure
                setToggle(prev => !prev)

            })
    }

    useEffect(() => {
        authenicateUser()
        movieData.map((mov) => {
            if (id === mov._id) {
                setMovie(mov)
            }
        })

    }, [movieData])

    useEffect(() => {
        getMovies()
    }, [toggle])

    // const addMovie = () => {
    // }

    return (
        <div className="min-h-screen flex flex-col">


            {

                movie ?

                    <div id="add-movie-card">
                        <div id="movie-card-poster">

                            {/* {console.log('this is the MOVIE', movie)} */}

                            <h4 className="m-8 text-xl font-bold">{movie.Title}</h4>
                            <img className="m-8 rounded-lg shadow-xl" src={movie.Poster} />
                        </div>

                        <div id="movie-card-and-comments">

                            <div id="movie-card-data">
                                <div className="moviedata-container my-4 mx-8">
                                    <p><span className="moviedata-details">Released Date:</span>&nbsp;{movie.Year}</p>
                                    <p><span className="moviedata-details">Rated:</span>&nbsp;{movie.Rated}</p>
                                    <p><span className="moviedata-details">Runtime:</span>&nbsp;{movie.Runtime}</p>
                                    <p><span className="moviedata-details">Genre:</span>&nbsp;{movie.Genre}</p>
                                    <p><span className="moviedata-details">Director:</span>&nbsp;{movie.Director}</p>
                                    <p><span className="moviedata-details">Main Actors:</span>&nbsp;{movie.Actors}</p>
                                    <p><span className="moviedata-details">Plot:</span>&nbsp;{movie.Plot}</p>
                                    <p><span className="moviedata-details">Awards:</span>&nbsp;{movie.Awards}</p>
                                    <p><span className="moviedata-details">IMDB Rating:</span>&nbsp;{movie.imdbRating}</p>
                                    <p><span className="moviedata-details">IMDB Votes:</span>&nbsp;{movie.imdbVotes}</p>
                                    <p><span className="moviedata-details">Box Office:</span>&nbsp;{movie.BoxOffice}</p>
                                </div>

                                {/* <p><span className="moviedata-details">User Ratings: </span>&nbsp;{movie.userRatings}</p> */}
                                <button
                                    className="bg-[#15B7B9] text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 mx-8 mb-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    id="silly-button"
                                    type="button" onClick={() => setShowModal(true)}
                                >
                                    Add Rating
                                </button>

                                {showModal ? (
                                    <>
                                        <div className="fixed inset-0 z-50 flex items-center justify-center mx-4">
                                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
                                                <div className="p-6 border rounded-lg">
                                                    <form id="rating-form" onSubmit={handleRatingSubmit}>
                                                        <div className="mb-4">
                                                            <label htmlFor="userComments" className="text-gray-700 font-medium">Comments:</label>
                                                            <input
                                                                type="textarea"
                                                                id="userComments"
                                                                name="userComments"
                                                                onChange={handleRatingInfo}
                                                                className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label htmlFor="overallRating" className="text-gray-700 font-medium">Overall Rating:</label>
                                                            <select
                                                                id="overallRating"
                                                                name="overallRating"
                                                                onChange={handleRatingInfo}
                                                                className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                required
                                                            >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-4">
                                                            <label htmlFor="watchAgainRating" className="text-gray-700 font-medium">Watch Again Rating:</label>
                                                            <select
                                                                id="firstwatchAgainRatingName"
                                                                name="watchAgainRating"
                                                                onChange={handleRatingInfo}
                                                                className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                required
                                                            >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-4">
                                                            <label htmlFor="trashCanRating" className="text-gray-700 font-medium">Trash Can Rating:</label>
                                                            <select
                                                                id="trashCanRating"
                                                                name="trashCanRating"
                                                                onChange={handleRatingInfo}
                                                                className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                required
                                                            >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex justify-end mt-6">
                                                            <button
                                                                className="bg-emerald-500 text-white font-bold uppercase text-sm px-4 py-2 rounded mr-2 hover:bg-emerald-600"
                                                                id="silly-button"
                                                                type="submit"
                                                            >
                                                                Add
                                                            </button>
                                                            <button
                                                                className="text-red-500 font-bold uppercase text-sm px-4 py-2 rounded hover:bg-red-100"
                                                                id="silly-button"
                                                                type="button"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                    </>
                                ) : null}

                                <div className="mx-2" id="comments">
                                    {movie.userRatings &&
                                        movie.userRatings.map((rating) => {
                                            return (
                                                <div className="comment-card max-w-sm mx-auto bg-white rounded-lg shadow-md p-6 my-6 border " key={rating._id}>
                                                    {rating.username.username ? (
                                                        <h1>
                                                            <span className="text-2xl font-bold mb-2 text-gray-800" id="profile-title">{rating.username.username}</span>
                                                        </h1>
                                                    ) : (
                                                        <h1>
                                                            <span className="text-2xl font-bold mb-2 text-gray-800" id="profile-title">user No longer Exists</span>
                                                        </h1>
                                                    )}
                                                    <div className="mb-4">
                                                        <label className="text-gray-700">
                                                            <span className="text-lg font-semibold mb-2 text-gray-800">Comments</span>
                                                            <p className="text-gray-600">{rating.userComments}</p>
                                                        </label>
                                                    </div>
                                                    <div className="mb-4 flex">
                                                        <label className="text-gray-700">
                                                            <span className="text-lg font-semibold mb-2 text-gray-800">Overall Rating:</span>
                                                            <p className="text-gray-600">{rating.overallRating}</p>
                                                        </label>
                                                        <label className="text-gray-700">
                                                            <span className="text-lg font-semibold mb-2 text-gray-800">Watch Again Rating:</span>
                                                            <p className="text-gray-600">{rating.watchAgainRating}</p>
                                                        </label>
                                                        <label className="text-gray-700">
                                                            <span className="text-lg font-semibold mb-2 text-gray-800">Trash Can Rating:</span>
                                                            <p className="text-gray-600">{rating.trashCanRating}</p>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        {rating.username._id === user._id ? (
                                                            <div className="rating-buttons">
                                                                <button onClick={(e) => openEditModal(e, rating._id)}>Edit</button>
                                                                {showEditModal ? (
                                                                    <>
                                                                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                                                {/* Modal content */}
                                                                                <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                                                                                    {/* Modal header */}
                                                                                    {/* Modal body */}
                                                                                    <form id="rating-form">
                                                                                        <div className="mb-6">
                                                                                            <label htmlFor="userComments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Comments:</label>
                                                                                            <input
                                                                                                type="textarea"
                                                                                                id="userComments"
                                                                                                name="userComments"
                                                                                                onChange={handleRatingUpdateInfo}
                                                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                                                required
                                                                                            />
                                                                                        </div>
                                                                                        <div className="mb-6">
                                                                                            <label htmlFor="overallRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Overall Rating:</label>
                                                                                            <select
                                                                                                id="overallRating"
                                                                                                name="overallRating"
                                                                                                onChange={handleRatingUpdateInfo}
                                                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                                                required
                                                                                            >
                                                                                                <option value="1">1</option>
                                                                                                <option value="2">2</option>
                                                                                                <option value="3">3</option>
                                                                                                <option value="4">4</option>
                                                                                                <option value="5">5</option>
                                                                                                <option value="6">6</option>
                                                                                                <option value="7">7</option>
                                                                                                <option value="8">8</option>
                                                                                                <option value="9">9</option>
                                                                                                <option value="10">10</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="mb-6">
                                                                                            <label htmlFor="watchAgainRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Watch Again Rating:</label>
                                                                                            <select
                                                                                                id="firstwatchAgainRatingName"
                                                                                                name="watchAgainRating"
                                                                                                onChange={handleRatingUpdateInfo}
                                                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                                                required
                                                                                            >
                                                                                                <option value="1">1</option>
                                                                                                <option value="2">2</option>
                                                                                                <option value="3">3</option>
                                                                                                <option value="4">4</option>
                                                                                                <option value="5">5</option>
                                                                                                <option value="6">6</option>
                                                                                                <option value="7">7</option>
                                                                                                <option value="8">8</option>
                                                                                                <option value="9">9</option>
                                                                                                <option value="10">10</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="mb-6">
                                                                                            <label htmlFor="trashCanRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Trash Can Rating:</label>
                                                                                            <select
                                                                                                id="trashCanRating"
                                                                                                name="trashCanRating"
                                                                                                onChange={handleRatingUpdateInfo}
                                                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                                                required
                                                                                            >
                                                                                                <option value="1">1</option>
                                                                                                <option value="2">2</option>
                                                                                                <option value="3">3</option>
                                                                                                <option value="4">4</option>
                                                                                                <option value="5">5</option>
                                                                                                <option value="6">6</option>
                                                                                                <option value="7">7</option>
                                                                                                <option value="8">8</option>
                                                                                                <option value="9">9</option>
                                                                                                <option value="10">10</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="flex justify-end">
                                                                                            <button
                                                                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                                id="silly-button"
                                                                                                type="button"
                                                                                                onClick={(e) => handleRatingUpdateSubmit(e, rating._id)}
                                                                                            >
                                                                                                Save
                                                                                            </button>
                                                                                            <button
                                                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                                id="silly-button"
                                                                                                type="button"
                                                                                                onClick={setShowEditModal(false)}
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                                                    </>
                                                                ) : null}
                                                                <button onClick={() => handleRatingDelete(rating._id)}>Delete</button>
                                                            </div>
                                                        ) : null}
                                                    </div>



                                                </div>

                                            )

                                        })}



                                    {!movie.userRatings &&
                                        <p>no rating</p>}


                                </div>


                            </div>


                        </div>

                    </div>

                    :
                    <p>Loading...</p>
            }



        </div>
    )
}

export default MovieDetails