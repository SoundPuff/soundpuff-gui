# SoundPuff - Frontend

A social music platform where users can share their playlists, like and comment on others' music collections, and follow other users.

## Features

### Implemented Mandatory Features
- User authentication (sign-up / login with JWT)
- User profiles with custom bio and avatar
- Playlist creation / viewing / editing
- Following / unfollowing other users
- Feed page showing latest playlists from followed users
- Like and comment features on playlists
- Responsive design for desktop

## Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
soundpuff-gui/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation bar
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Signup.jsx           # Sign up page
│   │   ├── Feed.jsx             # Feed page
│   │   ├── Profile.jsx          # User profile page
│   │   ├── PlaylistView.jsx    # View single playlist
│   │   └── CreatePlaylist.jsx  # Create new playlist
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── services/
│   │   └── api.js              # API client
│   ├── styles/
│   │   ├── index.css           # Global styles
│   │   └── App.css             # App component styles
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running (see backend repo)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Backend Configuration

The frontend is configured to proxy API requests to `http://localhost:8000`. Make sure the backend server is running before starting the frontend.

## Available Pages

- `/login` - User login
- `/signup` - User registration
- `/feed` - Main feed showing playlists from followed users
- `/profile/:username` - User profile page
- `/playlist/create` - Create new playlist
- `/playlist/:id` - View playlist details

## Features Overview

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Protected routes for authenticated users
- Auto-redirect to login for unauthenticated users

### User Profiles
- View user profiles with bio and avatar
- Edit your own profile bio
- Follow/unfollow other users
- View user's playlists

### Playlists
- Create playlists with multiple songs
- View playlist details with songs
- Delete your own playlists
- Like/unlike playlists
- Comment on playlists
- Delete your own comments

### Feed
- View playlists from users you follow
- Empty state when not following anyone
- Quick access to create playlist

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

## License

MIT
