// src/components/AddBuild.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { refreshCsrfToken } from '../api';
import Papa from 'papaparse';

const AddBuild = ({ onBuildAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postClass, setPostClass] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [media, setMedia] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');
    const [error, setError] = useState('');
    const [classOptions, setClassOptions] = useState([]);
    const [specializationOptions, setSpecializationOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshCsrfToken();
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            console.log('Fetching class data...');
            const classData = await fetch('/class_data.csv');
            const classText = await classData.text();
            console.log('Class data fetched:', classText);

            console.log('Fetching specialization data...');
            const specializationData = await fetch('/specialization_data.csv');
            const specializationText = await specializationData.text();
            console.log('Specialization data fetched:', specializationText);

            const classResults = Papa.parse(classText, { header: true });
            const specializationResults = Papa.parse(specializationText, { header: true });

            console.log('Parsed class data:', classResults);
            console.log('Parsed specialization data:', specializationResults);

            setClassOptions(classResults.data.map(item => item.name));
            setSpecializationOptions(specializationResults.data.map(item => item.name));
        } catch (err) {
            console.error('Error fetching CSV data:', err);
            setError('Error fetching class and specialization data');
        }
    };

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('class', postClass);
            if (specialization) formData.append('specialization', specialization);
            if (youtubeLink) formData.append('youtubeLink', youtubeLink);

            for (let i = 0; i < media.length; i++) {
                if (media[i].size > MAX_FILE_SIZE) {
                    setError('File size exceeds the limit of 5 MB.');
                    return;
                }
                formData.append('media', media[i]);
            }

            const res = await api.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onBuildAdded(res.data);
            navigate('/'); // Redirect to main page after successful submission
        } catch (err) {
            console.error('Error adding build:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error adding build');
        }
    };

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        setMedia(imageFiles);
        if (files.length !== imageFiles.length) {
            setError('Only image files are allowed.');
        } else {
            setError('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Build</h2>
            {error && <div>{error}</div>}
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Class</label>
                <select
                    value={postClass}
                    onChange={(e) => setPostClass(e.target.value)}
                    required
                >
                    <option value="">Select Class</option>
                    {classOptions.map((classOption) => (
                        <option key={classOption} value={classOption}>
                            {classOption}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Specialization (Optional)</label>
                <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                >
                    <option value="">Select Specialization</option>
                    {specializationOptions.map((specializationOption) => (
                        <option key={specializationOption} value={specializationOption}>
                            {specializationOption}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Media (Optional)</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMediaChange}
                />
            </div>
            <div>
                <label>YouTube/Video Link (Optional)</label>
                <input
                    type="text"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                />
            </div>
            <button type="submit">Add Build</button>
        </form>
    );
};

export default AddBuild;
