const mongoose = require("mongoose");

const ubicacionSchema = new mongoose.Schema({
  ciudad: String,
  pais: String,
});

const experienciaSchema = new mongoose.Schema({
  puesto: String,
  empresa: String,
  fechaInicio: Date,
  fechaFin: Date,
  descripcionResponsabilidades: String,
  industriaEmpresa: String,
  ubicacionPuesto: ubicacionSchema,
});

const educacionSchema = new mongoose.Schema({
  titulo: String,
  institucion: String,
  fechaInicio: Date,
  fechaFin: Date,
  areaEstudio: String,
  promedio: Number,
});

const habilidadSchema = new mongoose.Schema({
  nombreHabilidad: String,
  nivel: String,
});

const idiomaSchema = new mongoose.Schema({
  idioma: String,
  nivelDominio: String,
});

const datosPersonalesSchema = new mongoose.Schema({
  nombreCompleto: String,
  email: String,
  telefono: String,
  paisResidencia: String,
  ciudadResidencia: String,
  fechaNacimiento: Date,
  genero: String,
  linkedInUrl: String,
  portafolioUrl: String,
});

const informacionAdicionalSchema = new mongoose.Schema({
  expectativaSalarial: String,
  disponibilidadViajar: Boolean,
  disponibilidadReubicarse: Boolean,
  fuenteCV: String,
  fechaCargaCv: Date,
});

const cvSchema = new mongoose.Schema(
  {
    datosPersonales: datosPersonalesSchema,
    experienciaProfesional: [experienciaSchema],
    educacion: [educacionSchema],
    habilidades: [habilidadSchema],
    idiomas: [idiomaSchema],
    informacionAdicional: informacionAdicionalSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CV", cvSchema);
