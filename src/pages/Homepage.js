import { Link } from "react-router-dom"

const Homepage = () => {
    return (
        <div id="landing-page">
            <div className="movie-block">
                <Link to='/movies/all-movies'>
                    <h5>All Movies</h5>
                </Link>

            </div>
            <div className="movie-block">
                <Link to='/movies/all-movies'>
                    <h5>Comedy</h5>
                </Link>

            </div>
            <div className="movie-block">
                <Link to='/movies/all-movies'>
                    <h5>Horror</h5>
                </Link>

            </div>
            <div className="movie-block">
                <Link to='/movies/all-movies'>
                    <h5>Kids</h5>
                </Link>

            </div>
            <div className="movie-block">
                <Link to='/movies/all-movies'>
                    <h5>Drama</h5>
                </Link>

            </div>

        </div>
    )
}

export default Homepage