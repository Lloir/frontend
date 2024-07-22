// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';

const PostList = ({ posts }) => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('/api/posts');
            setPostList(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="container">
            {postList.map(post => (
                <div key={post._id} className="post card p-3 mb-3">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Class: {post.class}</p>
                    <p>Specialization: {post.specialization}</p>
                    <p>Posted by: {post.userId.username}</p>
                    {post.images.map(image => (
                        <img key={image} src={`/${image}`} alt="Post media" className="img-fluid" />
                    ))}
                    {post.videos.map(video => (
                        <video key={video} controls className="img-fluid">
                            <source src={`/${video}`} type="video/mp4" />
                        </video>
                    ))}
                    <CommentList postId={post._id} />
                </div>
            ))}
        </div>
    );
};

export default PostList;
