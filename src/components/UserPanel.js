// src/components/UserPanel.js
import React, { useState } from 'react';
import axios from 'axios';

const UserPanel = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async () => {
        try {
            const res = await axios.post('/api/user/update-password', {
                currentPassword,
                newPassword
            });
            setMessage(res.data.msg);
        } catch (err) {
            setMessage(err.response?.data?.msg || 'Error updating password');
        }
    };

    return (
        <div>
            <h1>User Panel</h1>
            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Change Password</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserPanel;
