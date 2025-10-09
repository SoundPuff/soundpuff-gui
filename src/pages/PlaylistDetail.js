import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { playlists, users, currentUser, likePlaylist, addComment, deletePlaylist } = useData();
  const [commentText, setCommentText] = useState('');

  const playlist = playlists.find(p => p.id === parseInt(playlistId));
  const creator = playlist ? users.find(u => u.id === playlist.userId) : null;
  const isLiked = currentUser && playlist && playlist.likes.includes(currentUser.id);
  const isOwner = currentUser && playlist && playlist.userId === currentUser.id;

  if (!playlist) {
    return (
      <div className="main-content">
        <div className="card">
          <p>Playlist not found</p>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    likePlaylist(playlist.id);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(playlist.id, commentText);
      setCommentText('');
    }
  };

  const handleEdit = () => {
    navigate(`/playlist/${playlist.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(playlist.id);
      navigate('/profile');
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">{playlist.name}</h1>
            <p className="text-muted">{playlist.description}</p>
          </div>
          {isOwner && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary btn-small" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-outline btn-small" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="playlist-meta mb-2">
          <div 
            className="playlist-creator"
            onClick={() => navigate(`/user/${creator?.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <span>{creator?.avatar}</span>
            <span>{creator?.username}</span>
          </div>
          <span>{new Date(playlist.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="playlist-actions">
          <button className={`action-btn ${isLiked ? 'active' : ''}`} onClick={handleLike}>
            ❤️ {playlist.likes.length} {playlist.likes.length === 1 ? 'like' : 'likes'}
          </button>
          <button className="action-btn">
            💬 {playlist.comments.length} {playlist.comments.length === 1 ? 'comment' : 'comments'}
          </button>
        </div>

        <div className="mt-3">
          <h3>Songs ({playlist.songs.length})</h3>
          {playlist.songs.length > 0 ? (
            <ul className="song-list">
              {playlist.songs.map((song, index) => (
                <li key={song.id} className="song-item">
                  <div>
                    <span style={{ marginRight: '1rem', color: '#999' }}>{index + 1}.</span>
                    <span className="song-info">
                      <div className="song-title">{song.title}</div>
                      <div className="song-artist">{song.artist}</div>
                    </span>
                  </div>
                  <span className="song-duration">{song.duration}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p className="text-muted">No songs in this playlist yet</p>
              {isOwner && (
                <button className="btn btn-primary mt-2" onClick={handleEdit}>
                  Add Songs
                </button>
              )}
            </div>
          )}
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          
          <form className="comment-form" onSubmit={handleComment}>
            <input
              type="text"
              className="form-input comment-input"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>

          <ul className="comment-list">
            {playlist.comments.map(comment => {
              const author = users.find(u => u.id === comment.userId);
              return (
                <li key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span 
                      className="comment-author"
                      onClick={() => navigate(`/user/${author?.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {author?.avatar} {author?.username}
                    </span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
