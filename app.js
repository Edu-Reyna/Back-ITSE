const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const edificioRoute = require('./routes/edificioRoute');
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware básico
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configuración de CORS (¡Antes de las rutas!)
app.use(cors({
  origin: 'http://13.218.175.60', // URL de tu frontend Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Rutas
app.use('/ITSE', edificioRoute); // Esta línea DEBE ir después de CORS

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));