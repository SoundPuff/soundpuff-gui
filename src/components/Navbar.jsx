import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/feed" className="navbar-logo">
          SoundPuff
        </Link>

        {user && (
          <div className="navbar-menu">
            <Link to="/feed" className="navbar-link">
              Feed
            </Link>
            <Link to="/playlist/create" className="navbar-link">
              Create Playlist
            </Link>
            <Link to={`/profile/${user.username}`} className="navbar-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="navbar-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
