const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
  patchUsuarios,
} = require("../controllers/user");

const router = Router();

router.get("/", getUsuarios);

router.put("/:id", putUsuarios);

router.post(
  "/",
  [check("correo", "El correo no es valido").isEmail()],
  postUsuarios
);

router.patch("/", patchUsuarios);

router.delete("/", deleteUsuarios);

module.exports = router;
