import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MovieContext } from "../context/movie.context"
import { useNavigate } from "react-router-dom"




const UserProfile = () => {

    const { user } = useContext(MovieContext)


    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/auth/login')
        }
    }, [])







    return (



        <div id="profile-page">
            <h3><span id="user-info">Profile</span></h3>

            <div id="profile-card">

                <div id="profile-img">
                    {user.profilePicUrl &&
                        <div id="img-card">
                            <img id="prof-img" src={user.profilePicUrl} alt='profile' />
                            <label>Update Photo: &nbsp;
                                <input type="file" name="imageUrl" id="imageUrl" />
                            </label>
                        </div>
                    }

                    {!user.profilePicUrl &&

                        <div id="img-card">
                            <img id="prof-img" src="/img/profile-default.jpg" alt="default-profile" />
                            <label>Update Photo:</label>
                            <input type="file" name="imageUrl" id="imageUrl" />
                        </div>
                    }

                </div>

                <div id="profile-data">

                    <h3><span id="user-info">Username:</span>&nbsp;{user.username}</h3>
                    <h3><span id="user-info">Email:</span>&nbsp;{user.email}</h3>
                    <h3><span id="user-info">Name:</span>&nbsp; {user.firstName}</h3> <h3>{user.lastName}</h3>
                    <h4><span id="user-info">Birthdate:</span>&nbsp; {user.birthDate}</h4>


                </div>


            </div>


        </div >
    )
}

export default UserProfile