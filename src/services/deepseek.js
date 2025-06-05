const dotenv = require("dotenv");
const OpenAI = require("openai");
//const axios = require("axios");

class DeepSeek {
  constructor() {
    const API_KEY = process.env.API_KEY_DEEPSEEK;
    if (!API_KEY) {
      throw new Error(
        "API_KEY_DEEPSEEK no está definida en las variables de entorno"
      );
    }

    this.openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: API_KEY,
    });
  }

  async sendMessage(userMessage) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "deepseek/deepseek-chat:free",
        messages: [{ role: "user", content: userMessage }],
      });
      return response.choices[0].message;
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      throw error;
    }
  }
}

module.exports = DeepSeek;
