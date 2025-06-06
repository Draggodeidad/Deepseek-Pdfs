const CV = require("../models/CV");

const cvService = {
  // Crear un nuevo CV
  async createCV(cvData) {
    try {
      const cv = new CV(cvData);
      return await cv.save();
    } catch (error) {
      throw new Error(`Error al crear CV: ${error.message}`);
    }
  },

  // Obtener todos los CVs
  async getAllCVs() {
    try {
      return await CV.find();
    } catch (error) {
      throw new Error(`Error al obtener CVs: ${error.message}`);
    }
  },

  // Obtener un CV por ID
  async getCVById(id) {
    try {
      return await CV.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener CV: ${error.message}`);
    }
  },

  // Actualizar un CV
  async updateCV(id, cvData) {
    try {
      return await CV.findByIdAndUpdate(id, cvData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar CV: ${error.message}`);
    }
  },

  // Eliminar un CV
  async deleteCV(id) {
    try {
      return await CV.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar CV: ${error.message}`);
    }
  },
};

module.exports = cvService;
