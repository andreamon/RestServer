const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUser = async (req, res = response) => {
  const { limit = 5 } = req.query;
  const query = { status: true };

  // const users = await User.find(query).limit(Number(limit));
  // const total = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const createUser = async (req, res = response) => {
  //POST method
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role }); //se crea una instancia de User con los datos que llegan en body

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar el registro en la BD
  await user.save();

  res.status(201).json({ user });
};

const updateUser = async (req, res = response) => {
  //PUT method
  const { id } = req.params; //para obtener el valor del parametro -> req.params

  const { _id, password, google, email, ...rest } = req.body;

  //Todo validar contra la DB
  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const userUpdated = await User.findByIdAndUpdate(id, rest);

  res.json(userUpdated);
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  const userDeleted = await User.findByIdAndUpdate(id, { status: false });

  // const userAuthenticated = req.user;

  res.json({ userDeleted });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
