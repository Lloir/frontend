// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import SearchBar from './components/SearchBar';
import Layout from './components/Layout';
import TierTabs from './components/TierTabs';

const App = () => {
    const [posts, setPosts] = useState([]);

    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <SearchBar setPosts={setPosts} />
                    <Routes>
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/create-post" element={<PostForm />} />
                        <Route path="/" element={<TierTabs posts={posts} />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;
