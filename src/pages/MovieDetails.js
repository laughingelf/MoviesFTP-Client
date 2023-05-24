import { useState, useEffect, useContext } from "react"
import { MovieContext } from "../context/movie.context"
import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { baseUrl } from "../services/baseUrl"
import axios from "axios"


const MovieDetails = () => {

    const { movieData, user } = useContext(MovieContext)
    const [movie, setMovie] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [updatedCommentData, setUpdatedCommentData] = useState()

    const [commentData, setCommentData] = useState({

        userComments: '',
        overallRating: '1',
        watchAgainRating: '1',
        trashCanRating: '1'
    })

    // console.log('MOVIE', movie.userRatings)

    const { id } = useParams()
    let modalHeader

    const handleRatingUpdateInfo = (e) => {
        setUpdatedCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        // console.log('the value', e.target.value)
    }

    const handleRatingUpdateSubmit = (e, ratingId) => {
        e.preventDefault()
        setShowEditModal(false)
        console.log('updated comment data', updatedCommentData)
        axios.post(baseUrl + `/comment/update-comment/${ratingId}`, updatedCommentData)
            .then((updatedComment) => {
                console.log('updated COMMENT', updatedComment.data)
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

    const handleRatingDelete = (e) => {
        console.log('deleting')
    }

    const handleRatingSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
        console.log('Rating Data', user._id)

        axios.post(baseUrl + `/comment/add-comment/${movie._id}`, { ...commentData, username: user._id })
            .then((updatedMovie) => {
                console.log('Updated Movie', updatedMovie.data)//need to do more not sure

            })
    }

    useEffect(() => {
        movieData.map((mov) => {
            if (id === mov._id) {
                setMovie(mov)
            }
        })

    }, [movieData])

    // const addMovie = () => {
    // }

    return (
        <div>


            {

                movie ?

                    <div id="add-movie-card">
                        <div id="movie-card-poster">

                            {/* {console.log('this is the MOVIE', movie)} */}

                            <h4>{movie.Title}</h4>
                            <img src={movie.Poster} />
                        </div>

                        <div id="movie-card-and-comments">

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


                                {/* <p><span className="moviedata-details">User Ratings: </span>&nbsp;{movie.userRatings}</p> */}
                                <button
                                    className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    id="silly-button"
                                    type="button" onClick={() => setShowModal(true)}
                                >
                                    Add Rating
                                </button>

                                {showModal ? (
                                    <>
                                        <div
                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                        >
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}

                                                    {/*body*/}

                                                    <form id="rating-form" onSubmit={handleRatingSubmit} >
                                                        <div className="mb-6">
                                                            <label htmlFor="userComments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Comments:
                                                                <input type="textarea" id="userComments" name="userComments" onChange={handleRatingInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                                            </label>
                                                        </div>
                                                        <div className="mb-6">
                                                            <label htmlFor="overallRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Overall Rating:
                                                                <select id="overallRating" name="overallRating" onChange={handleRatingInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                                                            </label>
                                                        </div>
                                                        <div className="mb-6">
                                                            <label htmlFor="watchAgainRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Watch Again Rating:
                                                                <select id="firstwatchAgainRatingName" name="watchAgainRating" onChange={handleRatingInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
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
                                                            </label>
                                                        </div>
                                                        <div className="mb-6">
                                                            <label htmlFor="trashCanRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Trash Can Rating:
                                                                <select id="trashCanRating" name="trashCanRating" onChange={handleRatingInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                                                            </label>
                                                        </div>
                                                        <button
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            id="silly-button"
                                                            type="submit">
                                                            Add
                                                        </button>
                                                        <br />
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            id="silly-button"
                                                            type="button"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            Close
                                                        </button>

                                                    </form>

                                                    {/*footer*/}
                                                    {/* <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                        </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}


                            </div>

                            <div id="comments">


                                {movie.userRatings &&

                                    movie.userRatings.map((rating) => {
                                        console.log('this is the rating', rating._id)
                                        return (
                                            <div className="comment-card">
                                                {rating.username.username ?
                                                    <h1><span id="profile-title">{rating.username.username}</span></h1>
                                                    :
                                                    <h1><span id="profile-title">user No longer Exists</span></h1>
                                                }
                                                <div id="comment">
                                                    <label><span id="comment-title">Comments</span>
                                                        <p>{rating.userComments}</p>
                                                    </label>
                                                </div>
                                                <div id="ratings">
                                                    <label><span className="rating-label">Overall Rating:</span></label>
                                                    <p>{rating.overallRating}</p>
                                                    <label><span className="rating-label">Watch Again Rating:</span></label>
                                                    <p>{rating.watchAgainRating}</p>
                                                    <label><span className="rating-label">Trash Can Rating:</span></label>
                                                    <p>{rating.trashCanRating}</p>


                                                </div>

                                                <div>
                                                    {rating.username._id === user._id ?
                                                        <div className="rating-buttons">
                                                            <button
                                                                onClick={() => setShowEditModal(true)}>
                                                                Edit
                                                            </button>

                                                            {showEditModal ?


                                                                <>
                                                                    <div
                                                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                                    >
                                                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                                            {/*content*/}
                                                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                                                {/*header*/}

                                                                                {/*body*/}

                                                                                <form id="rating-form"  >
                                                                                    <div className="mb-6">
                                                                                        <label htmlFor="userComments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Comments:
                                                                                            <input type="textarea" id="userComments" name="userComments" onChange={handleRatingUpdateInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="mb-6">
                                                                                        <label htmlFor="overallRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Overall Rating:
                                                                                            <select id="overallRating" name="overallRating" onChange={handleRatingUpdateInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="mb-6">
                                                                                        <label htmlFor="watchAgainRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Watch Again Rating:
                                                                                            <select id="firstwatchAgainRatingName" name="watchAgainRating" onChange={handleRatingUpdateInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
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
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="mb-6">
                                                                                        <label htmlFor="trashCanRating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Trash Can Rating:
                                                                                            <select id="trashCanRating" name="trashCanRating" onChange={handleRatingUpdateInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                                                                                        </label>
                                                                                    </div>
                                                                                    <button
                                                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                        id="silly-button"
                                                                                        type="submit"
                                                                                        onClick={(e) => handleRatingUpdateSubmit(e, rating._id)}>
                                                                                        Edit
                                                                                    </button>
                                                                                    <button
                                                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                        id="silly-button"
                                                                                        type="button"
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                        id="silly-button"
                                                                                        type="button"
                                                                                        onClick={() => setShowEditModal(false)}
                                                                                    >
                                                                                        Close
                                                                                    </button>

                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                                </>

                                                                :
                                                                null
                                                            }

                                                        </div>
                                                        :
                                                        null
                                                    }

                                                </div>



                                            </div>

                                        )

                                    })}



                                {!movie.userRatings &&
                                    <p>no rating</p>}


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