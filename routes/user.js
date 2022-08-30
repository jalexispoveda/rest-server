const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
	getUsuarios,
	putUsuarios,
	postUsuarios,
	deleteUsuarios,
	patchUsuarios,
} = require("../controllers/user");
const Rol = require("../models/rol");

const router = Router();

router.get("/", getUsuarios);

router.put("/:id", putUsuarios);

router.post(
	"/",
	[
		check("name", "El nombre es obligatorio").notEmpty(),
		check("password", "El password es obligatorio y mas de 6 letras")
			.notEmpty()
			.isLength({ min: 6 }),
		check("correo", "El correo no es valido").isEmail(),
		//check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("rol").custom(async (rol = "") => {
			const existeRol = await Rol.findOne({ rol });
			if (!existeRol) {
				throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
			}
		}),
		validarCampos,
	],
	postUsuarios
);

router.patch("/", patchUsuarios);

router.delete("/", deleteUsuarios);

module.exports = router;
