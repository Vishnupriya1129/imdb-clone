import React from 'react';

export default function MovieCard({ id, poster, title, releaseYear, rating }) {
  return (
    <a
      href={`https://www.themoviedb.org/movie/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-200 overflow-hidden flex flex-col"
    >
      <img src={poster} alt={title} className="w-full h-72 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-gray-600 text-sm">Released: {releaseYear}</p>
        <p className="text-yellow-500 font-medium mt-2">⭐ {rating}</p>
      </div>
    </a>
  );
}