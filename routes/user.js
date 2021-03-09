const { Router } = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);//para trabajar con parametros se utiliza ":" seguido del nombre que se le quiera dar al parametro
router.delete("/", deleteUser);

module.exports = router;
