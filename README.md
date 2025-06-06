📄 CV Processor API

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-v20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/DeepSeek-AI-FF6B6B?style=for-the-badge" alt="DeepSeek">
</div>
<p align="center">
  <strong>Una API para procesar CVs en formato PDF utilizando inteligencia artificial</strong>
</p>

🚀 Características Principales

📤 Subida de PDFs: Procesamiento automático de archivos CV
🤖 IA Integrada: Extracción inteligente de datos usando DeepSeek
💾 Base de Datos: Almacenamiento automático en MongoDB
🔄 Desarrollo Ágil: Hot reload con Nodemon
📊 API RESTful: Endpoints bien estructurados

🛠️ Requisitos del Sistema
Instalaciones Necesarias
HerramientaVersiónDescripciónNode.jsv20 LTSRuntime de JavaScriptDockerLatestPara imagen de MongoDBMongoDBLatestBase de datos (vía Docker o instalación local)
📋 Instalación
bash# Clonar el repositorio
git clone [tu-repositorio]
cd cv-processor

# Instalar dependencias

npm install

# Ejecutar en modo desarrollo

npm run dev

💡 Tip: El proyecto usa Nodemon para recarga automática durante el desarrollo

🌐 Documentación de la API
🔧 Base URL
http://localhost:3000
📁 Endpoints de Archivos (/files)

1. 🏠 Endpoint de Prueba
   httpGET /files
   Respuesta: "Hola Mundo"

2. 📤 Subir y Procesar PDF
   httpPOST /files
   Tipo de Contenido: multipart/form-data
   CampoTipoDescripciónfileFileArchivo PDF del CV
   Funcionalidades:

✅ Lee el contenido del PDF
🤖 Procesa con DeepSeek para extraer datos
💾 Guarda automáticamente en MongoDB
📊 Retorna JSON estructurado del CV

3. 💬 Mensaje Directo a DeepSeek
   httpPOST /files/new-completion
   Body (JSON):
   json{
   "message": "tu mensaje aquí"
   }

👤 Endpoints de CV (/api/cv) 4. 🧪 Crear CV de Prueba
httpPOST /api/cv/test
Funcionalidad: Crea un CV con datos predefinidos para testing

5. 📋 Obtener Todos los CVs
   httpGET /api/cv
   Respuesta: Lista completa de CVs almacenados

6. 🔍 Obtener CV Específico
   httpGET /api/cv/:id
   ParámetroTipoDescripciónidObjectIdID único del CV en MongoDB

🚀 Ejemplos de Uso
📤 Subir PDF
bashcurl -X POST http://localhost:3000/files \
 -F "file=@tu_cv.pdf"
📋 Ver Todos los CVs
bashcurl http://localhost:3000/api/cv
🔍 Ver CV Específico
bashcurl http://localhost:3000/api/cv/[ID_DEL_CV]
🧪 Crear CV de Prueba
bashcurl -X POST http://localhost:3000/api/cv/test
💬 Enviar Mensaje a DeepSeek
bashcurl -X POST http://localhost:3000/files/new-completion \
 -H "Content-Type: application/json" \
 -d '{"message": "¿Cómo estás?"}'

📊 Base de Datos
Configuración Automática

Nombre de BD: cv_database
Población: Automática al subir PDFs
Esquema: Se genera dinámicamente

🔥 Características Técnicas
🎯 Endpoint Principal

POST /files es el endpoint más importante que procesa PDFs y los guarda automáticamente en MongoDB

🔄 Desarrollo

Hot reload con Nodemon
Configuración automática de la base de datos
Procesamiento asíncrono de archivos
