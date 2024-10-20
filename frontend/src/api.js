// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Point to your backend on port 5000

export const loginUser = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};

export const fetchQuestions = async () => {
  return await axios.get(`${API_URL}/questions`);
};

export const postQuestion = async (questionData) => {
  return await axios.post(`${API_URL}/questions`, questionData);
};

// New function to fetch events
export const fetchEvents = async () => {
  return await axios.get(`${API_URL}/events`);
};


export const fetchResources = async () => {
  try {
    const response = await axios.get('/resources'); // Make sure the URL matches your backend
    return response; // Return the entire response
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error; // Rethrow the error for further handling in the calling function
  }
};
