const { Schema, model } = require("mongoose");

//Modelo ROLE
const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "El campo rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
