const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    //Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura y parse del body. Cualquier info que llegue del body (mediante post, put o delete),
    // la va a serializar a formato JSON
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
