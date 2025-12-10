require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loanRoutes = require('./Routes/loanRoutes');

let app;
let mongoConnected = false;

module.exports = async (req, res) => {
  try {
    // Inicializar app solo una vez
    if (!app) {
      app = express();

      app.use(cors({
        origin: "https://cobros-front-eta.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
      }));

      app.use(express.json());
      app.use("/api", loanRoutes);
    }

    // Conectar solo una vez
    if (!mongoConnected) {
      await mongoose.connect(process.env.MONGO_URI);
      mongoConnected = true;
      console.log("Conexión inicializada con MongoDB");
    }

    return app(req, res);

  } catch (error) {
    console.error("ERROR SERVERLESS =>", error);

    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message
    });
  }
};
