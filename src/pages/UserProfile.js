import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MovieContext } from "../context/movie.context"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../services/baseUrl"
import axios from "axios"

import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";

initTE({ Modal, Ripple });


const UserProfile = () => {

    const { user } = useContext(MovieContext)

    const { setUser } = useContext(MovieContext)

    const [imgUrl, setImgUrl] = useState('')
    const [profileInfo, setProfileInfo] = useState(user)
    const [showModal, setShowModal] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/auth/login')
        }
    }, [])


    const handlePhotoChange = (e) => {
        setImgUrl((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleProfileChange = (e) => {
        setProfileInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlePhotoUpdate = (e) => {
        e.preventDefault()
        console.log('hitting the post')
        axios.post(baseUrl + `/users/update-photo/${user._id}`, imgUrl)
            .then((updatedUser) => {
                setUser(updatedUser) //need some help
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        axios.post(baseUrl + `/update-user/${user._id}`, profileInfo)
            .then((updatedUser) => {
                console.log(updatedUser.data) //need some help
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






    return (



        <div id="profile-page">


            <h3><span id="user-info">Profile</span></h3>

            <div id="profile-card">

                <div id="profile-img">
                    {user.profilePicUrl &&
                        <div id="img-card">
                            <img id="prof-img" src={user.profilePicUrl} alt='profile' />
                            <form id="update-photo-form" onSubmit={handlePhotoUpdate} method="post" encType="multipart/form-data">
                                <input type="file" name="imageUrl" id="imageUrl" onChange={handlePhotoChange} />
                                <button type="submit"
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                    Update Photo
                                </button>
                            </form>

                        </div>
                    }

                    {!user.profilePicUrl &&

                        <div id="img-card">
                            <img id="prof-img" src="/img/profile-default.jpg" alt="default-profile" />
                            <form id="update-photo-form" onSubmit={handlePhotoUpdate} method="post" encType="multipart/form-data">
                                <input
                                    type="file" name="imageUrl" id="imageUrl" onChange={handlePhotoChange} />
                                <button type="submit"
                                    className="text-white active:bg-pink-600 font-bold uppercase text-sm px-15 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    id="silly-button">
                                    Update Photo
                                </button>
                            </form>
                        </div>
                    }

                </div>

                <div id="profile-data">

                    <h3><span id="user-info">Username:</span>&nbsp;{profileInfo.username}</h3>
                    <h3><span id="user-info">Email:</span>&nbsp;{profileInfo.email}</h3>
                    <h3><span id="user-info">Name:</span>&nbsp; {profileInfo.firstName}</h3> <h3>{user.lastName}</h3>
                    <h4><span id="user-info">Birthdate:</span>&nbsp; {profileInfo.birthDate}</h4>

                    <br />
                    <br />
                    <button
                        className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        id="silly-button"
                        type="button" onClick={() => setShowModal(true)}
                    >
                        Edit Profile
                    </button>
                    <br />
                    <button
                        className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        id="silly-button"
                        type="button">
                        Delete Profile
                    </button>
                    <br />
                    <br />

                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                            {/* className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t" */}
                                            <h3 className="text-3xl font-semibold">
                                                Update Profile
                                            </h3>

                                        </div>
                                        {/*body*/}

                                        <form id="update-form" onSubmit={fakeSubmit}>
                                            <div className="mb-6">
                                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Username:
                                                    <input type="text" id="username" name="username" value={user.username} onChange={handleProfileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                                                </label>
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email:
                                                    <input type="email" id="email" name="email" value={user.email} onChange={handleProfileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                                                </label>
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">First Name:
                                                    <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleProfileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                                                </label>
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Last Name:
                                                    <input type="text" id="lastname" name="lastname" value={user.lastName} onChange={handleProfileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                                                </label>
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="birthDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Birthdate:
                                                    <input type="date" id="birthDate" name="birthDate" value={user.birthDate} onChange={handleProfileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                                                </label>
                                            </div>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                id="silly-button"
                                                type="submit"
                                            // onClick={() => setShowModal(false)}

                                            >
                                                Save Changes
                                            </button>
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


            </div>






        </div >

    )
}

export default UserProfile