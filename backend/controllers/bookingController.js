const Booking = require('../models/Booking');
const path = require('path');

exports.createBooking = async (req, res) => {
  const { testId } = req.body;
  try {
    const booking = await Booking.create({
      patient: req.user.id,
      test: testId,
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id }).populate('test');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../reports/dummy-report.pdf');
    res.download(filePath, 'Lab-Report.pdf');
  } catch (err) {
    res.status(500).json({ error: 'Report download failed' });
  }
};
