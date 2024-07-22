// src/components/CommentList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`/api/comments/${postId}`);
            setComments(response.data);
        };
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/comments/${postId}`, { content });
            setComments([...comments, response.data]);
            setContent('');
        } catch (error) {
            alert('Error posting comment');
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            {comments.map(comment => (
                <div key={comment._id} className="comment">
                    <p>{comment.content} - by {comment.userId.username}</p>
                </div>
            ))}
            {user && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    <button type="submit" className="btn btn-primary">Post Comment</button>
                </form>
            )}
        </div>
    );
};

export default CommentList;
