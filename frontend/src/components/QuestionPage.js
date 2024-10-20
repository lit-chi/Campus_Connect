import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './QuestionPage.css';
import '../App.css';
import HoverPanel from './HoverPanel'; // Import HoverPanel

const QuestionPage = ({ questions, userId, username }) => {
  const { id } = useParams(); // Get the question ID from the URL
  const question = questions.find((q) => q._id === id); // Find the question by ID
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isHoverPanelOpen, setIsHoverPanelOpen] = useState(false); // State to handle hover panel

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/answers/${id}`);
        setAnswers(response.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers(); // Fetch answers when the component mounts
  }, [id]);

  const handlePostAnswer = async () => {
    if (answer.trim()) {
      const newAnswer = {
        questionId: id, // Use the extracted question ID
        postedBy: username, // Use the username instead of userId
        text: answer,
      };
  
      try {
        const response = await axios.post('http://localhost:5000/api/answers', newAnswer);
        setAnswers([...answers, response.data]); // Add the new answer to the state
        setAnswer(''); // Clear the input field
      } catch (error) {
        console.error('Error posting answer:', error);
      }
    }
  };

  return (
    <div className={`App ${isHoverPanelOpen ? 'hover-active' : ''}`}>
      <div
        className={`hover-panel ${isHoverPanelOpen ? 'expanded' : ''}`}
        onMouseEnter={() => setIsHoverPanelOpen(true)}
        onMouseLeave={() => setIsHoverPanelOpen(false)}
      >
        <HoverPanel isExpanded={isHoverPanelOpen} username={username} profilePicture="path/to/profile.jpg" />
      </div>

      <div className="question-page">
        {question ? (
          <div className="question-container">
            <div className={`question-card card ${isHoverPanelOpen ? 'scaled' : ''}`}>
              <h2>{question.title}</h2> {/* Use question.title for the title */}
              <div className="tags">
                {question.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className={`post-answer card ${isHoverPanelOpen ? 'scaled' : ''}`}>
              <input 
                type="text" 
                placeholder="Type your answer here..." 
                className="answer-input" 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button className="post-answer-button" onClick={handlePostAnswer}>
                Post Answer
              </button>
              <div className="posted-by">Posted by: {username}</div> {/* Display the current user's username */}
            </div>
            <div className="answers-container">
              {answers.length > 0 ? (
                answers.map((ans, index) => (
                  <div key={index} className={`answer-card card ${isHoverPanelOpen ? 'scaled' : ''}`}>
                    <div className="posted-by">Posted by: {ans.username || ans.postedBy}</div> {/* Display the username or ID of the person who answered */}
                    <hr className="answer-divider" />
                    <div className="answer-text">{ans.text}</div>
                  </div>
                ))
              ) : (
                <div className="no-answers">NO ANSWERS YET</div>
              )}
            </div>
          </div>
        ) : (
          <div>Question not found</div>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
