const express = require("express");
const router = express.Router();
const UserController = require("../controlers/UserControler");
const authentication = require("../middlewares/authMiddleware");
const uploadImg = require("../middlewares/MulterMiddlewares");


//register/login
router.post("/register", UserController.newUser);
router.post("/login", UserController.loginUser);
router.post("/logout",authentication.authenticateToken, UserController.logout);
router.post("/loginAdmin", UserController.loginAdmin);

//token decoding
router.post("/decode", UserController.decode);

//users/user:id
router.get("/users", UserController.getUsers);
router.get("/user",authentication.authenticateToken, UserController.getUser);

router.get("/usernn/:user_id", UserController.getUserProfile);

//delete/update
router.put("/deleteuser/:user_id", UserController.deleteUser);
router.put("/updateuser",authentication.authenticateToken, UserController.updateUser);
router.post("/google", UserController.google);

module.exports = router;