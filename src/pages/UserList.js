import axios from "axios"
import { useState, useEffect } from "react"
import { baseUrl } from "../services/baseUrl"

const UserList = () => {

    const [users, setUsers] = useState('')
    console.log('boom boom')
    useEffect(() => {
        axios.get(baseUrl + '/users/all-users')
            .then((res) => {
                console.log('this is the results', res.data)
                setUsers(res.data)
            })
    }, [])


    // console.log('USERS DTA', users)

    return (
        <div>UserList
            {users.map((user) => {
                return (
                    <div>
                        <h3>Email: {user.email}</h3>
                        <h3>Username: {user.username}</h3>
                    </div>
                )
            })}

        </div>
    )
}

export default UserList