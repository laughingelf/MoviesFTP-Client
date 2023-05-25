import axios from "axios";


export const movieSearch = (movieName) => {

    const apiKey = '207ef136'

    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`

    console.log('this is the movie', movieName)

    return axios.get(apiUrl, { params: { t: movieName } })


}