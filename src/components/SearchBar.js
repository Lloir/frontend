// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setPosts }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/posts/search', {
                params: { query }
            });
            setPosts(response.data);
        } catch (error) {
            alert('Error searching posts');
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-4">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search builds..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );
};

export default SearchBar;
