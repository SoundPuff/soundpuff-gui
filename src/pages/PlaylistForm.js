import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const PlaylistForm = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { playlists, availableSongs, createPlaylist, updatePlaylist, addSongToPlaylist, removeSongFromPlaylist } = useData();
  
  const isEdit = !!playlistId;
  const existingPlaylist = isEdit ? playlists.find(p => p.id === parseInt(playlistId)) : null;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (existingPlaylist) {
      setFormData({
        name: existingPlaylist.name,
        description: existingPlaylist.description,
      });
      setSelectedSongs(existingPlaylist.songs);
    }
  }, [existingPlaylist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEdit) {
      updatePlaylist(parseInt(playlistId), formData);
      
      // Update songs
      const currentSongIds = existingPlaylist.songs.map(s => s.id);
      const newSongIds = selectedSongs.map(s => s.id);
      
      // Remove songs that are no longer selected
      currentSongIds.forEach(songId => {
        if (!newSongIds.includes(songId)) {
          removeSongFromPlaylist(parseInt(playlistId), songId);
        }
      });
      
      // Add new songs
      selectedSongs.forEach(song => {
        if (!currentSongIds.includes(song.id)) {
          addSongToPlaylist(parseInt(playlistId), song);
        }
      });
      
      navigate(`/playlist/${playlistId}`);
    } else {
      const newPlaylist = createPlaylist(formData);
      selectedSongs.forEach(song => {
        addSongToPlaylist(newPlaylist.id, song);
      });
      navigate(`/playlist/${newPlaylist.id}`);
    }
  };

  const toggleSong = (song) => {
    if (selectedSongs.find(s => s.id === song.id)) {
      setSelectedSongs(selectedSongs.filter(s => s.id !== song.id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const filteredSongs = availableSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="card">
        <h1 className="card-title">{isEdit ? 'Edit Playlist' : 'Create New Playlist'}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Playlist Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Add Songs</label>
            <input
              type="text"
              className="form-input"
              placeholder="Search songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <h3>Available Songs</h3>
            <ul className="song-list">
              {filteredSongs.map(song => {
                const isSelected = selectedSongs.find(s => s.id === song.id);
                return (
                  <li key={song.id} className="song-item">
                    <div className="song-info">
                      <div className="song-title">{song.title}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="song-duration">{song.duration}</span>
                      <button
                        type="button"
                        className={`btn btn-small ${isSelected ? 'btn-outline' : 'btn-primary'}`}
                        onClick={() => toggleSong(song)}
                      >
                        {isSelected ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {selectedSongs.length > 0 && (
            <div className="mt-3">
              <h3>Selected Songs ({selectedSongs.length})</h3>
              <ul className="song-list">
                {selectedSongs.map((song, index) => (
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
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save Changes' : 'Create Playlist'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={() => navigate(isEdit ? `/playlist/${playlistId}` : '/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaylistForm;
