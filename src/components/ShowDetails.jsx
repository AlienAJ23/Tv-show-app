import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ShowDetails.css';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then(response => {
        setShow(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching show details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='show-details-container'>
      <h1>Show Details</h1>
      {show && (
        <div>
          <h2>{show.name}</h2>
          <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
