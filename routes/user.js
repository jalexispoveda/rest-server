const { Router } = require("express");
const { check } = require("express-validator");
const {
	esRoleValido,
	existeEmail,
	existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const {
	getUsuarios,
	putUsuarios,
	postUsuarios,
	deleteUsuarios,
	patchUsuarios,
} = require("../controllers/user");

const router = Router();

router.get("/", getUsuarios);

router.put(
	"/:id",
	[
		check("id", "No es un ID valido").isMongoId(),
		check("id").custom(existeUsuarioPorId),
		validarCampos,
	],
	putUsuarios
);

router.post(
	"/",
	[
		check("name", "El nombre es obligatorio").notEmpty(),
		check("password", "El password es obligatorio y mas de 6 letras")
			.notEmpty()
			.isLength({ min: 6 }),
		check("correo", "El correo no es valido").isEmail(),
		//check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("correo").custom(existeEmail),
		check("rol").custom(esRoleValido),
		validarCampos,
	],
	postUsuarios
);

router.patch("/", patchUsuarios);

router.delete("/", deleteUsuarios);

module.exports = router;
