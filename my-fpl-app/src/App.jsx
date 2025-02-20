import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"; // Ensure the import path is correct
import PlayerList from "./components/PlayersList.jsx"; // Make sure the file name is correct, it should be PlayerList if the file is named PlayerList.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function Home() {
  return( 
  <div className="home-container">
  <h1>Welcome to the Fantasy Premier League Helper-App</h1>
  <img src="/images/premier-league-icon.png" alt="Premier League Icon" className="home-image" />
  </div>

  )
  }

function App() {
  return (
      <div>
        <Navbar />  {/* This will render the Navbar component at the top */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/players" element={<PlayerList />} /> {/* Players route */}
        </Routes>
      </div>
    
  );
}

export default App;
