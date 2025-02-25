import React, { useState, useEffect, process } from 'react';
import PlayerCard from './PlayerCard.jsx';

function PlayerList({ onFavoriteToggle, favoritePlayers }) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filtering state
    const [searchQuery, setSearchQuery] = useState('');
    const [teamFilter, setTeamFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5105";

fetch(`${API_URL}/players`)


    useEffect(() => {
        fetch(`${API_URL}/players`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPlayers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching players:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    // Filtering logic
    const filteredPlayers = players.filter(player => {
        const matchesSearch = player.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              player.secondName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTeam = teamFilter ? player.team === teamFilter : true;

        // Price filter as float
        const playerPrice = player.price / 10; // Convert to float price (e.g., 45 → 4.5)
        const matchesMinPrice = minPrice ? playerPrice >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? playerPrice <= parseFloat(maxPrice) : true;

        return matchesSearch && matchesTeam && matchesMinPrice && matchesMaxPrice;
    });

    // Generate unique teams for dropdown
    const uniqueTeams = [...new Set(players.map(player => player.team))];

    return (
        <div className="container mt-4">
            <h2>Filter Players</h2>
            
            {/* Filter Controls */}
            <div className="filter-container">
                <input 
                    type="text" 
                    placeholder="Search by name" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="form-control mb-2"
                />

                <select 
                    value={teamFilter} 
                    onChange={(e) => setTeamFilter(e.target.value)} 
                    className="form-control mb-2"
                >
                    <option value="">All Teams</option>
                    {uniqueTeams.map(team => (
                        <option key={team} value={team}>{team}</option>
                    ))}
                </select>

                <div className="price-filter">
                    <input 
                        type="number" 
                        placeholder="Min Price " 
                        step="0.1"
                        value={minPrice} 
                        onChange={(e) => setMinPrice(e.target.value)} 
                        className="form-control mb-2"
                    />
                    <input 
                        type="number" 
                        placeholder="Max Price" 
                        step="0.1"
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(e.target.value)} 
                        className="form-control mb-2"
                    />
                </div>
            </div>

            {/* Player Cards */}
            <div className="row">
                {filteredPlayers.map(player => (
                    <div key={player.id} className="col-sm-12 col-md-6 col-lg-4">
                        <PlayerCard 
                            player={player} 
                            onFavoriteToggle={onFavoriteToggle} 
                            isFavorite={favoritePlayers.some(fav => fav.id === player.id)} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayerList;
