const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const DeepSeek = require("../../services/deepseek");
const { createPrompt } = require("./promp");
const cvService = require("../../services/cvService");

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

    // Intentar parsear y guardar la respuesta de DeepSeek en MongoDB
    try {
      // La respuesta de DeepSeek debería venir en formato JSON
      const cvData = JSON.parse(completion.content);

      // Agregar fecha de carga del CV
      if (!cvData.informacionAdicional) {
        cvData.informacionAdicional = {};
      }
      cvData.informacionAdicional.fechaCargaCv = new Date();
      cvData.informacionAdicional.fuenteCV = "PDF Upload";

      // Guardar en MongoDB
      const savedCV = await cvService.createCV(cvData);
      console.log("CV guardado en MongoDB:", savedCV._id);

      response.json({
        role: "assistant",
        content: completion.content,
        saved: true,
        cvId: savedCV._id,
        message: "CV procesado y guardado exitosamente en la base de datos",
      });
    } catch (parseError) {
      console.error("Error al parsear o guardar el CV:", parseError);
      // Si hay error al parsear o guardar, aún devolvemos la respuesta original
      response.json({
        role: "assistant",
        content: completion.content,
        saved: false,
        error: "No se pudo guardar en la base de datos: " + parseError.message,
      });
    }
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
