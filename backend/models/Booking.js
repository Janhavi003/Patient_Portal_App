const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
