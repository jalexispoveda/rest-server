const { response } = require("express");

const getUsuarios = (req, res = response) => {
	res.json({
		msg: "get API controller",
	});
};

const postUsuarios = (req, res = response) => {
	res.json({
		msg: "post API controller",
	});
};

const putUsuarios = (req, res = response) => {
	res.json({
		msg: "put API controller",
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
