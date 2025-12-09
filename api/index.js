const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loanRoutes = require("../Routes/loanRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", loanRoutes);

// Handler compatible con vercel
module.exports = async (req, res) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  return app(req, res);
};
