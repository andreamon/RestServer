const { response } = require("express");

const getUser = (req, res = response) => {
  // const {page} = req.query;
  const query = req.query;
  res.json({ msg: "get API - Controller", query });
};

const createUser = (req, res = response) => {
  //POST method
  const { name } = req.body;
  res.status(201).json({ msg: "post API - Controller", name });
};

const updateUser = (req, res = response) => {
  //PUT method
  //para obtener el valor del parametro -> req.params
  const { id } = req.params;
  res.json({ msg: "put API - Controller", id });
};

const deleteUser = (req, res = response) => {
  res.json({ msg: "delete API - Controller" });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
