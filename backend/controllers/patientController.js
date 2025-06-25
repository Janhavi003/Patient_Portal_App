const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await Patient.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const patient = await Patient.create({ name, email, password });
    res.json({ token: generateToken(patient._id), name: patient.name, email: patient.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient || !(await patient.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: generateToken(patient._id), name: patient.name, email: patient.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
