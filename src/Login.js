import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const { usernameOrEmail, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            console.log('Login successful, received token:', res.data.token);
            localStorage.setItem('token', res.data.token); // Store the token in local storage
            setError(''); // Clear any previous errors
            history.push('/protected'); // Redirect to the protected page
        } catch (err) {
            console.error('Login error:', err); // Log the entire error
            setError(err.response?.data?.msg || 'Error logging in');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="usernameOrEmail" value={usernameOrEmail} onChange={onChange} required />
            <input type="password" name="password" value={password} onChange={onChange} required />
            <button type="submit">Login</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default Login;
