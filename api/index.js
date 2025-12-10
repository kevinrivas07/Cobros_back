const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loanRoutes = require("../Routes/loanRoutes");

const app = express();

// ⬇️ AUTORIZAMOS EL FRONT QUE LLAMA AL BACK
app.use(cors({
  origin: ['https://cobros-front-eta.vercel.app']
}));

app.use(express.json());
app.use("/api", loanRoutes);

// Handler compatible con vercel
module.exports = async (req, res) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  return app(req, res);
};
