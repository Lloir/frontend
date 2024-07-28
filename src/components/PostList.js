import React, { useState, useEffect } from 'react';
import api from '../api';
import CommentList from './CommentList';

const PostList = ({ posts }) => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPostList(response.data);
            } catch (err) {
                console.error('Error fetching posts:', err.response?.data || err.message);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="container">
            {postList.map(post => (
                <div key={post.id} className="post card p-3 mb-3">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Class: {post.class}</p>
                    <p>Specialization: {post.specialization}</p>
                    <p>Posted by: {post.user?.username}</p>
                    {post.images && post.images.map(image => (
                        <img key={image} src={`/${image}`} alt="Post media" className="img-fluid" />
                    ))}
                    {post.videos && post.videos.map(video => (
                        <video key={video} controls className="img-fluid">
                            <source src={`/${video}`} type="video/mp4" />
                        </video>
                    ))}
                    <CommentList postId={post.id} />
                </div>
            ))}
        </div>
    );
};

export default PostList;
