import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/register', formData);
            console.log(res.data); // handle success
        } catch (err) {
            console.error(err.response.data); // handle error
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="username" value={username} onChange={onChange} required />
            <input type="email" name="email" value={email} onChange={onChange} required />
            <input type="password" name="password" value={password} onChange={onChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
