const Role = require("../models/rol");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
	}
};

const existeEmail = async (correo = "") => {
	const existeEmail = await Usuario.findOne({ correo });
	if (existeEmail) {
		throw new Error(
			`El correo ${correo} ya esta registrado en la base de datos`
		);
	}
};

const existeUsuarioPorId = async (id = "") => {
	const existeUsuario = await Usuario.findOne({ id });
	if (existeUsuario) {
		throw new Error(`El usuario por ${id} no existe`);
	}
};

module.exports = {
	esRoleValido,
	existeEmail,
	existeUsuarioPorId,
};
