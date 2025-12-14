// src/services/api.js
const OMDB_API_KEY = "7df63cea"; // replace with your own key if needed

export const fetchMoviesByTitle = async (title) => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(title)}&type=movie`
  );
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Not found");
  return data.Search || [];
};

export const fetchMovieById = async (imdbID) => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`
  );
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Not found");
  return data;
};