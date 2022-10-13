const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
	const { correo, password } = req.body;

	try {
		//Verificar si el mail existe
		const user = await Usuario.findOne({ correo: correo });
		if (!user) {
			return res.status(400).json({
				msg: "Usuario no encontrado - correo",
				data: req.body,
			});
		}
		//Si el usuario esta activo
		if (!user.estado) {
			return res.status(400).json({
				msg: "Usuario no activo",
				data: req.body,
			});
		}
		//Verificar la contraseña
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: "Password incorrecto",
				data: req.body,
			});
		}
		//Generar el JWT
		const token = await generarJWT(user.uid);

		res.json({
			msg: "login API controller",
			data: req.body,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Algo salio mal, hable con el administrador",
		});
	}
};

module.exports = {
	login,
};
