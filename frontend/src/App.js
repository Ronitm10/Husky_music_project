import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tracks from './Components/Tracks';
import Albums from './Components/Albums';
import ArtistProfile from './Components/Artist/ArtistProfile';
import ArtistEdit from './Components/Artist/ArtistEdit';
import AllArtist from './Components/Artist/AllArtist';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/tracks" element={<Tracks />}></Route>
          <Route path="/albums" element={<Albums />}></Route>
          <Route path="/artistProfile" element={<ArtistProfile />}></Route>
          <Route path="/artistEdit" element={<ArtistEdit />}></Route>
          <Route path="/allArtist" element={<AllArtist />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
