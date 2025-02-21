import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';

function PlayerCard({ player, onFavoriteToggle, isFavorite }) {

    const teamName = player.team;
    const teamLogoPath = `/images/PL-Logos/${teamName}.png`;

    const playerImageUrl = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo.replace('.jpg', '.png')}`;

    return (
        <div className="card custom-card mb-3" style={{ maxWidth: '540px' }}>
            <div>
                <div className="player-image-container">
                    <img src={playerImageUrl} alt={player.name} className="player-image" />
                </div>
                <div className="team-logo-container">
                    <img src={teamLogoPath} alt={player.team} className="team-logo" />
                </div>
                
                <div className="card-body">
                    <h5 id="id-card-title">{player.firstName} {player.secondName}</h5>
                    <div className='card-text-container'>
                        <p className="card-text"><strong>Price:</strong> £{player.price / 10}m</p>
                        <p className="card-text"><strong>Total Points:</strong> {player.totalPoints}</p>
                        <p className="card-text"><strong>Goals:</strong> {player.goals}</p>
                        <p className="card-text"><strong>Assists:</strong> {player.assists}</p>
                        
                        
                    </div>

                    <Link to={`/player-view/${player.id}`} state={{ player }}>
                        <Button variant="secondary" className="button-player-view">
                            Player View
                        </Button>
                    </Link>

                    <button 
                        className="favorite-btn"
                        onClick={() => onFavoriteToggle(player)}
                        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    >
                        <FaStar 
                            size={24} 
                            color={isFavorite ? "#ffc107" : "#ddd"} 
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;
