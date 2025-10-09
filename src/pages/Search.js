import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PlaylistCard from '../components/PlaylistCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { search, currentUser, followUser } = useData();
  const [results, setResults] = useState({ users: [], playlists: [], songs: [] });

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      const searchResults = search(query);
      setResults(searchResults);
    }
  }, [query, search]);

  return (
    <div className="main-content">
      <div className="card">
        <h1 className="card-title">Search Results for "{query}"</h1>
      </div>

      {results.users.length === 0 && results.playlists.length === 0 && results.songs.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p className="empty-state-text">No results found</p>
          </div>
        </div>
      )}

      {results.users.length > 0 && (
        <div className="search-section">
          <div className="card">
            <h2 className="search-section-title">Users</h2>
            <ul className="user-list">
              {results.users.map(user => {
                const isFollowing = currentUser && currentUser.following.includes(user.id);
                const isOwnProfile = currentUser && currentUser.id === user.id;
                
                return (
                  <li key={user.id} className="user-item">
                    <div 
                      className="user-info"
                      onClick={() => navigate(`/user/${user.id}`)}
                      style={{ cursor: 'pointer', flex: 1 }}
                    >
                      <div className="user-avatar">{user.avatar}</div>
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-username">@{user.username}</div>
                        {user.bio && <div className="text-muted">{user.bio}</div>}
                      </div>
                    </div>
                    {!isOwnProfile && (
                      <button
                        className={`btn btn-small ${isFollowing ? 'btn-outline' : 'btn-primary'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          followUser(user.id);
                        }}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {results.playlists.length > 0 && (
        <div className="search-section">
          <div className="card">
            <h2 className="search-section-title">Playlists</h2>
          </div>
          <div className="playlist-grid">
            {results.playlists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      )}

      {results.songs.length > 0 && (
        <div className="search-section">
          <div className="card">
            <h2 className="search-section-title">Songs</h2>
            <ul className="song-list">
              {results.songs.map(song => (
                <li key={song.id} className="song-item">
                  <div className="song-info">
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
                  </div>
                  <span className="song-duration">{song.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
