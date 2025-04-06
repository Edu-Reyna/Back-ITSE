const express = require('express');
const connectDB = require('./config/db');
const edificioRoute = require('./routes/edificioRoute');
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/ITSE', edificioRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
