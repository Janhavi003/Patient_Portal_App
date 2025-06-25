// src/pages/TestCatalog.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const TestCatalog = () => {
  const [tests, setTests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/tests').then(res => setTests(res.data));
  }, []);

  const bookTest = async (testId) => {
    try {
      await API.post('/bookings', { testId });
      setMessage('Booking successful!');
    } catch (err) {
      setMessage('Booking failed.');
    }
  };

  return (
    <div className="content-container">
      <h2>Available Lab Tests</h2>
      {message && <p>{message}</p>}
      <ul className="card-list">
        {tests.map((test) => (
          <li key={test._id} className="card">
            <h3>{test.name}</h3>
            <p>{test.description}</p>
            <p><strong>${test.price}</strong></p>
            <button onClick={() => bookTest(test._id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCatalog;
