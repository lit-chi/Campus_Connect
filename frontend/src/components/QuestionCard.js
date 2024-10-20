import React from 'react';

function QuestionCard({ question, isPostCard }) {
  if (isPostCard) {
    return (
      <div className="card post-question">
        <button className="post-question-button">Post Question</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{question.text}</h3>
      <p>Tags: {question.tags.join(', ')}</p>
    </div>
  );
}

export default QuestionCard;
