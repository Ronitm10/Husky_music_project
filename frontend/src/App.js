<<<<<<< HEAD
import './App.css';
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Tracks from './Components/Tracks';
import Albums from './Components/Albums';
import Login from './Components/Login/Login';
import { Container } from 'react-bootstrap';
import NVbar from './Components/NVbar';
import useToken from './useToken';
import Album from './Components/Album';
import Home from './Components/Home/Home';
=======
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
>>>>>>> 77e7d42b9f6aaf48f40b91e5a80f355dee8bb25c


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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
