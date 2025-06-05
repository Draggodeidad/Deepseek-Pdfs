require("dotenv").config();
const express = require("express");
const crearRutas = require("./src/routes");

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hola Mundo");
// });
crearRutas(app);

app.listen(PORT, () => {
  console.log(`El server esta corriendo en el puerto ${PORT}`);
});

//console.log(process.env.API_KEY_DEEPSEEK);
