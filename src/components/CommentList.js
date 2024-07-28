import React, { useEffect, useState } from 'react';
import api from '../api';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await api.get(`/comments/${postId}`);
                setComments(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching comments');
            }
        };

        if (postId) {
            fetchComments();
        } else {
            setError('Post ID is required to fetch comments');
        }
    }, [postId]);

    return (
        <div>
            <h2>Comments</h2>
            {error && <div>{error}</div>}
            <ul>
                {Array.isArray(comments) && comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
