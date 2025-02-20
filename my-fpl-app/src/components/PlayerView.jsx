import React from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../app.css";

function PlayerView() {
    const location = useLocation();
    const { player } = location.state || {};

    if (!player) {
        return (
            <div className="player-view-container">
                <h1>No Player Selected</h1>
                <Link to="/">
                    <Button variant="secondary">Back to Home</Button>
                </Link>
            </div>
        );
    }

    const playerImageUrl = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo.replace('.jpg', '.png')}`;

    return (
        <div >
            <div className="player-header">
                <h1>{player.firstName} {player.secondName}</h1>
            </div>

            <div className="player-image-container">
                <img src={playerImageUrl} alt={player.firstName} className="player-image-large" />
            </div>

            <div className="player-stats-container">
                <p><strong>Price:</strong> £{player.price / 10}m</p>
                <p><strong>Total Points:</strong> {player.totalPoints}</p>
                <p><strong>Goals:</strong> {player.goals}</p>
                <p><strong>Assists:</strong> {player.assists}</p>
                <p><strong>Team:</strong> {player.team}</p>
            </div>
        </div>
    );
}

export default PlayerView;
