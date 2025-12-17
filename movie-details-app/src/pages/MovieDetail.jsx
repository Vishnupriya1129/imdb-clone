import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`
        );
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  if (loading) {
    return (
      <div className="movie-detail-loading">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-detail-content">
        <div className="movie-poster-section">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"}
            alt={movie.Title}
            className="movie-detail-poster"
          />
          
          <div className="movie-ratings">
            <h3>Ratings</h3>
            <div className="rating-item">
              <span className="rating-source">IMDb</span>
              <span className="rating-value">⭐ {movie.imdbRating}/10</span>
            </div>
            <div className="rating-item">
              <span className="rating-source">Votes</span>
              <span className="rating-value">{movie.imdbVotes}</span>
            </div>
            {movie.Ratings?.map((rating, index) => (
              <div key={index} className="rating-item">
                <span className="rating-source">{rating.Source}</span>
                <span className="rating-value">{rating.Value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="movie-info-section">
          <h1 className="movie-title">{movie.Title}</h1>
          
          <div className="movie-meta">
            <span className="year">{movie.Year}</span>
            <span className="rated">{movie.Rated}</span>
            <span className="runtime">{movie.Runtime}</span>
          </div>

          <div className="movie-genres">
            {movie.Genre.split(", ").map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>

          <div className="movie-section">
            <h3>📖 Plot</h3>
            <p className="movie-plot">{movie.Plot}</p>
          </div>

          <div className="movie-section">
            <h3>🎬 Cast</h3>
            <p className="movie-cast">{movie.Actors}</p>
          </div>

          <div className="movie-section">
            <h3>🎥 Director</h3>
            <p>{movie.Director}</p>
          </div>

          <div className="movie-section">
            <h3>✍️ Writer</h3>
            <p>{movie.Writer}</p>
          </div>

          <div className="movie-details-grid">
            <div className="detail-item">
              <strong>Language:</strong>
              <span>{movie.Language}</span>
            </div>
            <div className="detail-item">
              <strong>Country:</strong>
              <span>{movie.Country}</span>
            </div>
            <div className="detail-item">
              <strong>Released:</strong>
              <span>{movie.Released}</span>
            </div>
            <div className="detail-item">
              <strong>Box Office:</strong>
              <span>{movie.BoxOffice || "N/A"}</span>
            </div>
            <div className="detail-item">
              <strong>Production:</strong>
              <span>{movie.Production || "N/A"}</span>
            </div>
            <div className="detail-item">
              <strong>Awards:</strong>
              <span>{movie.Awards}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
