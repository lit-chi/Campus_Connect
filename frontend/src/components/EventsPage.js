import React, { useEffect, useState } from 'react';
import './EventsPage.css';
import { fetchEvents } from '../api'; // Import the fetchEvents function

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetchEvents(); // Call the API function to fetch events
        setEvents(response.data); // Set the events in the state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents(); // Fetch the events when component mounts
  }, []);

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <div className="events-container">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <img src={event.image} alt={`Event ${event._id}`} className="event-image" />
              <div className="vertical-line"></div>
              <div className="event-description">
                {event.description}
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p> // Display message if there are no events
        )}
      </div>
    </div>
  );
};

export default EventsPage;
