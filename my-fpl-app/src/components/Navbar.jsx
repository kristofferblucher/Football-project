import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../App.css'; // Import your custom styles if they are not imported at a higher level

function Navbar() {
    return (
        <nav  className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand header" to="/">Fantasy Premier League Helper-App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/players">Players</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/favorites"> Favorites</Link> 
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
