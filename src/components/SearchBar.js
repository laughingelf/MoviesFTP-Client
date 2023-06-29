import { useState, useContext } from "react"
import { Link, Navigate, NavigationType, useNavigate } from 'react-router-dom'
import { baseUrl } from "../services/baseUrl"
import { AuthContext } from "../context/auth.context"
import { movieSearch } from "../services/searchService"
import axios from 'axios'

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const { authenicateUser } = useContext(AuthContext)


    const handleSearch = (e) => setSearch(e.target.value);

    const handleSearchSubmit = (e) => {
        authenicateUser()
        e.preventDefault()
        navigate(`/movies/add-movie/${search}`)


        // const requestBody = { search }
        // console.log('FOUND THIS', requestBody)
        // console.log('this is searc', search)

    }


    return (
        <div id="search-bar" className="flex items-center mt-1 mb-1">
            <form className="flex" onSubmit={handleSearchSubmit}>
                <input className="rounded-md form-input mr-2 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15B7B9]" type="search" placeholder="Search" aria-label="Search" name="t" onChange={handleSearch} required />
                <button className="bg-[#15B7B9] hover:bg-gray-500 text-white px-4 py-2 rounded-md" type="submit">Search</button>
            </form>
        </div>

    )
}

export default SearchBar