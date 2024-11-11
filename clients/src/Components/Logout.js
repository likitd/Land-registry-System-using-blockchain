import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user data from local storage and reset login state
        localStorage.removeItem('user');
        setIsLoggedIn(false);

        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate('/login');
        }, 2000); // 2-second delay for a smoother experience
    }, [navigate, setIsLoggedIn]);

    return (
        <div className="logout-container">
            <h2 className="logout-message">Logging out...</h2>
            <div className="spinner"></div>
        </div>
    );
};

export default Logout;
