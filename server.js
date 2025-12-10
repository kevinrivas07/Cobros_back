require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loanRoutes = require('./Routes/loanRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', loanRoutes);

let isConnected = false;

module.exports = async (req, res) => {

  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  }

  return app(req, res);
};
