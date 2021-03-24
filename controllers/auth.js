const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { generarJWT } = require("../helpers/generar-jwt");

const User = require("../models/user");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      //Verificar si el email existe
      return res
        .status(400)
        .json({ msg: "Email/Password no es correcto - email" });
    }

    if (!user.status) {
      //Verificar si el usuario está activo
      return res
        .status(400)
        .json({ msg: "Email/Password no es correcto - user status: false" });
    }
    //Verificar que la contraseña ingresada es correcta - Se compara contra la que está almacenada en la DB
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ msg: "Email/Password no correcto - password inválido" });
    }

    //Generar JWT
    const token = await generarJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login };
