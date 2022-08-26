var cors = require("cors");
const express = require("express");
class Server {
	constructor() {
		//Cuando instancie esta clase creare el nuevo servidor
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = "/api/usuarios";
		//Middlewares (funcion que siempre se ejecuta al levantar el servidor)
		this.middlewares();
		//Esto dispara el metodo que configura mis rutas
		this.routes();
	}

	middlewares() {
		//CORS
		this.app.use(cors());
		//lectura y parseo de body
		this.app.use(express.json());
		//directorio publico (front)
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.usuariosPath, require("../routes/user"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en puerto ", this.port);
		});
	}
}

module.exports = Server;
