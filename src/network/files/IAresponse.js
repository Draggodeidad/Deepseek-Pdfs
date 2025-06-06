const cvService = require("../../services/cvService");

const handleAIResponse = async (aiResponse) => {
  try {
    // Extraer el contenido de la respuesta de la IA
    const cvData = JSON.parse(aiResponse.content);

    // Guardar en MongoDB
    const savedCV = await cvService.createCV(cvData);

    return {
      success: true,
      message: "CV guardado exitosamente",
      data: savedCV,
    };
  } catch (error) {
    console.error("Error al procesar la respuesta de la IA:", error);
    return {
      success: false,
      message: "Error al procesar la respuesta de la IA",
      error: error.message,
    };
  }
};

module.exports = handleAIResponse;
