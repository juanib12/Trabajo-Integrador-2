const { Actor } = require("./actor");
const { Categoria } = require("./categoria");
const { Contenido } = require("./contenido");
const { Genero } = require("./genero");

Actor.associate({ Contenido });

Categoria.associate({ Contenido });

Contenido.associate({ Genero, Actor, Categoria });

Genero.associate({ Contenido });

module.exports = { Actor, Categoria, Contenido, Genero };
