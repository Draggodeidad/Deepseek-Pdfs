require("dotenv").config();
const express = require("express");
const crearRutas = require("./src/routes");
const connectDB = require("./src/services/mongoDB");

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hola Mundo");
// });
crearRutas(app);
// Conecta a mongoDB
connectDB();
app.listen(PORT, () => {
  console.log(`El server esta corriendo en el puerto ${PORT}`);
});

//console.log(process.env.API_KEY_DEEPSEEK);
