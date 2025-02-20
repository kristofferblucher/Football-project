import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Navbar from "./components/Navbar.jsx"; 
import PlayerList from "./components/PlayersList.jsx"; 
import PlayerCard from "./components/PlayerCard.jsx";
import PlayerView from "./components/PlayerView.jsx";
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
    const [favoritePlayers, setFavoritePlayers] = useState([]);

    const handleFavoriteToggle = (player) => {
        setFavoritePlayers((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some(fav => fav.id === player.id);
            if (isAlreadyFavorite) {
                return prevFavorites.filter(fav => fav.id !== player.id);
            } else {
                return [...prevFavorites, player];
            }
        });
    };

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/players" 
                    element={
                        <PlayerList 
                            onFavoriteToggle={handleFavoriteToggle} 
                            favoritePlayers={favoritePlayers} 
                        />
                    } 
                />
                <Route 
                    path="/favorites" 
                    element={
                        <div className="container mt-4">
                            <h1>Favorite Players</h1>
                            <div className="row">
                                {favoritePlayers.map(player => (
                                    <div key={player.id} className="col-sm-12 col-md-6 col-lg-4">
                                        <PlayerCard 
                                            player={player} 
                                            onFavoriteToggle={handleFavoriteToggle} 
                                            isFavorite={true} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    } 
                />
                <Route path="/player-view" element={<PlayerView />} />
            </Routes>
        </div>
    );
}

export default App;