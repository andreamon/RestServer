const { Router } = require("express");
const { check } = require("express-validator");

const { validate } = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  isValidRole,
  existEmail,
  existUserID,
} = require("../helpers/db-validators");

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/", getUser);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Email no válido").isEmail(),
    check("password", "La contraseña debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email").custom(existEmail),
    check("role").custom(isValidRole),
    validate,
  ],
  createUser
);

//para trabajar con parametros se utiliza ":" seguido del nombre que se le quiera dar al parametro
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserID),
    check("role").custom(isValidRole),
    validate,
  ],
  updateUser
);
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserID),
    validate,
  ],
  deleteUser
);

module.exports = router;
