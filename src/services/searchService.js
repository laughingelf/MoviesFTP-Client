import axios from "axios";


export const movieSearch = (movieName) => {

    const options = {
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieName}`,
        params: {
            exact: 'false',
            titleType: 'movie'
        },
        headers: {
            'X-RapidAPI-Key': '39af2f4383msha9a56f3ac4a9f8ep12c99ajsn19417c0ac7dd',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    return axios.request(options)



}