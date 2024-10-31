# Proyecto Integrador: CRUD con Node.js y MySQL

En este proyecto se desarrolla una aplicación utilizando Node.js (Express JS) y MySQL (Sequelize) para gestionar el contenido disponible en la plataforma Trailerflix, que incluye películas y series. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre el contenido. Además, se ofrece la opción de filtrar el contenido por diferentes criterios, como género, título o categoría, mejorando así la experiencia de búsqueda y navegación.

## Desarrollado por:

- **Desarrollador:** Juan Ignacio Bianco
- **GitHub:** [GitHub](https://github.com/juanib12)

## Profesores:

- **Profesor:** Fabio D. Argañaraz A.
- **GitHub:** [Fabio D. Argañaraz A.](https://github.com/FabioDrizZt)
- **Tutor:** Juan Nebbia
- **GitHub:** [JuanNebbia](https://github.com/JuanNebbia)

## Contenidos:
- [Iniciar el proyecto](#iniciar-el-proyecto-)
- [Configuración del archivo .env](#configuración-del-archivo-env-environment-variables-%EF%B8%8F)
- [Estructura del proyecto](#estructura-del-proyecto-)
- [Descripción de archivos](#descripción-de-archivos-)
- [Rutas de la API REST](#rutas-de-la-api-rest-%EF%B8%8F)

## Iniciar el proyecto:

Instalar las librerias utilizadas:

```bash
   npm i express sequelize mysql2 morgan
```

## Configuración del archivo .env:

- DATABASE: Nombre de la base de datos.
- DBUSER: Nombre de usuario de tu base de datos.
- PASSWORD: Contraseña para el usuario de la base de datos.
- HOST: Host de la base de datos.
- PORT: Ingresa el puerto a usar para conectar a la API.

## Estructura del proyecto:

Esta es la estructura del proyecto.

```plaintext
/node_modules
  - (Contiene todos los módulos y bibliotecas necesarias para el proyecto)
/src
  /conexion
    - database.js
  /controllers
    - contenido.controller.js
  /json
    - trailerflix.json
  /models
    - actor.js
    - asociaciones.js
    - categoria.js
    - contenido.js
    - genero.js
  /routes
    - contenido.routes.js
  /sql
    - trailerflix_creación_bd_y_tablas.sql
    - trailerflix_inserts.sql
  /tests
    - api.http
/.env
/.gitignore
/app.js
/dbdesigner.png
/enunciado.md
/LICENSE
/package-lock.json
/package.json
/README.md
```

## Descripción de archivos:
  - **src/database.js**: Archivo que contiene la conexion a la base de datos.
    - **src/controllers/contenido.controller.js**: Archivo controlador donde se alojan todas las funcionalidades.

    - **src/json/trailerflix.json**: Archivo de formato JSON que contiene todos los contenidos.

    - **src/models/actor.js**: Define el modelo "Actor" y sus relaciones con otras tablas.
    - **src/models/asociaciones.js**: Archivo que centraliza las relaciones entre los modelos (actores, contenido, categorías y géneros).
    - **src/models/categoria.js**: Archivo donde define el modelo "Categoria" y sus relaciones.
    - **src/models/contenido.js**: Archivo donde define el modelo "Contenido" y sus relaciones con actores, géneros y categorías.
    - **src/models/genero.js**: Archivo donde define el modelo "Genero" y sus relaciones.

    - **src/routes/contenido.routes.js**: Archivo donde se definen todas los endpoints para los contenidos.
    
    - **src/sql/trailerflix_creación_bd_y_tablas.sql**: Archivo SQL que crea la base de datos trailerflix y sus tablas.
    - **src/sql/trailerflix_inserts.sql**: Archivo SQL que contiene datos listos para insertar en las tablas de trailerflix.

- **app.js**: Archivo raiz donde se ejecuta la aplicación.

- **dbdesigner.png**: Imagen donde muestra el model relacional de la base de datos, realizado en DB Designer.

## ENDPOINTS de la API:

| PETICIÓN | ENDPOINT | RESUMEN |
|:--------:|-----|-------------|
| GET | `/` | Ruta principal |
| GET | `/contenido` | Obtener todos los contenidos (películas y series). |
| GET | `/contenido/:id` | Obtener un contenido específico por su ID. |
| GET | `/contenido/filtrar` | Filtrar contenidos por `título`, `género` o `categoría` |
| POST | `/contenido` | Agregar un nuevo contenido (película o serie). |
| PATCH | `/contenido/:id` | Actualizar parcialmente un contenido por su ID. |
| DELETE | `/contenido/:id` | Eliminar un contenido por su ID.|
