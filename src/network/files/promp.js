function createPrompt(pdfText) {
  return `Analiza el siguiente contenido de un CV y extrae ÚNICAMENTE los datos estructurados en formato JSON válido. NO agregues comentarios, explicaciones ni texto adicional.

RESPONDE SOLO CON EL JSON en el siguiente formato exacto:

{
  "datosPersonales": {
    "nombreCompleto": "string o null",
    "email": "string o null", 
    "telefono": "string o null",
    "paisResidencia": "string o null",
    "ciudadResidencia": "string o null",
    "fechaNacimiento": "YYYY-MM-DD o null",
    "genero": "string o null",
    "linkedInUrl": "string o null",
    "portafolioUrl": "string o null"
  },
  "experienciaProfesional": [
    {
      "puesto": "string",
      "empresa": "string", 
      "fechaInicio": "YYYY-MM-DD o YYYY-MM o YYYY",
      "fechaFin": "YYYY-MM-DD o YYYY-MM o YYYY o null si es actual",
      "descripcionResponsabilidades": "string",
      "industriaEmpresa": "string o null",
      "ubicacionPuesto": {
        "ciudad": "string o null",
        "pais": "string o null"
      }
    }
  ],
  "educacion": [
    {
      "titulo": "string",
      "institucion": "string",
      "fechaInicio": "YYYY-MM-DD o YYYY-MM o YYYY o null",
      "fechaFin": "YYYY-MM-DD o YYYY-MM o YYYY o null",
      "areaEstudio": "string o null",
      "promedio": "number o null"
    }
  ],
  "habilidades": [
    {
      "nombreHabilidad": "string",
      "nivel": "Básico|Intermedio|Avanzado|Experto"
    }
  ],
  "idiomas": [
    {
      "idioma": "string", 
      "nivelDominio": "Básico|Intermedio|Avanzado|Fluido|Nativo"
    }
  ],
  "informacionAdicional": {
    "expectativaSalarial": "string o null",
    "disponibilidadViajar": true|false|null,
    "disponibilidadReubicarse": true|false|null,
    "fuenteCV": "string o null",
    "fechaCargaCv": "${new Date().toISOString().split("T")[0]}"
  }
}

INSTRUCCIONES CRÍTICAS:
1. Si un dato no está presente en el CV, usa null
2. Para fechas, extrae lo que esté disponible (año completo, año-mes, o año-mes-día)
3. Para habilidades sin nivel específico, infiere el nivel basándote en la experiencia descrita
4. Para arrays vacíos, usa [] en lugar de null
5. NO incluyas texto explicativo, solo el JSON
6. Asegúrate de que el JSON sea válido y se pueda parsear directamente

CONTENIDO DEL CV A ANALIZAR:\n\n${pdfText}`;
}

module.exports = {
  createPrompt,
};
