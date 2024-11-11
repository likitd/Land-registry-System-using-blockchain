import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = ({ isLoggedIn }) => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                {!isLoggedIn ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signin">Sign Up</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">Profile</Link></li>
                        <li><Link to="/userpage">User Page</Link></li>
                        <li><Link to="/make_convention">Make Convention</Link></li>
                        <li><Link to="/make_transfer">Make Transfer</Link></li>
                        {/* <li><Link to="/landofficer">Land Officer</Link></li> */} {/* Removed Land Officer */}
                        <li><Link to="/landforsale">Land for Sale</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
