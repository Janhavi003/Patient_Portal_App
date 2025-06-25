
import React, { useEffect, useState } from 'react';
import API from '../api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/bookings').then(res => setBookings(res.data));
  }, []);

  const downloadReport = async (bookingId) => {
    try {
      const response = await API.get(`/bookings/report/${bookingId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Lab-Report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch {
      alert('Failed to download report.');
    }
  };

  return (
    <div className="content-container">
      <h2>Your Bookings</h2>
      <ul className="card-list">
        {bookings.map((booking) => (
          <li key={booking._id} className="card">
            <h3>{booking.test.name}</h3>
            <p>Booked on: {new Date(booking.date).toLocaleDateString()}</p>
            <button onClick={() => downloadReport(booking._id)}>Download Report</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
