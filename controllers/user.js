const { response, request } = require("express");

const getUsuarios = (req = request, res = response) => {
  const queryParams = req.query;

  res.json({
    msg: "get API controller",
    queryParams,
  });
};

const postUsuarios = (req, res = response) => {
  console.log(req);

  const body = req.body;
  res.json({
    msg: "post API controller",
    body,
  });
};

const putUsuarios = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API controller",
    id,
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
