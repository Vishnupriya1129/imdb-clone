import React from "react";
import PropTypes from "prop-types";
import MovieReviews from "./MovieReviews";
import "./MovieCard.css";

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
        <p className="movie-rating">Year: {movie.Year}</p>
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

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  reviews: PropTypes.array,
  onAddReview: PropTypes.func.isRequired,
};

export default MovieCard;