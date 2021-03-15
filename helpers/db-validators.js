const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const isRole = await Role.findOne({ role });
  if (!isRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const existEmail = async (email = "") => {
  // Verificar que el correo sea único
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    throw new Error(`El email ${email} ya está siendo usado`);
  }
};

const existUserID = async (id) => {
  // Verificar que el id exista en la DB
  const isUserId = await User.findById(id);
  if (!isUserId) {
    throw new Error(`El ID no existe ${id}`);
  }
};

module.exports = { isValidRole, existEmail, existUserID };
