import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
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
                            {!token && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            )}
                            {token && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create-post">Add Build</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
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
