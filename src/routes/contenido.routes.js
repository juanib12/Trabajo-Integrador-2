const express = require("express");
const router = express.Router();
const contenido = require("../controllers/contenido.controller");

// Obtener todos los contenidos.
router.get("/", contenido.obtenerTodosLosContenidos);

// Filtrar contenidos por título, género o categoría (búsqueda parcial).
router.get("/filtrar", contenido.filtrarContenidos);

// Obtener un contenido por ID.
router.get("/:id", contenido.obtenerContenidoPorID);

// Agregar un nuevo contenido.
router.post("/", contenido.agregarContenido);

// Actualizar parcialmente un contenido por su ID.
router.patch("/:id", contenido.actualizarContenido);

// Eliminar un contenido por su ID.
router.delete("/:id", contenido.eliminarContenido);

module.exports = router;
