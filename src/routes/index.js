const filesNetwork = require("../network/files");

function crearRutas(app) {
  app.use("/files", filesNetwork);
}

module.exports = crearRutas;
