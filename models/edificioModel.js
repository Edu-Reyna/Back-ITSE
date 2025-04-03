const mongoose = require('mongoose');

const lugarSchema = new mongoose.Schema({
    num_lugar: String,
    imagen_lugar: String,
    video_lugar: String,
    indicaciones: String,
    num_piso: String,
    tipo_lugar: String
});

const edificioSchema = new mongoose.Schema({
    nombre_edificio: String,
    imagen_edificio: String,
    video_edificio: String,
    indicaciones_edificio: String,
    lugares: [lugarSchema]
}, {collection: 'Edificios'});

module.exports = mongoose.model('Edificio', edificioSchema)