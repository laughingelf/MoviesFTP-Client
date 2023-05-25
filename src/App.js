
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import MoviesList from './pages/MoviesList';
import UserList from './pages/UserList';
import SearchBar from './components/SearchBar';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import MovieDetails from './pages/MovieDetails';
import UserProfile from './pages/UserProfile';
import AddMovie from './pages/AddMovie';


function App() {
  return (
    <div className="App">

      <Navbar />
      <SearchBar />

      <Routes>
        <Route path='/' element={<MoviesList />} />
        <Route path='/movies/all-movies' element={<MoviesList />} />
        <Route path='/movies/movie-details/:id' element={<MovieDetails />} />
        <Route path='/movies/add-movie/:movieName' element={<AddMovie />} />

        <Route path='/users/all-users' element={<UserList />} />
        <Route path='/users/profile' element={<UserProfile />} />

        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/login' element={<LoginPage />} />
      </Routes>


    </div>
  );
}

export default App;
