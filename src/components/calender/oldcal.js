import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      // Use your server endpoint to initiate Google Calendar API authentication
      const authResponse = await axios.get('http://localhost:5000/auth');
      console.log('Authentication Response:', authResponse.data);

      // Fetch events using the obtained access token
      const response = await axios.get('http://localhost:5000/fetch-events', {
        headers: {
          Authorization: `Bearer ${authResponse.data.accessToken}`,
        },
      });

      console.log('API Response:', response.data);

      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching events.');
      setLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h3>Google Calendar</h3>

      {loading && <p>Loading events...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='calendar-int'>
        {Array.isArray(events) ? (
          events.map((event) => (
            <div key={event.id}>
              <p>{event.summary}</p>
              <p>{event.start.dateTime}</p>
              {/* Add other event details as needed */}
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}

export default Calendar;
