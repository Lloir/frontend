import React, { useState, useEffect } from 'react';
import api from '../api';

const ProtectedPage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await api.get('/protected');
                setMessage(response.data.message);
            } catch (err) {
                console.error('Error fetching protected message:', err);
            }
        };
        fetchMessage();
    }, []);

    return (
        <div>
            <h1>Protected Page</h1>
            <p>{message}</p>
        </div>
    );
};

export default ProtectedPage;
