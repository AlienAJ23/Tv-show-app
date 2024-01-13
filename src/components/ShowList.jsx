import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ShowList.css';

const API_URL = 'https://api.tvmaze.com/search/shows?q=all';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setShows(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='show-list-container'>
      <h1>Show List</h1>
      <ul>
        {shows.map(show => (
          <li key={show.show.id}>
            <Link to={`/show/${show.show.id}`}>
              {show.show.name} - {show.show.premiered}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
