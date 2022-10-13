const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		//generar un token
		jwt.sign(
			payload,
			process.env.SECRET_OR_PRIVATE_KEY,
			{
				expiresIn: "4h",
			},
			//callback function
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar e token");
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generarJWT,
};
