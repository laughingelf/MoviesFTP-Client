import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MovieContext } from "../context/movie.context"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../services/baseUrl"
import axios from "axios"
import { fileChange } from "../services/fileChange"

import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";

initTE({ Modal, Ripple });


const UserProfile = () => {

    const { logOutUser } = useContext(AuthContext)

    const { user, setUser } = useContext(MovieContext)

    const [imgUrl, setImgUrl] = useState('')
    const [profileInfo, setProfileInfo] = useState(null)
    const [usersRatings, setUsersRatings] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [ratingId, setRatingId] = useState(null)
    const [updatedCommentData, setUpdatedCommentData] = useState()
    const [toggle, setToggle] = useState(false)



    const navigate = useNavigate()


    const openEditModal = (e, specRatingId) => {
        setShowEditModal(true)
        setRatingId(specRatingId)
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

    const handleRatingUpdateInfo = (e) => {
        setUpdatedCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        // console.log('the value', e.target.value)
    }

    const handleProfileChange = (e) => {
        setProfileInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlePhotoChange = (e) => {
        setImgUrl((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleBackendPhotoChange = (e, imgInfo) => {
        e.preventDefault()
        console.log('here is the info', imgInfo)
        axios.post(baseUrl + `/users/update-photo/${user._id}`, { imageUrl: imgInfo.imageUrl })
            .then((updatedUser) => {
                setUser(updatedUser.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handlePhotoUpdate = (e) => {
        // setButtonDisabled(true)

        fileChange(e)
            .then((response) => {
                console.log(response.data);
                setImgUrl((prev) => ({ ...prev, [e.target.name]: response.data.image }));
                // setButtonDisabled(false);
            })
            .catch((err) => {
                // setButtonDisabled(false);
                console.log("Error while uploading the file: ", err);
            });
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        setShowModal(false)
        axios.post(baseUrl + `/users/update-user/${user._id}`, profileInfo)
            .then((updatedUser) => {
                console.log(updatedUser.data) //need some help
                setUser(updatedUser.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const deleteProfile = (e) => {
        axios.get(baseUrl + `/users/delete-user/${user._id}`)
            .then((deletedUser) => {
                logOutUser()
                navigate('/movies/all-movies')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getUserRatings = () => {
        axios.get(baseUrl + `/users/user-posts/${user._id}`)
            .then((ratings) => {
                // console.log('this are the RATINGS', ratings)
                setUsersRatings(ratings.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const fakeSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
        console.log('this is hte profile info: ', profileInfo)
    }


    useEffect(() => {
        setProfileInfo(user)
        if (user) {
            getUserRatings()
        }
        // console.log('banana', user.profilePicUrl)
    }, [user])

    useEffect(() => {
        getUserRatings()
    }, [toggle])



    return (

        <div>
            {user ?

                <div className="min-h-screen flex flex-col">



                    <div id="profile-page">


                        <h3><span className="m-8 text-xl font-bold" id="user-info">Profile</span></h3>

                        <div className="mx-2 mt-4" id="profile-card">

                            <div id="profile-img">
                                {user.profilePicUrl && (
                                    <div id="img-card" className="bg-gray-100 rounded-lg shadow-md p-4">
                                        <img className="rounded-lg shadow-xl" id="prof-img" src={user.profilePicUrl} alt="profile" />
                                        <form
                                            id="update-photo-form"
                                            onSubmit={(e) => handleBackendPhotoChange(e, imgUrl)}
                                            className="mt-4"
                                        >
                                            <input
                                                type="file"
                                                name="imageUrl"
                                                id="imageUrl"
                                                onChange={handlePhotoUpdate}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="imageUrl"
                                                className="inline-block bg-primary text-white font-medium rounded px-6 py-2 text-xs uppercase shadow-md transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                                            >
                                                Update Photo
                                            </label>
                                        </form>
                                    </div>
                                )}

                                {!user.profilePicUrl && (
                                    <div id="img-card" className="bg-gray-100 rounded-lg shadow-md p-4">
                                        <img className="rounded-lg shadow-xl" id="prof-img" src="/img/profile-default.jpg" alt="default-profile" />
                                        <form
                                            id="update-photo-form"
                                            onSubmit={(e) => handleBackendPhotoChange(e, imgUrl)}
                                            className="mt-4"
                                        >
                                            <input
                                                type="file"
                                                name="imageUrl"
                                                id="imageUrl"
                                                onChange={handlePhotoUpdate}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="imageUrl"
                                                className="inline-block bg-primary text-white font-medium rounded px-6 py-2 text-xs uppercase shadow-md transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                                            >
                                                Update Photo
                                            </label>
                                        </form>
                                    </div>
                                )}
                            </div>


                            <div id="profile-data" className="bg-gray-100 rounded-lg shadow-md p-4 my-4">
                                <h3 className="mb-4">
                                    <span className="user-info">Username:</span>&nbsp;{user.username}
                                </h3>
                                <h3 className="mb-4">
                                    <span className="user-info">Email:</span>&nbsp;{user.email}
                                </h3>
                                <h3 className="mb-4">
                                    <span className="user-info">Name:</span>&nbsp;{user.firstName} {user.lastName}
                                </h3>
                                {user.birthDate ? (
                                    <h4 className="mb-4">
                                        <span className="user-info">Birthdate:</span>&nbsp;{user.birthDate.slice(0, 10)}
                                    </h4>
                                ) : (
                                    <h4 className="mb-4">
                                        <span className="user-info">Birthdate:</span>&nbsp;{user.birthDate}
                                    </h4>
                                )}

                                <button
                                    className="inline-block bg-primary text-white font-medium rounded mx-2 px-6 py-2 text-xs uppercase shadow-md transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                                    id="silly-button"
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                >
                                    Edit Profile
                                </button>

                                <button
                                    className="inline-block bg-primary text-white font-medium rounded mx-2 px-6 py-2 text-xs uppercase shadow-md transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                                    id="silly-button"
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Delete Profile
                                </button>
                                <br />
                                <br />



                                {showModal ? (
                                    <>
                                        <div class="fixed inset-0 z-50 flex items-center justify-center m">
                                            <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
                                                <div class="p-6 border rounded-lg">
                                                    <div class="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3 class="text-3xl font-semibold">
                                                            Update Profile
                                                        </h3>
                                                    </div>
                                                    {
                                                        profileInfo ?
                                                            <form id="update-form" onSubmit={handleProfileUpdate}>
                                                                <div class="mb-4">
                                                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Username:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="username"
                                                                        name="username"
                                                                        value={profileInfo.username}
                                                                        onChange={handleProfileChange}
                                                                        class="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div class="mb-6">
                                                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email:</label>
                                                                    <input
                                                                        type="email"
                                                                        id="email"
                                                                        name="email"
                                                                        value={profileInfo.email}
                                                                        onChange={handleProfileChange}
                                                                        class="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div class="mb-6">
                                                                    <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">First Name:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="firstName"
                                                                        name="firstName"
                                                                        value={profileInfo.firstName}
                                                                        onChange={handleProfileChange}
                                                                        class="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div class="mb-6">
                                                                    <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Last Name:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="lastName"
                                                                        name="lastName"
                                                                        value={profileInfo.lastName}
                                                                        onChange={handleProfileChange}
                                                                        class="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div class="mb-6">
                                                                    <label for="birthDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Birthdate:</label>
                                                                    <input
                                                                        type="date"
                                                                        id="birthDate"
                                                                        name="birthDate"
                                                                        value={profileInfo.birthDate}
                                                                        onChange={handleProfileChange}
                                                                        class="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                    />
                                                                </div>
                                                                <button
                                                                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    id="silly-button"
                                                                    type="submit"
                                                                >
                                                                    Save Changes
                                                                </button>
                                                                <button
                                                                    class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    id="silly-button"
                                                                    type="button"
                                                                    onClick={() => setShowModal(false)}
                                                                >
                                                                    Close
                                                                </button>
                                                            </form>
                                                            :
                                                            <p>No User Info.....Yet</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}



                                {showDeleteModal ? (
                                    <>
                                        <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div class="relative w-auto my-6 mx-auto max-w-3xl">
                                                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <div class="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3 class="text-3xl font-semibold">
                                                            Delete Profile
                                                        </h3>
                                                    </div>
                                                    <div id="delete-modal" class="p-6">
                                                        <button
                                                            class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            id="silly-button"
                                                            type="submit"
                                                            onClick={() => deleteProfile()}
                                                        >
                                                            Yes - Delete
                                                        </button>
                                                        <button
                                                            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            id="silly-button"
                                                            type="button"
                                                            onClick={() => setShowDeleteModal(false)}
                                                        >
                                                            Nevermind
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}

                            </div>


                        </div>






                    </div >
                    <div id="ratings-page">

                        {usersRatings ?

                            usersRatings.map((rating) => {
                                return (

                                    <div className="rating-card" key={rating._id}>

                                        <div >

                                            <h6><span id="user-info">Comments</span></h6>
                                            <p>{rating.userComments}</p>
                                            <h6><span id="user-info">Overall Rating</span></h6>
                                            <p>{rating.overallRating}</p>
                                            <h6><span id="user-info">Watch Again Rating</span></h6>
                                            <p>{rating.watchAgainRating}</p>
                                            <h6><span id="user-info">Trash Can Rating</span></h6>
                                            <p>{rating.trashCanRating}</p>

                                        </div>

                                        <div className="rating-buttons">
                                            <button
                                                className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                id="silly-button"
                                                type="button"
                                                onClick={(e) => openEditModal(e, rating._id)}
                                            >
                                                Edit Rating
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
                                                                        onClick={handleRatingUpdateSubmit}>
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        id="silly-button"
                                                                        type="button"
                                                                        onClick={handleRatingDelete}
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

                                    </div>
                                )
                            })

                            :
                            <p>No Ratings Yet</p>

                        }

                    </div>
                </div>
                :
                <p>Loading...</p>
            }

        </div >


    )
}

export default UserProfile