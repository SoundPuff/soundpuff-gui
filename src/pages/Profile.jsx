import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { users, playlists as playlistsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    try {
      const [profileRes, playlistsRes] = await Promise.all([
        users.getUser(username),
        playlistsApi.getAll(),
      ]);

      setProfile(profileRes.data);
      setBio(profileRes.data.bio || '');
      setFollowing(profileRes.data.is_following || false);

      const filtered = playlistsRes.data.filter(
        (p) => p.creator_username === username
      );
      setUserPlaylists(filtered);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (following) {
        await users.unfollow(username);
        setFollowing(false);
      } else {
        await users.follow(username);
        setFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await users.updateMe({ bio });
      setEditMode(false);
      loadProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{profile.username}</h1>
          <p className="profile-email">{profile.email}</p>

          {editMode ? (
            <div className="bio-edit">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write something about yourself..."
                rows="3"
              />
              <div className="bio-actions">
                <button onClick={handleUpdateProfile} className="btn-primary">
                  Save
                </button>
                <button onClick={() => setEditMode(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="profile-bio">{profile.bio || 'No bio yet'}</p>
          )}

          <div className="profile-actions">
            {isOwnProfile ? (
              !editMode && (
                <button onClick={() => setEditMode(true)} className="btn-primary">
                  Edit Profile
                </button>
              )
            ) : (
              <button
                onClick={handleFollow}
                className={following ? 'btn-secondary' : 'btn-primary'}
              >
                {following ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-playlists">
        <h2>Playlists ({userPlaylists.length})</h2>
        <div className="playlists-grid">
          {userPlaylists.length === 0 ? (
            <p className="empty-state">No playlists yet</p>
          ) : (
            userPlaylists.map((playlist) => (
              <a
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
                className="playlist-card"
              >
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
                <div className="playlist-meta">
                  <span>{playlist.songs?.length || 0} songs</span>
                  <span>{playlist.likes_count || 0} likes</span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
