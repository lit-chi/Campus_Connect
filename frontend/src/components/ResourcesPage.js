import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResourcesPage.css';

const ResourcesPage = () => {
    const [resources, setResources] = useState([]);
    const [error, setError] = useState('');

    const fetchResources = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/resources');
            setResources(response.data);
        } catch (error) {
            setError('Error fetching resources');
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    return (
        <div className="resources-page">
            <h2>Available Resources</h2>
            {error && <div>{error}</div>}
            <div className="resources-container">
                {resources.length > 0 ? (
                    resources.map((resource) => (
                        <div className="resource-card" key={resource._id}>
                            <h3>{resource.title}</h3>
                            <p>{resource.description}</p>
                            <a href={resource.url} download>
                                <button className="download-button">Download</button>
                            </a>
                        </div>
                    ))
                ) : (
                    <div>No resources available.</div>
                )}
            </div>
        </div>
    );
};

export default ResourcesPage;
