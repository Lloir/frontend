import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginForm = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { usernameOrEmail, password });
            localStorage.setItem('token', res.data.token);
            // Redirect to a protected page or refresh
            navigate('/protected'); // Adjust the route as needed
        } catch (err) {
            setError(err.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <div>{error}</div>}
            <div>
                <label>Username or Email</label>
                <input
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
