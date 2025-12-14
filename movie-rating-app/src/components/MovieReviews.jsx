import React from "react";
import PropTypes from "prop-types";
import ReviewForm from "./ReviewForm";
import "./MovieReviews.css";

const MovieReviews = ({ movieId, user, reviews = [], onAddReview }) => {
  const avg =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="movie-reviews">
      <h4>User Reviews</h4>

      {avg && (
        <p className="movie-reviews-avg">
          Average user rating: <strong>{avg}/10</strong> ({reviews.length}{" "}
          vote{reviews.length > 1 ? "s" : ""})
        </p>
      )}

      <ReviewForm movieId={movieId} user={user} onAddReview={onAddReview} />

      <ul className="movie-reviews-list">
        {reviews.map((r, idx) => (
          <li key={idx} className="movie-reviews-item">
            <div className="movie-reviews-meta">
              <span className="movie-reviews-username">{r.username}</span>
              <span className="movie-reviews-rating">{r.rating}/10</span>
              <span className="movie-reviews-time">
                {new Date(r.createdAt).toLocaleString()}
              </span>
            </div>
            {r.comment && <p className="movie-reviews-comment">{r.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieReviews.propTypes = {
  movieId: PropTypes.string.isRequired,
  user: PropTypes.object,
  reviews: PropTypes.array,
  onAddReview: PropTypes.func.isRequired,
};

export default MovieReviews;