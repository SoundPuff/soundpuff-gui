import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { playlists } from '../services/api';
import './Feed.css';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const response = await playlists.getFeed();
      setFeed(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setFeed([]);
      } else {
        setError('Failed to load feed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading feed...</div>;
  }

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Your Feed</h1>
        <Link to="/playlist/create" className="btn-create">
          Create Playlist
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {feed.length === 0 ? (
        <div className="empty-feed">
          <h2>Your feed is empty</h2>
          <p>Follow some users to see their playlists here!</p>
          <p>Or start by creating your own playlist.</p>
        </div>
      ) : (
        <div className="feed-grid">
          {feed.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="feed-card"
            >
              <div className="feed-card-header">
                <h3>{playlist.title}</h3>
                <p className="feed-card-creator">
                  by {playlist.creator_username}
                </p>
              </div>

              <p className="feed-card-description">{playlist.description}</p>

              <div className="feed-card-meta">
                <span>{playlist.songs?.length || 0} songs</span>
                <span>♥ {playlist.likes_count || 0}</span>
                <span>{playlist.comments_count || 0} comments</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
