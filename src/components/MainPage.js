import React, { useState, useEffect } from 'react';
import api from '../api';
import AddBuild from './AddBuild';
import AddComment from './AddComment';

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/posts');
                setPosts(res.data);
            } catch (err) {
                setError(err.response?.data?.msg || 'Error fetching posts');
            }
        };

        fetchPosts();
    }, []);

    const handleBuildAdded = (newBuild) => {
        setPosts((prevPosts) => [...prevPosts, newBuild]);
    };

    const handleCommentAdded = (postId, newComment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
            )
        );
    };

    return (
        <div>
            {error && <div>{error}</div>}
            {token && <AddBuild onBuildAdded={handleBuildAdded} />}
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {token && <AddComment postId={post.id} onCommentAdded={(comment) => handleCommentAdded(post.id, comment)} />}
                    <div>
                        {post.comments && post.comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainPage;
