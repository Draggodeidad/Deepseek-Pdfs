const filesNetwork = require("../network/files");
const cvRoutes = require("./cvRoutes");

function crearRutas(app) {
  app.use("/files", filesNetwork);
  app.use("/api/cv", cvRoutes);
}

module.exports = crearRutas;
