const { validationResult } = require("express-validator");

// recibimos request, response y el next
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  //   Este next siempre se llama en una funcion tipo
  //   middleware, si todo se cumple bien llama al next
  //   para llamar al siguiente middleware
  next();
};

module.exports = {
  validarCampos,
};
