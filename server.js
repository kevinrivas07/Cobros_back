require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loanRoutes = require('./Routes/loanRoutes');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS dinámica
const allowedOrigins = [
  "http://localhost:5173", 
  "https://cobros-front-eta.vercel.app/" // Tu URL de Vercel
];


app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como herramientas de testeo)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS: Este origen no está permitido'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true // Útil si planeas usar cookies o tokens en el futuro
}));

app.use(express.json());
app.use("/api", loanRoutes);
app.use('/api/auth', authRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Servidor local corriendo en http://localhost:${PORT}`);
      });
    }
  })
  .catch(err => {
    console.error("Error MongoDB:", err);
  });

// Exportar para Vercel (Importante para que funcione como serverless function)
module.exports = app;