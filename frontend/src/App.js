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
import AdminHome from "./Components/Admin/AdminHome";
import Artist from "./Components/Artist/Artist";
import AllArtist from "./Components/Artist/AllArtist";


function App() {
  // const { token, setToken } = useToken(); //Calling the custom hook for auth

  // console.log("token in app.js", token);
  //no token, no login
  // if (!token) {
  //   return (
  //     <div>
  //       <NVbar />
  //       <Login setToken={setToken} />
  //     </div>
  //   )
  // }
  return (
    <div>
      <NVbar />
      <Router>
        <Routes>
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:id" element={<Album />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/allArtist" element={<AllArtist />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
