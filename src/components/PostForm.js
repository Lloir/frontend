// src/components/PostForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [postClass, setPostClass] = useState('');
    const [specialization, setSpecialization] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('class', postClass);
        formData.append('specialization', specialization);
        media.forEach(file => formData.append('media', file));

        try {
            await axios.post('/api/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Post created successfully');
        } catch (error) {
            alert('Error creating post');
        }
    };

    const handleFileChange = (e) => {
        setMedia([...e.target.files]);
    };

    if (!user) return <p>You need to log in to create a post.</p>;

    return (
        <div className="card p-4">
            <h2 className="mb-4">Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Class</label>
                    <input
                        type="text"
                        className="form-control"
                        value={postClass}
                        onChange={(e) => setPostClass(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Specialization</label>
                    <input
                        type="text"
                        className="form-control"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Media</label>
                    <input
                        type="file"
                        className="form-control-file"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    );
};

export default PostForm;
