CREATE SCHEMA trailerflix
DEFAULT CHARACTER SET utf8mb4;

USE trailerflix;

CREATE TABLE categorias (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE generos (
    idGenero INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE 
);

CREATE TABLE actores (
    idActor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL ,
    apellido VARCHAR(100) NOT NULL ,
    CONSTRAINT unique_nombre_apellido UNIQUE (nombre, apellido) 
);

CREATE TABLE contenido (
    idContenido INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    resumen TEXT,
    temporadas INT NULL, 
    duracion VARCHAR(100) NULL, 
    trailer VARCHAR(255),
    idCategoria INT,
    FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria)
);

CREATE TABLE contenido_generos (
    idContenido INT,
    idGenero INT,
    FOREIGN KEY (idContenido) REFERENCES contenido(idContenido) ON DELETE CASCADE,
    FOREIGN KEY (idGenero) REFERENCES generos(idGenero),
    PRIMARY KEY (idContenido, idGenero)
);

CREATE TABLE contenido_actores (
    idContenido INT,
    idActor INT,
    FOREIGN KEY (idContenido) REFERENCES contenido(idContenido) ON DELETE CASCADE, 
    FOREIGN KEY (idActor) REFERENCES actores(idActor),
    PRIMARY KEY (idContenido, idActor)
);
