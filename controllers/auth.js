const { response, request } = require("express");

const login = async (req, res = response) => {
	console.log(req.body);

	res.json({
		msg: "login API controller",
		data: req.body,
	});
};

module.exports = {
	login,
};
