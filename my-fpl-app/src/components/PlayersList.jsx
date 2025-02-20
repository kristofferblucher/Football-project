import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard.jsx';


function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5105/players")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response)
                return response.json();
                
            })
            .then(data => {
                setPlayers(data);
                setLoading(false);
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching players:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
      <div className="container mt-4">
          <div className="row">
              {players.map(player => (
                  <div key={player.id} className="col-sm-12 col-md-6 col-lg-4">
                      <PlayerCard player={player} />
                  </div>
              ))}
          </div>
      </div>
  );
}


export default PlayerList;
