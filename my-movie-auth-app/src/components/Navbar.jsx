import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        IMDb Clone
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {user && <Link to="/watchlist">Watchlist</Link>}
      </div>

      <div className="nav-auth">
        {user ? (
          <>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="avatar"
              />
            ) : (
              <span className="user-name">
                {user.displayName || user.email}
              </span>
            )}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
