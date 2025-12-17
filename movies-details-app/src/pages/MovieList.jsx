import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovies } from "../../api/tmdbApi";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div>
        {movies.map((m) => (
          <Link key={m.id} to={`/movies/${m.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
              alt={m.title}
            />
            <p>{m.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}