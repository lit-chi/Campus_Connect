import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import QuestionPage from './components/QuestionPage';
import HoverPanel from './components/HoverPanel';
import EventsPage from './components/EventsPage';
import ResourcesPage from './components/ResourcesPage';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [tagText, setTagText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
        console.log('Fetched questions:', response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handlePostClick = async () => {
    console.log('Posting question:', questionText, 'Posted by:', userId);

    if (!questionText || !userId) {
      console.error('Error posting question: Title and postedBy are required.');
      return;
    }

    const newQuestion = {
      title: questionText,
      tags: tagText.split(' ').filter(tag => tag !== ''),
      postedBy: userId,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/questions', newQuestion);
      setQuestions([...questions, response.data]);
      setQuestionText('');
      setTagText('');
      console.log('Posted question:', response.data);
    } catch (error) {
      console.error('Error posting question:', error.response ? error.response.data : error.message);
    }
  };

  const toggleHoverPanel = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogin = (user) => {
    console.log('User logged in:', user);
    if (user && user.userId) {
      setIsLoggedIn(true);
      setUserId(user.userId);
      setUsername(user.username);
    } else {
      console.error('Login error: Invalid user object');
    }
  };

  return (
    <Router>
      <div className={`App ${isExpanded ? 'hover-active' : ''}`}>
        {isLoggedIn && (
          <div className="hover-panel" onMouseEnter={toggleHoverPanel} onMouseLeave={toggleHoverPanel}>
            <HoverPanel isExpanded={isExpanded} username={username} profilePicture="path/to/profile.jpg" />
          </div>
        )}

        <Routes>
          <Route path="/" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/questions" />} />
          <Route
            path="/questions"
            element={
              isLoggedIn ? (
                <div className="question-area">
                  <div className="post-question card">
                    <input
                      type="text"
                      placeholder="Type your question here..."
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      className="question-input"
                    />
                    <input
                      type="text"
                      placeholder="Tags (space-separated)..."
                      value={tagText}
                      onChange={(e) => setTagText(e.target.value)}
                      className="tags-input"
                    />
                    <button className="post-question-button" onClick={handlePostClick}>
                      Post
                    </button>
                  </div>

                  <div className="questions-container">
                    {questions.length === 0 && <div className="no-questions">NO QUESTIONS YET</div>}
                    {questions.map((question) => (
                      <Link to={`/questions/${question._id}`} key={question._id} className="card">
                        {question.title}
                        <div className="tags">
                          {question.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/questions/:id" element={isLoggedIn ? <QuestionPage userId={userId} username={username} questions={questions} /> : <Navigate to="/" />} />
          <Route path="/events" element={isLoggedIn ? <EventsPage /> : <Navigate to="/" />} />
          <Route path="/resources" element={isLoggedIn ? <ResourcesPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
