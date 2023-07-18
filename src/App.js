import React from "react";
import { useState ,useEffect } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
    const [movies, setmovies] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setmovies(data.Search);
    }

    useEffect(() => {
        searchMovies("Thank God");
    }, []);
    return (
        <>
        <div className="app">
            <h1>MovieLand</h1>
        </div>
        <div className="search">
            <input 
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={SearchIcon} alt="search" 
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
        {
            movies?.length > 0 
            ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        }
        
        </>
    );
}

export default App;