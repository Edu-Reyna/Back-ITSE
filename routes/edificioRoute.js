const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const edificioController = require('../controllers/edificioController');

router.post('/edificio', upload.single('imagen_edificio'), edificioController.crearEdificio);

router.post('/edificio/:id/lugar', upload.single('imagen_lugar'), edificioController.crearLugar);

router.get('/edificio', edificioController.obtenerEdificiosPorFiltros);

module.exports = router;