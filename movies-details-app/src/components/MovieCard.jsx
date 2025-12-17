import React from "react";

export default function MovieCard({ movie }) {
  return (
    <div className="card">
      <img src={movie.poster} alt={`${movie.title} poster`} className="posterSm" />
      <div className="cardBody">
        <h3 className="title">{movie.title}</h3>
        <p className="muted">{movie.genre.join(" • ")}</p>
      </div>
    </div>
  );
}
