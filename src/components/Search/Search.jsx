import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);

  useEffect(() => {
    // Fetch class details from the server
    axios.get('http://localhost:5000/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  useEffect(() => {
    // Filter classes based on the search term
    const filtered = classes.filter(cls =>
      cls.name && cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClasses(filtered);
  }, [searchTerm, classes]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // If the input is empty, reset the filtered classes
    if (input.trim() === '') {
      setFilteredClasses([]);
    }
  };

  return (
    <div>
      <input
      className='SearchInput'
        type="text"
        placeholder="Search for classes..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && filteredClasses.length > 0 && (
        <div className="SearchResults">
          {filteredClasses.map(cls => (
            <div key={cls._id}>{cls.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
