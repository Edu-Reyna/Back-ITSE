const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const edificioController = require('../controllers/edificioController');

router.post('/Escuelas', upload.single('imagen_edificio'), edificioController.crearEdificio);

router.post('/Escuelas/:id/lugar', upload.single('imagen_lugar'), edificioController.crearLugar);

router.get('/Escuelas', edificioController.obtenerEdificiosPorFiltros);

module.exports = router;