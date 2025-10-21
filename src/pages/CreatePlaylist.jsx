import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playlists } from '../services/api';
import './CreatePlaylist.css';

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [songs, setSongs] = useState([{ title: '', artist: '', album: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSongChange = (index, field, value) => {
    const newSongs = [...songs];
    newSongs[index][field] = value;
    setSongs(newSongs);
  };

  const addSong = () => {
    setSongs([...songs, { title: '', artist: '', album: '' }]);
  };

  const removeSong = (index) => {
    if (songs.length > 1) {
      setSongs(songs.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validSongs = songs.filter(
      (song) => song.title.trim() && song.artist.trim()
    );

    if (validSongs.length === 0) {
      setError('Please add at least one song with title and artist');
      setLoading(false);
      return;
    }

    try {
      const response = await playlists.create({
        title: formData.title,
        description: formData.description,
        songs: validSongs,
      });

      navigate(`/playlist/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-playlist-container">
      <div className="create-playlist-card">
        <h1>Create New Playlist</h1>

        <form onSubmit={handleSubmit} className="create-playlist-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Playlist Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="My Awesome Playlist"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe your playlist..."
            />
          </div>

          <div className="songs-section">
            <h3>Songs</h3>
            {songs.map((song, index) => (
              <div key={index} className="song-input">
                <div className="song-fields">
                  <input
                    type="text"
                    placeholder="Song title"
                    value={song.title}
                    onChange={(e) =>
                      handleSongChange(index, 'title', e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Artist"
                    value={song.artist}
                    onChange={(e) =>
                      handleSongChange(index, 'artist', e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Album (optional)"
                    value={song.album}
                    onChange={(e) =>
                      handleSongChange(index, 'album', e.target.value)
                    }
                  />
                </div>
                {songs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSong(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addSong} className="btn-add">
              + Add Song
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Playlist'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylist;
