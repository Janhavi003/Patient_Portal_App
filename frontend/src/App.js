import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TestCatalog from './pages/TestCatalog';
import BookingHistory from './pages/BookingHistory';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import './App.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tests" element={<ProtectedRoute><TestCatalog /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
