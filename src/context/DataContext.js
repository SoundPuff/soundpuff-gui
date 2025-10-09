import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Current user state
  const [currentUser, setCurrentUser] = useState(null);

  // Mock data states
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'john_doe',
      name: 'John Doe',
      bio: 'Music lover and playlist curator',
      avatar: '👤',
      following: [2],
      followers: [2, 3],
    },
    {
      id: 2,
      username: 'jane_smith',
      name: 'Jane Smith',
      bio: 'Jazz enthusiast | Coffee addict',
      avatar: '🎵',
      following: [1, 3],
      followers: [1],
    },
    {
      id: 3,
      username: 'music_fan',
      name: 'Alex Johnson',
      bio: 'Discovering new sounds every day',
      avatar: '🎧',
      following: [1],
      followers: [2],
    },
  ]);

  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: 'Chill Vibes',
      description: 'Perfect for relaxing afternoons',
      userId: 1,
      createdAt: new Date('2024-01-15'),
      songs: [
        { id: 1, title: 'Sunset Dreams', artist: 'Ambient Flow', duration: '3:45' },
        { id: 2, title: 'Ocean Waves', artist: 'Nature Sounds', duration: '4:20' },
      ],
      likes: [2, 3],
      comments: [
        { id: 1, userId: 2, text: 'Love this playlist!', createdAt: new Date('2024-01-16') },
      ],
    },
    {
      id: 2,
      name: 'Workout Energy',
      description: 'High energy tracks for your gym sessions',
      userId: 2,
      createdAt: new Date('2024-01-20'),
      songs: [
        { id: 3, title: 'Power Up', artist: 'Energy Boost', duration: '3:30' },
        { id: 4, title: 'Running Wild', artist: 'Fitness Beats', duration: '4:15' },
      ],
      likes: [1],
      comments: [],
    },
    {
      id: 3,
      name: 'Jazz Classics',
      description: 'Timeless jazz standards',
      userId: 2,
      createdAt: new Date('2024-01-18'),
      songs: [
        { id: 5, title: 'Blue Notes', artist: 'Jazz Quartet', duration: '5:20' },
        { id: 6, title: 'Smooth Saxophone', artist: 'Classic Jazz', duration: '4:45' },
      ],
      likes: [3],
      comments: [],
    },
  ]);

  const [availableSongs] = useState([
    { id: 1, title: 'Sunset Dreams', artist: 'Ambient Flow', duration: '3:45' },
    { id: 2, title: 'Ocean Waves', artist: 'Nature Sounds', duration: '4:20' },
    { id: 3, title: 'Power Up', artist: 'Energy Boost', duration: '3:30' },
    { id: 4, title: 'Running Wild', artist: 'Fitness Beats', duration: '4:15' },
    { id: 5, title: 'Blue Notes', artist: 'Jazz Quartet', duration: '5:20' },
    { id: 6, title: 'Smooth Saxophone', artist: 'Classic Jazz', duration: '4:45' },
    { id: 7, title: 'Morning Coffee', artist: 'Cafe Sounds', duration: '3:50' },
    { id: 8, title: 'Night Drive', artist: 'Synthwave Mix', duration: '4:30' },
    { id: 9, title: 'Summer Breeze', artist: 'Tropical Vibes', duration: '3:25' },
    { id: 10, title: 'City Lights', artist: 'Urban Beats', duration: '4:10' },
  ]);

  // Initialize current user
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(users[0]);
    }
  }, [currentUser, users]);

  // User actions
  const updateUserProfile = (userId, updates) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  const followUser = (userIdToFollow) => {
    if (!currentUser) return;
    
    const isFollowing = currentUser.following.includes(userIdToFollow);
    const updatedFollowing = isFollowing
      ? currentUser.following.filter(id => id !== userIdToFollow)
      : [...currentUser.following, userIdToFollow];

    const updatedUser = { ...currentUser, following: updatedFollowing };
    setCurrentUser(updatedUser);
    
    setUsers(users.map(user => {
      if (user.id === currentUser.id) {
        return updatedUser;
      }
      if (user.id === userIdToFollow) {
        const updatedFollowers = isFollowing
          ? user.followers.filter(id => id !== currentUser.id)
          : [...user.followers, currentUser.id];
        return { ...user, followers: updatedFollowers };
      }
      return user;
    }));
  };

  // Playlist actions
  const createPlaylist = (playlistData) => {
    const newPlaylist = {
      id: playlists.length + 1,
      ...playlistData,
      userId: currentUser.id,
      createdAt: new Date(),
      songs: [],
      likes: [],
      comments: [],
    };
    setPlaylists([...playlists, newPlaylist]);
    return newPlaylist;
  };

  const updatePlaylist = (playlistId, updates) => {
    setPlaylists(playlists.map(playlist =>
      playlist.id === playlistId ? { ...playlist, ...updates } : playlist
    ));
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(playlists.map(playlist =>
      playlist.id === playlistId
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist
    ));
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(playlists.map(playlist =>
      playlist.id === playlistId
        ? { ...playlist, songs: playlist.songs.filter(s => s.id !== songId) }
        : playlist
    ));
  };

  const likePlaylist = (playlistId) => {
    if (!currentUser) return;
    
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const likes = playlist.likes.includes(currentUser.id)
          ? playlist.likes.filter(id => id !== currentUser.id)
          : [...playlist.likes, currentUser.id];
        return { ...playlist, likes };
      }
      return playlist;
    }));
  };

  const addComment = (playlistId, text) => {
    if (!currentUser) return;
    
    const newComment = {
      id: Date.now(),
      userId: currentUser.id,
      text,
      createdAt: new Date(),
    };

    setPlaylists(playlists.map(playlist =>
      playlist.id === playlistId
        ? { ...playlist, comments: [...playlist.comments, newComment] }
        : playlist
    ));
  };

  // Search functionality
  const search = (query) => {
    const lowerQuery = query.toLowerCase();
    
    const matchedUsers = users.filter(user =>
      user.username.toLowerCase().includes(lowerQuery) ||
      user.name.toLowerCase().includes(lowerQuery)
    );

    const matchedPlaylists = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(lowerQuery) ||
      playlist.description.toLowerCase().includes(lowerQuery)
    );

    const matchedSongs = availableSongs.filter(song =>
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery)
    );

    return { users: matchedUsers, playlists: matchedPlaylists, songs: matchedSongs };
  };

  const value = {
    currentUser,
    users,
    playlists,
    availableSongs,
    updateUserProfile,
    followUser,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    likePlaylist,
    addComment,
    search,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
