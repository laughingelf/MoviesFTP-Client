import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const MovieContext = createContext()

function MovieContextProvider({ children }) {
    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        axios.get(baseUrl + '/movies/all-movies')
            .then((res) => {
                // console.log(res.data)
                setMovieData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []) // need help here ---------------->>>>>>>>>>>>>>>>>
    return (
        <MovieContext.Provider value={{ movieData, setMovieData }}>
            {children}
        </MovieContext.Provider>
    )
}

export { MovieContext, MovieContextProvider }