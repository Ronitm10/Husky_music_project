import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tracks from "./Components/Tracks";
import Albums from "./Components/Albums";
import Login from "./Components/Login/Login";
import { Container } from "react-bootstrap";
import NVbar from "./Components/NVbar";
import useToken from "./useToken";
import Album from "./Components/Album";
import Playlist from "./Components/Playlist";
import Home from "./Components/Home/Home"
import Signup from "./Components/Signup/Signup"
import SignupSuccess from "./Components/Signup/SignupSuccess";
import ProtectedRoute from "./Components/ProtectedRoute";




function App() {
  const { token, setToken } = useToken()
  return (
    <div className="main">
      <NVbar />
      <Routes>
        <Route path="/" element={<Login setToken={setToken} token={token} />} />
        <Route path="/signupSuccess" element={<SignupSuccess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tracks"
          element={
            <ProtectedRoute>
              <Tracks />
            </ProtectedRoute>
          } />
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
        <Route path="/playlist"
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          } />
        <Route path="/playlist/:id"
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          } />
      </Routes>
    </div >
  );
}

export default App;
