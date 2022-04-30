import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Albums from "./Components/Albums/Albums";
import Login from "./Components/Login/Login";
import { Container } from "react-bootstrap";
import NVbar from "./Components/NVbar";
import useToken from "./useToken";
import Album from "./Components/Albums/Album";
import Playlists from "./Components/Playlists/Playlists";
import Playlist from "./Components/Playlists/Playlist";
import Signup from "./Components/Signup/Signup"
import SignupSuccess from "./Components/Signup/SignupSuccess";
import ProtectedRoute from "./Components/ProtectedRoute";
import LikedTracks from "./Components/LikedTracks/LikedTracks";
import ArtistDash from "./Components/ArtistDash/ArtistDash";
import AllArtist from "./Components/Artist/AllArtist";
import PaymentSuccess from "./Components/Premium/PaymentSuccess";
import Artist from './Components/Artist/Artist'

function App() {
  const { token, setToken } = useToken()
  return (
    <div className="main">
      <NVbar userToken={token} />
      <Routes>
        <Route path="/" element={<Login setToken={setToken} token={token} />} />
        <Route path="/signupSuccess" element={<SignupSuccess />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/paymentFailure" element={<SignupSuccess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/albums"
          element={
            <ProtectedRoute>
              <Albums />
            </ProtectedRoute>
          } />
        <Route path="/albums/:id"
          element={
            <ProtectedRoute>
              <Album />
            </ProtectedRoute>
          } />
        <Route path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          } />
        <Route path="/playlists/:id"
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          } />
        <Route path="/likedTracks"
          element={
            <ProtectedRoute>
              <LikedTracks />
            </ProtectedRoute>
          } />
        <Route path="/allArtist"
          element={
            <ProtectedRoute>
              <AllArtist />
            </ProtectedRoute>
          } />
        <Route path="/artists/:id"
          element={
            <ProtectedRoute>
              <Artist />
            </ProtectedRoute>
          } />

        <Route path="/artistDash"
          element={
            <ProtectedRoute>
              <ArtistDash />
            </ProtectedRoute>
          } />

      </Routes>

    </div >

  );
}

export default App;
