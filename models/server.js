var cors = require("cors");
const express = require("express");
const { dbConnection } = require("../database/config");
class Server {
	constructor() {
		//Cuando instancie esta clase creare el nuevo servidor
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.usuariosPath = "/api/usuarios";
		this.authPath = "/api/auth";
		//Conectar a BD
		this.conectarDb();
		//Middlewares (funcion que siempre se ejecuta al levantar el servidor)
		this.middlewares();
		//Esto dispara el metodo que configura mis rutas
		this.routes();
	}

	async conectarDb() {
		await dbConnection();
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
		this.app.use(this.authPath, require("../routes/auth"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en puerto ", this.port);
		});
	}
}

module.exports = Server;
