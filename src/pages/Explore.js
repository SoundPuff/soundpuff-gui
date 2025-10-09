import React from 'react';
import { useData } from '../context/DataContext';
import PlaylistCard from '../components/PlaylistCard';

const Explore = () => {
  const { playlists } = useData();

  // Show all playlists sorted by most recent
  const sortedPlaylists = [...playlists].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Explore Playlists</h1>
        </div>
      </div>

      <div className="playlist-grid">
        {sortedPlaylists.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
