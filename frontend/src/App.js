import './App.css';
import React from 'react'
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
