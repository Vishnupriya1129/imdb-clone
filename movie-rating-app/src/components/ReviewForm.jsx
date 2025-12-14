import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ReviewForm.css";

const ReviewForm = ({ movieId, user, onAddReview }) => {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const trimmed = comment.trim();
    if (rating < 1 || rating > 10) {
      alert("Rating must be between 1 and 10.");
      return;
    }

    onAddReview(movieId, {
      rating,
      comment: trimmed,
      username: user.username || user.email || "Anonymous",
      createdAt: new Date().toISOString(),
    });

    setRating(10);
    setComment("");
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <label>
        Your rating (1-10):
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>

      <label>
        Your review:
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think about this movie?"
        />
      </label>

      <button type="submit">Submit review</button>
    </form>
  );
};

ReviewForm.propTypes = {
  movieId: PropTypes.string.isRequired,
  user: PropTypes.object,
  onAddReview: PropTypes.func.isRequired,
};

export default ReviewForm;