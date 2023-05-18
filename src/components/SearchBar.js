import { useState } from "react"
import { Link, Navigate, NavigationType, useNavigate } from 'react-router-dom'
import { baseUrl } from "../services/baseUrl"
import { movieSearch } from "../services/searchService"
import axios from 'axios'

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSearch = (e) => setSearch(e.target.value);

    const handleSearchSubmit = (e) => {
        e.preventDefault()

        navigate(`/movies/add-movie/${search}`)


        // const requestBody = { search }
        // console.log('FOUND THIS', requestBody)
        // console.log('this is searc', search)

    }


    return (
        <div id="search-bar">
            <form className="form-inline" onSubmit={handleSearchSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="t" onChange={handleSearch} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar