import React, { useState } from 'react';
import api from '../api';

const AddComment = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/posts/${postId}/comments`, { content });
            onCommentAdded(res.data);
            setContent('');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error adding comment');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Comment</h2>
            {error && <div>{error}</div>}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Comment"
                required
            />
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default AddComment;
