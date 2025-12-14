import React from "react";
import MovieReviews from "./MovieReviews";

const MovieCard = ({ movie, user, reviews, onAddReview }) => {
  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={movie.Title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
        }}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p className="rating">Year: {movie.Year}</p>
      </div>

      <MovieReviews
        movieId={movie.imdbID}
        user={user}
        reviews={reviews}
        onAddReview={onAddReview}
      />
    </div>
  );
};

export default MovieCard;