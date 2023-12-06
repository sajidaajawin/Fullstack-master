const express = require("express");
const router = express.Router();
const UserController = require("../controlers/UserControler");
const authentication = require("../middlewares/authMiddleware");

//register/login
router.post("/register", UserController.newUser);
router.post("/login", UserController.loginUser);

//token decoding
router.post("/decode", UserController.decode);

//users/user:id
router.get("/users", UserController.getUsers);
router.get("/user",authentication.authenticateToken, UserController.getUser);

router.get("/usernn/:user_id", UserController.getUserProfile);

//delete/update
router.put("/deleteuser/:id", UserController.deleteUser);
router.put("/updateuser",authentication.authenticateToken, UserController.updateUser);
router.post("/google", UserController.google);

module.exports = router;
