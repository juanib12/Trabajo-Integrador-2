const express = require("express");
const morgan = require("morgan");
const contenido = require("./src/routes/contenido.routes");
const PORT = process.env.PORT ?? 3008;
const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a la API de Trailerflix!",
  });
});

// app.use("/contenido", contenido);

app.use((req, res) => {
  res.status(404).json({ error: "404, ESTAS PERDIDO!" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
