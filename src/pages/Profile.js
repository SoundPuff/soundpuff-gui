import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PlaylistCard from '../components/PlaylistCard';

const Profile = () => {
  const { currentUser, playlists, updateUserProfile } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || '👤',
  });

  const userPlaylists = playlists.filter(p => p.userId === currentUser?.id);

  const handleSave = () => {
    updateUserProfile(currentUser.id, editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: currentUser?.name || '',
      bio: currentUser?.bio || '',
      avatar: currentUser?.avatar || '👤',
    });
    setIsEditing(false);
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <div className="card">
        <div className="profile-header">
          <div className="profile-avatar">{currentUser.avatar}</div>
          
          <div className="profile-info">
            <h1 className="profile-username">{currentUser.username}</h1>
            <p className="profile-bio">{currentUser.bio}</p>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-number">{userPlaylists.length}</div>
                <div className="profile-stat-label">Playlists</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-number">{currentUser.followers.length}</div>
                <div className="profile-stat-label">Followers</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-number">{currentUser.following.length}</div>
                <div className="profile-stat-label">Following</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/playlist/new')}>
                Create Playlist
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="card mt-2">
            <h2>Edit Profile</h2>
            <div className="form-group">
              <label className="form-label">Avatar (emoji)</label>
              <input
                type="text"
                className="form-input"
                value={editForm.avatar}
                onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                maxLength={2}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-textarea"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="card-title">My Playlists</h2>
        {userPlaylists.length > 0 ? (
          <div className="playlist-grid">
            {userPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🎵</div>
            <p className="empty-state-text">You haven't created any playlists yet</p>
            <button className="btn btn-primary mt-2" onClick={() => navigate('/playlist/new')}>
              Create Your First Playlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
