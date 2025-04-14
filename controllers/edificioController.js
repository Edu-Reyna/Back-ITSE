const Edificio = require("../models/edificioModel");

exports.crearEdificio = async (req, res) => {
  try {
    const edificio = new Edificio({
      nombre_edificio: req.body.nombre_edificio,
      imagen_edificio: req.file ? req.file.path : "",
      video_edificio: req.body.video_edificio,
      indicaciones_edificio: req.body.indicaciones_edificio,
    });

    await edificio.save();
    res.status(201).json(edificio);
  } catch (error) {
    console.error("Error al crear el edificio:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.crearLugar = async (req, res) => {
  try {
    const edificio = await Edificio.findById(req.params.id);

    edificio.lugares.push({
      num_lugar: req.body.num_lugar,
      imagen_lugar: req.file ? req.file.path : "",
      video_lugar: req.body.video_lugar,
      indicaciones: req.body.indicaciones,
      num_piso: req.body.num_piso,
      tipo_lugar: req.body.tipo_lugar,
    });
    await edificio.save();
    res.status(201).json(edificio);
  } catch (error) {
    console.error("Error al crear el lugar:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerEdificiosPorFiltros = async (req, res) => {
  try {
    const { num_lugar, tipo_lugar, num_piso } = req.query;

    const ejecucion = [];

    ejecucion.push({ $unwind: "$lugares" });

    const filtro = {};

    if (num_lugar) {
      filtro["lugares.num_lugar"] = { $regex: num_lugar, $options: 'i' };
    }
    if (tipo_lugar) {
      filtro["lugares.tipo_lugar"] = tipo_lugar; 
    }
    if (num_piso) {
      filtro["lugares.num_piso"] = num_piso;
    }

    if (Object.keys(filtro).length > 0) {
      ejecucion.push({ $match: filtro });
    }

    ejecucion.push({
      $project: {
        _id: 0,
        nombre_edificio: 1,
        imagen_edificio: 1,
        video_edificio: 1,
        indicaciones_edificio: 1,
        lugar: "$lugares"
      }
    });

    const edificios = await Edificio.aggregate(ejecucion);

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const edificioConUrls = edificios.map((edificio) => {

      // Construir URL para la imagen del edificio
      if (edificio.imagen_edificio) {
        edificio.imagen_edificio = `${baseUrl}/${edificio.imagen_edificio.replace(/\\/g, "/")}`;
      }

      // Construir URL para la imagen del lugar
      if (edificio.lugar && edificio.lugar.imagen_lugar) {
        edificio.lugar.imagen_lugar = `${baseUrl}/${edificio.lugar.imagen_lugar.replace(/\\/g, "/")}`;
      }

      return edificio;
    });

    res.status(200).json(edificioConUrls);
  } catch (error) {
    console.error("Error al obtener los edificios:", error);
    res.status(500).json({ error: "Error al obtener los edificios" });
  }
};