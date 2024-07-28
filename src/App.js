// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import SearchBar from './components/SearchBar';
import Layout from './components/Layout';
import TierTabs from './components/TierTabs';
import ProtectedPage from './components/ProtectedPage';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import PrivacyPolicy from './components/PrivacyPolicy';
import AddBuild from './components/AddBuild';
import api from './api';

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/posts');
                console.log('Fetched posts:', res.data);
                setPosts(res.data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };
        fetchPosts();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <SearchBar />
                    <Routes>
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/create-post" element={<PostForm />} />
                        <Route path="/add-build" element={<AddBuild />} /> {/* Ensure this route exists */}
                        <Route path="/protected" element={<ProtectedPage />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/user" element={<UserPanel />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/" element={<TierTabs posts={posts} />} /> {/* Ensure posts are passed */}
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;
