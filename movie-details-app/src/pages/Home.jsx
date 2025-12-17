import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("batman");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const fetchMovies = async (search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🎬 IMDb Clone - Movie Details</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </header>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                className="movie-card"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Poster"
                  }
                  alt={movie.Title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-results">No movies found. Try another search!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
