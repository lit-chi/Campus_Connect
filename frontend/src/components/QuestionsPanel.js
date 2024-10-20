import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const QuestionPage = ({ userId, questions }) => {
  const { id } = useParams(); // Get the question ID from the URL
  const question = questions.find(q => q._id === id); // Find the question by ID
  const [answerText, setAnswerText] = useState(''); // State for answer text

  const handlePostAnswer = async () => {
    const newAnswer = {
      answerText,
      postedBy: userId, // Use the logged-in user's ID
      questionId: id, // Link the answer to the question
    };

    // Post the new answer to the server
    // Ensure you implement the posting logic in your backend
    console.log('Posting answer:', newAnswer);
    
    // Clear the answer input after posting
    setAnswerText('');
  };

  if (!question) {
    return <div>Question not found!</div>; // Handle case where question is not found
  }

  return (
    <div className="question-page">
      <div className="question-card">
        <h2>{question.title}</h2>
        <div className="tags">
          {question.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <p>Posted by User ID: {question.postedBy}</p>
      </div>

      <div className="post-answer">
        <h3>Post an Answer</h3>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Type your answer here..."
        />
        <button onClick={handlePostAnswer}>Submit Answer</button>
      </div>
    </div>
  );
};

export default QuestionPage;





