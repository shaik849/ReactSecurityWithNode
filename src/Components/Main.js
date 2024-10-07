import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    useEffect(() => {
        // Check if token exists and is valid
        const token = localStorage.getItem('token');
        if (token) {
            // You can add logic here to check if the token is valid and not expired
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <Home onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default Main;
