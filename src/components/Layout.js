// src/components/Layout.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Orna Builds</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {user ? (
                                <>
                                    {user.isAdmin && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin">Admin Panel</Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/user">User Panel</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add-build">Add Build</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/privacy">Privacy</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Layout;
