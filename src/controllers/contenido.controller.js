const {
    Actor,
    Categoria,
    Contenido,
    Genero,
  } = require("../models/asociaciones");
  const { sequelize } = require("../conexion/database");
  const { Op } = require("sequelize");
  
  // Función para obtener todos los contenidos.
  const obtenerTodosLosContenidos = async (req, res) => {
    try {
      const contenidos = await Contenido.findAll({
        attributes: [
          "idContenido",
          "titulo",
          "resumen",
          "temporadas",
          "duracion",
          "trailer",
          [
            sequelize.literal("COALESCE(temporadas, duracion)"),
            "TemporadasDuracion",
          ],
        ],
        include: [
          { model: Categoria, as: "categoria", attributes: ["nombre"] },
          {
            model: Genero,
            as: "generos",
            through: { attributes: [] }, 
            attributes: ["nombre"], 
          },
          {
            model: Actor,
            as: "actores",
            through: { attributes: [] },
            attributes: ["nombre", "apellido"],
          },
        ],
      });
  
      if (contenidos.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontraron contenidos" });
      }
  
      const contenidoData = contenidos.map((contenido) => ({
        ID: contenido.idContenido,
        Título: contenido.titulo,
        Categoría: contenido.categoria.nombre,
        Resumen: contenido.resumen,
        "Temporadas/Duración": contenido.dataValues.TemporadasDuracion, 
        Géneros: contenido.generos.map((genero) => genero.nombre).join(", "), 
        Actores: contenido.actores
          .map((actor) => `${actor.nombre} ${actor.apellido}`)
          .join(", "),
        Tráiler: contenido.trailer,
      }));
  
      res.status(200).json(contenidoData);
    } catch (error) {
      console.error("Error al obtener todos los contenidos: ", error);
  
      res.status(500).json({
        error: "Error en el servidor",
      });
    }
  };
  
  // Función para obtener un contenido por ID.
  const obtenerContenidoPorID = async (req, res) => {
    const { id } = req.params;
    try {
      const contenido = await Contenido.findByPk(id, {
        include: [
          { model: Categoria, as: "categoria", attributes: ["nombre"] },
          {
            model: Genero,
            as: "generos",
            through: { attributes: [] },
            attributes: ["nombre"],
          },
          {
            model: Actor,
            as: "actores",
            through: { attributes: [] },
            attributes: ["nombre", "apellido"],
          },
        ],
      });
  
      if (!contenido) {
        return res
          .status(404)
          .json({ error: `No se encontro el contenido con el id: ${id}` });
      }
  
      const contenidoData = {
        ID: contenido.idContenido,
        Título: contenido.titulo,
        Categoría: contenido.categoria.nombre,
        Resumen: contenido.resumen,
        "Temporadas/Duración": contenido.temporadas || contenido.duracion,
        Géneros: contenido.generos.map((genero) => genero.nombre).join(", "),
        Actores: contenido.actores
          .map((actor) => `${actor.nombre} ${actor.apellido}`)
          .join(", "),
        Tráiler: contenido.trailer,
      };
  
      res.status(200).json(contenidoData);
    } catch (error) {
      console.error(`No se encontro el contenido con el id: ${id}`, error);
      res
        .status(500)
        .json({ error: "Error en el servidor" });
    }
  };
  
  // Función para filtrar contenidos por título, género o categoría (búsqueda parcial).
  const filtrarContenidos = async (req, res) => {
    const { titulo, genero, categoria } = req.query; 
  
    try {
      const filtro = {}; 
  
      if (titulo) {
        filtro.titulo = { [Op.like]: `%${titulo}%` };
      }
  
      const includeOpciones = [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["nombre"],
          where: categoria ? { nombre: { [Op.like]: `%${categoria}%` } } : {}, 
        },
        {
          model: Genero,
          as: "generos",
          through: { attributes: [] },
          attributes: ["nombre"],
          where: genero ? { nombre: { [Op.like]: `%${genero}%` } } : {}, 
        },
        {
          model: Actor,
          as: "actores",
          through: { attributes: [] },
          attributes: ["nombre", "apellido"],
        },
      ];
  
      const contenidos = await Contenido.findAll({
        where: filtro, 
        include: includeOpciones, 
      });
  
      if (contenidos.length === 0) {
        return res.status(404).json({
          error:
            "No se encontraron contenidos.",
        });
      }
  
      const contenidoData = contenidos.map((contenido) => ({
        ID: contenido.idContenido,
        Título: contenido.titulo,
        Categoría: contenido.categoria.nombre,
        Resumen: contenido.resumen,
        "Temporadas/Duración": contenido.temporadas || contenido.duracion,
        Géneros: contenido.generos.map((genero) => genero.nombre).join(", "),
        Actores: contenido.actores
          .map((actor) => `${actor.nombre} ${actor.apellido}`)
          .join(", "),
        Tráiler: contenido.trailer,
      }));
  
      res.status(200).json(contenidoData);
    } catch (error) {
      console.error("Error al filtrar los contenidos: ", error);
      res
        .status(500)
        .json({ error: "Error en el servidor" });
    }
  };
  
  const camposPermitidos = [
    "titulo",
    "resumen",
    "temporadas",
    "duracion",
    "trailer",
    "idCategoria",
    "generos",
    "actores",
  ];
  
  // Función para agregar un nuevo contenido (película o serie).
  const agregarContenido = async (req, res) => {
    const {
      titulo,
      resumen,
      temporadas,
      duracion,
      trailer,
      idCategoria,
      generos,
      actores,
    } = req.body; 
  
    const camposEnviados = Object.keys(req.body); 
  
    const camposInvalidos = camposEnviados.filter(
      (campo) => !camposPermitidos.includes(campo)
    );
  
    if (camposInvalidos.length > 0) {
      return res.status(400).json({
        error: `Los siguientes campos no son válidos: ${camposInvalidos.join(
          ", "
        )}`,
      });
    }
  
    if (
      !titulo ||
      !resumen ||
      !trailer ||
      !idCategoria ||
      (temporadas === undefined && duracion === undefined) 
    ) {
      return res
        .status(400)
        .json({ error: "Por favor complete todos los campos!" });
    }
  
    try {
      const categoria = await Categoria.findByPk(idCategoria);
      if (!categoria) {
        return res
          .status(404)
          .json({ error: "La categoría no existe." });
      }
  
      let generosDB = [];
      if (generos && generos.length > 0) {
        generosDB = await Genero.findAll({
          where: { idGenero: { [Op.in]: generos } }, 
        });
  
        if (generosDB.length !== generos.length) {
          return res
            .status(404)
            .json({ error: "Uno o más géneros no existen." });
        }
      }
  
      let actoresDB = [];
      if (actores && actores.length > 0) {
        actoresDB = await Actor.findAll({
          where: { idActor: { [Op.in]: actores } },
        });
  
        if (actoresDB.length !== actores.length) {
          return res
            .status(404)
            .json({ error: "Uno o más actores no existen." });
        }
      }
  
      const nuevoContenido = await Contenido.create({
        titulo,
        resumen,
        temporadas: temporadas || null,
        duracion: duracion || null, 
        trailer,
        idCategoria,
      });
  
      if (generosDB.length > 0) {
        await nuevoContenido.setGeneros(generosDB);
      }
  
      if (actoresDB.length > 0) {
        await nuevoContenido.setActores(actoresDB);
      }
  
      res
        .status(201)
        .json({ message: "Nuevo contenido creado con exito: ", nuevoContenido });
    } catch (error) {
      console.error("Error al intentar crear un nuevo contenido: ", error);
      res
        .status(500)
        .json({ error: "Error en el servidor" });
    }
  };
  
  // Función para actualizar parcialmente un contenido por su ID.
  const actualizarContenido = async (req, res) => {
    const { id } = req.params; 
    const {
      titulo,
      resumen,
      temporadas,
      duracion,
      trailer,
      idCategoria,
      generos,
      actores,
    } = req.body;
  
    const camposEnviados = Object.keys(req.body);
    const camposInvalidos = camposEnviados.filter(
      (campo) => !camposPermitidos.includes(campo)
    );
  
    if (camposInvalidos.length > 0) {
      return res.status(400).json({
        error: `Los siguientes campos no son válidos: ${camposInvalidos.join(
          ", "
        )}`,
      });
    }
  
    try {
      const contenido = await Contenido.findByPk(id);
  
      if (!contenido) {
        return res.status(404).json({
          error: `No se encontro el contenido con id: ${id}`,
        });
      }
  
      // Validamos si los géneros proporcionados existen en la base de datos.
      let generosDB = [];
      if (generos && generos.length > 0) {
        generosDB = await Genero.findAll({
          where: { idGenero: { [Op.in]: generos } },
        });
  
        if (generosDB.length !== generos.length) {
          return res
            .status(400)
            .json({ error: "Uno o más géneros no existen." });
        }
      }
  
      // Validamos si los actores proporcionados existen en la base de datos.
      let actoresDB = [];
      if (actores && actores.length > 0) {
        actoresDB = await Actor.findAll({
          where: { idActor: { [Op.in]: actores } },
        });
  
        if (actoresDB.length !== actores.length) {
          return res
            .status(400)
            .json({ error: "Uno o más actores no existen." });
        }
      }
  
      await contenido.update({
        titulo: titulo || contenido.titulo,
        resumen: resumen || contenido.resumen,
        temporadas: temporadas || contenido.temporadas,
        duracion: duracion || contenido.duracion,
        trailer: trailer || contenido.trailer,
        idCategoria: idCategoria || contenido.idCategoria,
      });
  
      if (generos && generosDB.length > 0) {
        await contenido.setGeneros(generosDB);
      }
  
      if (actores && actoresDB.length > 0) {
        await contenido.setActores(actoresDB);
      }
  
      res.status(200).json({
        message: "Contenido actualizado correctamente",
        contenidoActualizado: contenido,
      });
    } catch (error) {
      console.error(
        `Error al actualizar el contenido con id: ${id}: `,
        error
      );
      res
        .status(500)
        .json({ error: "Error en el servidor" });
    }
  };
  
  // Función para eliminar un contenido por su ID.
  const eliminarContenido = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const contenido = await Contenido.findByPk(id);
  
      if (!contenido) {
        return res
          .status(404)
          .json({ error: `No se ha encontrado el contenido con id: ${id}` });
      }
  
      await contenido.destroy();
  
      res.status(200).json({
        message: "Contenido eliminado correctamente.",
        contenidoEliminado: contenido,
      });
    } catch (error) {
      console.error(`Error al eliminar contenido con id ${id}:`, error);
      res
        .status(500)
        .json({ error: "Error en el servidor" });
    }
  };
  
  module.exports = {
    obtenerTodosLosContenidos,
    obtenerContenidoPorID,
    filtrarContenidos,
    agregarContenido,
    actualizarContenido,
    eliminarContenido,
  };
  