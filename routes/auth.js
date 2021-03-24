const { Router } = require("express");
const { check } = require("express-validator");
const { validate } = require("../middlewares/validate");
const { login } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email obligatorio").isEmail(),
    check("password", "Contraseña obligatoria").not().isEmpty(),
    validate,
  ],
  login
);

module.exports = router;
