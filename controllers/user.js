const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUsuarios = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  // { estado: true } -> Asi se envian las condiciones en los querys
  const query = { estado: true };

  //NOTE: Hay dos formas de traer la data, las promesas no bloquean pero el await si,
  //por eso es mas rapido encadenar las peticiones en promise.all y retornarlo
  //skip envia desde el valor que le pongamos (ejemplo desde el registro #3 hasta el limite)
  //limit -> limita la cantidad de registros a mostrar

  // const usuarios = await Usuario.find(query).skip(desde).limit(limite);
  // const total = await Usuario.countDocuments(query);

  const promises = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  console.log(promises);

  res.json({
    promises,
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
  const { _id, password, google, ...resto } = req.body;

  //TODO: Validar contra BD
  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //Busca el usuario, lo actualiza en db y me lo retorna
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
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
