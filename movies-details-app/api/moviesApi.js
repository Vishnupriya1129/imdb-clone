import { movies } from "../data/movies";

// Faux async API with latency + error paths for robustness
export const fetchMovies = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(movies), 400); // simulate loading
  });

export const fetchMovieById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = movies.find((m) => m.id === id);
      if (found) resolve(found);
      else reject(new Error("Movie not found"));
    }, 400);
  });
