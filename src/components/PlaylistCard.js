import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { users, currentUser, likePlaylist } = useData();
  
  const creator = users.find(u => u.id === playlist.userId);
  const isLiked = currentUser && playlist.likes.includes(currentUser.id);

  const handleLike = (e) => {
    e.stopPropagation();
    likePlaylist(playlist.id);
  };

  return (
    <div className="playlist-card" onClick={() => navigate(`/playlist/${playlist.id}`)}>
      <h3 className="playlist-name">{playlist.name}</h3>
      <p className="playlist-description">{playlist.description}</p>
      
      <div className="playlist-meta">
        <div className="playlist-creator">
          <span>{creator?.avatar}</span>
          <span>{creator?.username}</span>
        </div>
        <span>{playlist.songs.length} songs</span>
      </div>

      <div className="playlist-actions" onClick={(e) => e.stopPropagation()}>
        <button className={`action-btn ${isLiked ? 'active' : ''}`} onClick={handleLike}>
          ❤️ {playlist.likes.length}
        </button>
        <button className="action-btn">
          💬 {playlist.comments.length}
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
