import React, { useState } from "react";
import { fetchMoviesByTitle } from "../services/api.js";
import MovieCard from "./MovieCard";
import "./Movies.css";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await fetchMoviesByTitle(query);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movies-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            user={{ username: "Guest" }}
            reviews={[]}
            onAddReview={(id, review) =>
              console.log("Review added for", id, review)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;