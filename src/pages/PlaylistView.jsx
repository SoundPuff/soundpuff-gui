import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { playlists } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './PlaylistView.css';

const PlaylistView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    loadPlaylist();
    loadComments();
  }, [id]);

  const loadPlaylist = async () => {
    try {
      const response = await playlists.getById(id);
      setPlaylist(response.data);
      setLiked(response.data.is_liked || false);
    } catch (error) {
      console.error('Error loading playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await playlists.getComments(id);
      setComments(response.data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await playlists.unlike(id);
        setLiked(false);
        setPlaylist({
          ...playlist,
          likes_count: (playlist.likes_count || 1) - 1,
        });
      } else {
        await playlists.like(id);
        setLiked(true);
        setPlaylist({
          ...playlist,
          likes_count: (playlist.likes_count || 0) + 1,
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await playlists.addComment(id, { content: newComment });
      setNewComment('');
      loadComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await playlists.deleteComment(commentId);
      loadComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      try {
        await playlists.delete(id);
        navigate('/feed');
      } catch (error) {
        console.error('Error deleting playlist:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading playlist...</div>;
  }

  if (!playlist) {
    return <div className="error">Playlist not found</div>;
  }

  const isOwner = user?.username === playlist.creator_username;

  return (
    <div className="playlist-view-container">
      <div className="playlist-header">
        <div className="playlist-header-content">
          <h1>{playlist.title}</h1>
          <p className="playlist-creator">
            by{' '}
            <a href={`/profile/${playlist.creator_username}`}>
              {playlist.creator_username}
            </a>
          </p>
          <p className="playlist-description">{playlist.description}</p>

          <div className="playlist-stats">
            <span>{playlist.songs?.length || 0} songs</span>
            <span>{playlist.likes_count || 0} likes</span>
            <span>{comments.length} comments</span>
          </div>

          <div className="playlist-actions">
            <button
              onClick={handleLike}
              className={liked ? 'btn-liked' : 'btn-like'}
            >
              {liked ? '♥ Liked' : '♡ Like'}
            </button>

            {isOwner && (
              <button onClick={handleDelete} className="btn-delete">
                Delete Playlist
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="playlist-content">
        <div className="songs-list">
          <h2>Songs</h2>
          {playlist.songs && playlist.songs.length > 0 ? (
            <div className="songs">
              {playlist.songs.map((song, index) => (
                <div key={index} className="song-item">
                  <div className="song-number">{index + 1}</div>
                  <div className="song-info">
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
                  </div>
                  {song.album && <div className="song-album">{song.album}</div>}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No songs in this playlist</p>
          )}
        </div>

        <div className="comments-section">
          <h2>Comments</h2>

          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            />
            <button type="submit" className="btn-primary">
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="empty-state">No comments yet</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <a
                      href={`/profile/${comment.user_username}`}
                      className="comment-author"
                    >
                      {comment.user_username}
                    </a>
                    <span className="comment-date">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                  {user?.username === comment.user_username && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="btn-delete-comment"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;
