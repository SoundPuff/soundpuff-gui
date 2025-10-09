# SoundPuff 🎵

A social music platform where users can share their playlists, like and comment on others' music collections, and follow other users.

## Features

✨ **User Profiles**
- Custom bio and avatar (emoji-based)
- View follower/following counts
- Edit profile information
- View user's playlists

🎵 **Playlist Management**
- Create new playlists with name and description
- Add/remove songs from playlists
- Edit existing playlists
- Delete playlists
- View playlist details with full song list

👥 **Social Features**
- Follow/unfollow other users
- View feed of playlists from followed users
- Like playlists
- Comment on playlists
- View other users' profiles

🔍 **Search Functionality**
- Search for songs by title or artist
- Search for users by name or username
- Search for playlists by name or description
- Real-time search results

🎨 **Responsive Design**
- Desktop-optimized layout
- Clean, modern UI
- Intuitive navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SoundPuff/soundpuff-gui.git
cd soundpuff-gui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
soundpuff-gui/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar with search
│   │   └── PlaylistCard.js    # Reusable playlist card component
│   ├── context/
│   │   └── DataContext.js     # Global state management and mock data
│   ├── pages/
│   │   ├── Feed.js            # Feed page showing followed users' playlists
│   │   ├── Explore.js         # Explore all playlists
│   │   ├── Profile.js         # Current user's profile
│   │   ├── UserProfile.js     # View other users' profiles
│   │   ├── PlaylistDetail.js  # View playlist details
│   │   ├── PlaylistForm.js    # Create/edit playlists
│   │   └── Search.js          # Search results page
│   ├── App.css                # Global styles
│   ├── App.js                 # Main app component with routing
│   └── index.js               # Entry point
├── package.json
└── README.md
```

## Usage

### Creating a Playlist

1. Navigate to your profile page
2. Click "Create Playlist"
3. Enter a name and description
4. Search and add songs to your playlist
5. Click "Create Playlist" to save

### Following Users

1. Use the search bar to find users
2. Click on a user's name to view their profile
3. Click "Follow" to follow them
4. Their playlists will appear in your feed

### Liking and Commenting

1. Navigate to any playlist
2. Click the heart icon to like
3. Type a comment in the comment box and click "Post"

### Editing Your Profile

1. Go to your profile page
2. Click "Edit Profile"
3. Update your avatar (emoji), name, and bio
4. Click "Save Changes"

## Data Persistence

Currently, SoundPuff uses an in-memory data store. All data is reset when the page is refreshed. For production use, this would be connected to a backend API with a database.

## Technologies Used

- **React** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Styling

## Future Enhancements

- Backend API integration
- Real audio playback
- User authentication
- Image upload for avatars
- Playlist sharing
- Music recommendations
- Activity notifications
- Direct messaging

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Created with Create React App
- Icon emojis for visual elements
- Inspired by popular music sharing platforms
