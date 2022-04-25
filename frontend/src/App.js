import './App.css';
import { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tracks from './Components/Tracks';
import Albums from './Components/Albums';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/tracks" element={<Tracks />}></Route>
          <Route path="/albums" element={<Albums />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
