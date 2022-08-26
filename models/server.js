var cors = require("cors");
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
		//CORS
		this.app.use(cors());
		//directorio publico (front)
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.get("/api", (req, res) => {
			res.json({
				msg: "get API",
			});
		});

		this.app.put("/api", (req, res) => {
			res.json({
				msg: "put API",
			});
		});

		this.app.post("/api", (req, res) => {
			res.json({
				msg: "post API",
			});
		});

		this.app.delete("/api", (req, res) => {
			res.json({
				msg: "delete API",
			});
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en puerto ", this.port);
		});
	}
}

module.exports = Server;
