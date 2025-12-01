import React, { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/search/movie';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
          );
          const data = await res.json();
          setResults(data.results || []);
        } catch (err) {
          console.error('Error fetching movies:', err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }, 500); // debounce 500ms

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="app">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && query && <p>No Results Found</p>}
      <ul className="results">
        {results.map((movie) => (
          <li key={movie.id} className="movie-item">
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="poster"
                />
              )}
              <div className="info">
                <span className="title">{movie.title}</span>
                {movie.release_date && (
                  <span className="year">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}