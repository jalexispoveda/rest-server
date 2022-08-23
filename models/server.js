const express = require("express");
class Server {
  constructor() {
    //Cuando instancie esta clase creare el nuevo servidor
    this.app = express();
    this.port = process.env.PORT;
    //Middlewares (funcion que siempre se ejecuta al levantar el servidor)
    this.middlewares();
    //Esto dispara el metodo que configura mis rutas
    this.routes();
  }

  middlewares() {
    //directorio publico (front)
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto ", this.port);
    });
  }
}

module.exports = Server;
