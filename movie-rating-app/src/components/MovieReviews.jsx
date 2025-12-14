import React from "react";
import ReviewForm from "./ReviewForm";

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
        <p className="movie-reviewsavg">
          Average user rating: <strong>{avg}/10</strong> ({reviews.length}{" "}
          vote{reviews.length > 1 ? "s" : ""})
        </p>
      )}

      <ReviewForm movieId={movieId} user={user} onAddReview={onAddReview} />

      <ul className="movie-reviewslist">
        {reviews.map((r, idx) => (
          <li key={idx} className="movie-reviewsitem">
            <div className="movie-reviewsmeta">
              <span className="movie-reviewsusername">{r.username}</span>
              <span className="movie-reviewsrating">{r.rating}/10</span>
              <span className="movie-reviewstime">
                {new Date(r.createdAt).toLocaleString()}
              </span>
            </div>
            {r.comment && (
              <p className="movie-reviewscomment">{r.comment}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;