import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Calendar() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setResults(response.data);
      setFilteredResults(response.data); // Initialize filteredResults with all data
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update filteredResults when searchQuery changes
  useEffect(() => {
    const filteredData = results.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filteredData);
  }, [searchQuery, results]);

  return (
    <div>
      <p>Search Results</p>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <p>Here is the Fetched Data:</p>
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <ul>
          {filteredResults.map(item => (
            <li key={item.id}>
              <User title={item.title} userId={item.userId} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Assuming you have a User component for displaying user information
function User({ title, userId }) {
  return (
    <div>
      <p>Title: {title}</p>
    </div>
  );
}

export default Calendar;
