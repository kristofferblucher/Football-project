import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PlayerList from "./components/PlayersList.jsx";
import PlayerCard from "./components/PlayerCard.jsx";
import PlayerView from "./components/PlayerView.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Fantasy Premier League Helper-App</h1>
      <img
        src="/images/premier-league-icon.png"
        alt="Premier League Icon"
        className="home-image"
      />
    </div>
  );
}

function App() {
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  // Load favorites from localStorage when the app loads
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favoritePlayers")) || [];
      console.log("Loaded favorites from localStorage:", storedFavorites);
      setFavoritePlayers(storedFavorites);
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  // Update localStorage whenever favoritePlayers changes
  useEffect(() => {
    if (favoritePlayers.length > 0) {
      console.log("Saving favorites to localStorage:", favoritePlayers);
      localStorage.setItem("favoritePlayers", JSON.stringify(favoritePlayers));
    }
  }, [favoritePlayers]);

  const handleFavoriteToggle = (player) => {
    setFavoritePlayers((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (fav) => fav.id === player.id
      );
      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== player.id);
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
                {favoritePlayers.map((player) => (
                  <div
                    key={player.id}
                    className="col-sm-12 col-md-6 col-lg-4"
                  >
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
        <Route path="/player-view/:id" element={<PlayerView />} />
        <Route path="*" element={<Home />} /> {/* Catch-all route */}
      </Routes>
    </div>
  );
}

export default App;
