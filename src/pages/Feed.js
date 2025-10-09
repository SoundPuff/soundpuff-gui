import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PlaylistCard from '../components/PlaylistCard';

const Feed = () => {
  const { playlists, users, currentUser } = useData();
  const navigate = useNavigate();

  // Get playlists from users that the current user follows
  const feedPlaylists = currentUser
    ? playlists
        .filter(playlist => currentUser.following.includes(playlist.userId))
        .sort((a, b) => b.createdAt - a.createdAt)
    : [];

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Your Feed</h1>
        </div>
        
        {feedPlaylists.length > 0 ? (
          feedPlaylists.map(playlist => {
            const creator = users.find(u => u.id === playlist.userId);
            return (
              <div key={playlist.id} className="feed-item">
                <div className="feed-header">
                  <div className="feed-avatar">{creator?.avatar}</div>
                  <div className="feed-user-info">
                    <div 
                      className="feed-username"
                      onClick={() => navigate(`/user/${creator?.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {creator?.username}
                    </div>
                    <div className="feed-time">
                      {playlist.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <PlaylistCard playlist={playlist} />
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p className="empty-state-text">
              No playlists in your feed yet. Follow some users to see their playlists here!
            </p>
            <button className="btn btn-primary mt-2" onClick={() => navigate('/explore')}>
              Explore Users
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
