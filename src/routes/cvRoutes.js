const express = require("express");
const router = express.Router();
const cvService = require("../services/cvService");

// Ruta de prueba para crear un CV
router.post("/test", async (req, res) => {
  try {
    const testCV = {
      datosPersonales: {
        nombreCompleto: "Ana María López García",
        email: "ana.lopez@email.com",
        telefono: "+52 55 1234 5678",
        paisResidencia: "México",
        ciudadResidencia: "Ciudad de México",
        fechaNacimiento: new Date("1990-03-15"),
        genero: "Femenino",
        linkedInUrl: "https://www.linkedin.com/in/anamarialopez",
        portafolioUrl: null,
      },
      experienciaProfesional: [
        {
          puesto: "Desarrolladora Full Stack",
          empresa: "Tech Solutions S.A. de C.V.",
          fechaInicio: new Date("2020-01-01"),
          fechaFin: null,
          descripcionResponsabilidades:
            "Desarrollo y mantenimiento de aplicaciones web",
          industriaEmpresa: "Tecnología",
          ubicacionPuesto: {
            ciudad: "Ciudad de México",
            pais: "México",
          },
        },
      ],
      educacion: [
        {
          titulo: "Ingeniería en Sistemas Computacionales",
          institucion: "Instituto Tecnológico de Monterrey",
          fechaInicio: new Date("2013-08-01"),
          fechaFin: new Date("2018-05-31"),
          areaEstudio: "Sistemas Computacionales",
          promedio: 9.2,
        },
      ],
      habilidades: [
        { nombreHabilidad: "JavaScript", nivel: "Experto" },
        { nombreHabilidad: "Node.js", nivel: "Avanzado" },
      ],
      idiomas: [
        { idioma: "Español", nivelDominio: "Nativo" },
        { idioma: "Inglés", nivelDominio: "Fluido" },
      ],
      informacionAdicional: {
        expectativaSalarial: "MXN 35000-45000",
        disponibilidadViajar: false,
        disponibilidadReubicarse: true,
        fuenteCV: "LinkedIn",
        fechaCargaCv: new Date(),
      },
    };

    const savedCV = await cvService.createCV(testCV);
    res.status(201).json({
      success: true,
      message: "CV de prueba creado exitosamente",
      data: savedCV,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear CV de prueba",
      error: error.message,
    });
  }
});

// Ruta para obtener todos los CVs
router.get("/", async (req, res) => {
  try {
    const cvs = await cvService.getAllCVs();
    res.json({
      success: true,
      data: cvs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener CVs",
      error: error.message,
    });
  }
});

// Ruta para obtener un CV por ID
router.get("/:id", async (req, res) => {
  try {
    const cv = await cvService.getCVById(req.params.id);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: "CV no encontrado",
      });
    }
    res.json({
      success: true,
      data: cv,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener CV",
      error: error.message,
    });
  }
});

module.exports = router;
