import React from 'react';
import MovieCard from './components/MovieCard';

const sampleMovies = [
  {
    id: 27205,
    title: 'Inception',
    releaseYear: 2010,
    rating: 8.8,
    poster: 'https://image.tmdb.org/t/p/w300/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'
  },
  {
    id: 157336,
    title: 'Interstellar',
    releaseYear: 2014,
    rating: 8.6,
    poster: 'https://image.tmdb.org/t/p/w300/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'
  },
  {
    id: 603,
    title: 'The Matrix',
    releaseYear: 1999,
    rating: 8.7,
    poster: 'https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
  },
  {
    id: 299534,
    title: 'Avengers: Endgame',
    releaseYear: 2019,
    rating: 8.4,
    poster: 'https://image.tmdb.org/t/p/w300/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Movie Cards</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseYear={movie.releaseYear}
            rating={movie.rating}
            poster={movie.poster}
          />
        ))}
      </div>
    </div>
  );
}