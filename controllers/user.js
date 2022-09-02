const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUsuarios = (req = request, res = response) => {
	const queryParams = req.query;

	res.json({
		msg: "get API controller",
		queryParams,
	});
};

const postUsuarios = async (req, res = response) => {
	const { name, correo, password, rol } = req.body;
	const usuario = new Usuario({ name, correo, password, rol });
	//Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	await usuario.save();

	res.json({
		msg: "post API controller",
		usuario,
	});
};

const putUsuarios = async (req, res = response) => {
	const { id } = req.params;
	//Estoy extrayendo propiedades que no necesito que se graben
	const { password, google, ...resto } = req.body;

	//TODO: Validar contra BD
	if (password) {
		//Encriptar la contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	//Busca el usuario, lo actualiza en db y me lo retorna
	const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

	res.json({
		msg: "put API controller",
		id,
		usuario,
	});
};

const patchUsuarios = (req, res = response) => {
	res.json({
		msg: "patch API controller",
	});
};

const deleteUsuarios = (req, res = response) => {
	res.json({
		msg: "delete API controller",
	});
};

module.exports = {
	getUsuarios,
	postUsuarios,
	putUsuarios,
	patchUsuarios,
	deleteUsuarios,
};
