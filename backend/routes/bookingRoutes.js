const express = require('express');
const router = express.Router();
const { createBooking, getBookings, downloadReport } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);
router.get('/report/:bookingId', protect, downloadReport);

module.exports = router;
