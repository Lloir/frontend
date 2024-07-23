import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
    const [message, setMessage] = useState('Successfully logged in');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the main page after 2 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);
        return () => clearTimeout(timer); // Clean up the timer
    }, [navigate]);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default ProtectedPage;
