// src/api/tmdbApi.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

if (!API_KEY) {
  throw new Error("Missing TMDb API key. Set VITE_TMDB_API_KEY in .env");
}

export async function fetchMovies() {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  const json = await res.json();
  return json.results;
}

export async function fetchMovieById(id) {
  const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}