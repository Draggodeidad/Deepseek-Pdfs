const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const DeepSeek = require("../../services/deepseek");
const { createPrompt } = require("./promp");

const upload = multer({ dest: "uploads/" });
const router = express.Router();
const deepseek = new DeepSeek();

function test(request, response) {
  response.send("Hola Mundo");
}

async function getText(request, response) {
  const file = request.file;
  const path = file.path;

  console.log("pdf recibido");

  try {
    const buffer = fs.readFileSync(path);
    const data = await pdfParse(buffer);

    // Enviar el contenido del PDF a DeepSeek para estructurarlo
    const prompt = createPrompt(data.text);
    const completion = await deepseek.sendMessage(prompt);

    // Limpiar el archivo temporal
    fs.unlinkSync(path);

    response.json({
      role: "assistant",
      content: completion.content,
    });
  } catch (error) {
    console.error("Error al procesar el PDF:", error);
    response.status(500).json({ error: "Error al procesar el archivo PDF" });
  }
}

async function getNewCompletion(request, response) {
  try {
    const { message } = request.body;
    if (!message) {
      return response.status(400).json({ error: "El mensaje es requerido" });
    }

    const completion = await deepseek.sendMessage(message);
    response.json({
      role: "assistant",
      content: completion.content,
    });
  } catch (error) {
    console.error("Error en getNewCompletion:", error);
    response.status(500).json({ error: "Error al procesar la solicitud" });
  }
}

router.get("/", test);
router.post("/", upload.single("file"), getText);
router.post("/new-completion", getNewCompletion);

module.exports = router;

// Endpoint para subir un archivo pdf: http://localhost:3000/files
// la key es file
