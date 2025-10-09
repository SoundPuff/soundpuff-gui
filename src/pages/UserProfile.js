import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PlaylistCard from '../components/PlaylistCard';

const UserProfile = () => {
  const { userId } = useParams();
  const { users, playlists, currentUser, followUser } = useData();
  
  const user = users.find(u => u.id === parseInt(userId));
  const userPlaylists = playlists.filter(p => p.userId === parseInt(userId));
  const isFollowing = currentUser && currentUser.following.includes(parseInt(userId));
  const isOwnProfile = currentUser && currentUser.id === parseInt(userId);

  if (!user) {
    return (
      <div className="main-content">
        <div className="card">
          <p>User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="card">
        <div className="profile-header">
          <div className="profile-avatar">{user.avatar}</div>
          
          <div className="profile-info">
            <h1 className="profile-username">{user.username}</h1>
            <p className="profile-bio">{user.bio}</p>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-number">{userPlaylists.length}</div>
                <div className="profile-stat-label">Playlists</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-number">{user.followers.length}</div>
                <div className="profile-stat-label">Followers</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-number">{user.following.length}</div>
                <div className="profile-stat-label">Following</div>
              </div>
            </div>

            {!isOwnProfile && (
              <button 
                className={`btn ${isFollowing ? 'btn-outline' : 'btn-primary'}`}
                onClick={() => followUser(user.id)}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">{user.username}'s Playlists</h2>
        {userPlaylists.length > 0 ? (
          <div className="playlist-grid">
            {userPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🎵</div>
            <p className="empty-state-text">This user hasn't created any playlists yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
