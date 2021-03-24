const jwt = require("jsonwebtoken");
const user = require("../models/user");
const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // Leer el usuario que corresponde al uid
    const user = await User.findById(uid);

    //Verificar que user exista en la db
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Token no válido - user not exist" });
    }
    //Verificar que el user tenga estado true
    if (!user.state) {
      return res
        .status(401)
        .json({ msg: "Token no válido - user state false" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { validateJWT };
