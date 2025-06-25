const mongoose = require('mongoose');
const Test = require('./models/Test');
const { connectDB } = require('./config/db');
require('dotenv').config();

const seedTests = async () => {
  await connectDB();
  await Test.deleteMany();

  await Test.insertMany([
    { name: "Complete Blood Count", description: "Measures different components of blood", price: 30 },
    { name: "Liver Function Test", description: "Assesses liver health", price: 45 },
    { name: "Thyroid Panel", description: "Evaluates thyroid function", price: 40 }
  ]);

  console.log("Test catalog seeded.");
  process.exit();
};

seedTests();
