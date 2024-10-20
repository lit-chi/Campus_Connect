import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HoverPanel.css'; // Ensure you have the styles in a separate CSS file

const HoverPanel = () => {
  const [isHoverPanelOpen, setIsHoverPanelOpen] = useState(false);

  return (
    <div
      className={`hover-panel ${isHoverPanelOpen ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHoverPanelOpen(true)}
      onMouseLeave={() => setIsHoverPanelOpen(false)}
    >
      <div className="profile">
        <img src="profile-pic-url.jpg" alt="Profile" className="profile-pic" />
      </div>

      {isHoverPanelOpen && (
        <>
          <div className="divider" />
          <div className="menu">
            <Link to="/" className="menu-item">Questions</Link>
            <div className="menu-divider" />
            <Link to="/resources" className="menu-item">Resources</Link>
            <div className="menu-divider" />
            <Link to="/events" className="menu-item">Events</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HoverPanel;