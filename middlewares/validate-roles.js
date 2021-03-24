const isAdminRole = (req, res, next) => {
  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({ msg: `${name} no es un usuario autorizado` });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    console.log(roles, req.user.role);
    if (!req.user) {
      return res.status(500).json({
        msg: "No se ha validado el token aún",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ msg: `El servicio requiere uno de estos roles ${roles}` });
    }
    next();
  };
};

module.exports = { isAdminRole, hasRole };
