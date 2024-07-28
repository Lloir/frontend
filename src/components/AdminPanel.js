import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPosts(response.data);
            } catch (err) {
                setError('Error fetching posts');
                console.error(err);
            }
        };

        if (user && user.isAdmin) {
            fetchPosts();
        }
    }, [user]);

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`/api/admin/posts/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (err) {
            setError('Error deleting post');
            console.error('Error deleting post:', err);
        }
    };

    if (!user || !user.isAdmin) {
        return <div>Access denied</div>;
    }

    return (
        <div>
            <h1>Admin Panel</h1>
            {error && <div>{error}</div>}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
