import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import PlaylistDetail from './pages/PlaylistDetail';
import PlaylistForm from './pages/PlaylistForm';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/playlist/new" element={<PlaylistForm />} />
            <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
            <Route path="/playlist/:playlistId/edit" element={<PlaylistForm />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
