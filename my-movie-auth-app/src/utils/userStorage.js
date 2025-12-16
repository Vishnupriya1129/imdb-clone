export const getUserKey = (user) => (user ? `imdb-${user.uid}` : null);

export const loadUserData = (user) => {
  const key = getUserKey(user);
  if (!key) return { watchlist: [], history: [] };
  const raw = localStorage.getItem(key);
  if (!raw) return { watchlist: [], history: [] };
  try {
    return JSON.parse(raw);
  } catch {
    return { watchlist: [], history: [] };
  }
};

export const saveUserData = (user, data) => {
  const key = getUserKey(user);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(data));
};
