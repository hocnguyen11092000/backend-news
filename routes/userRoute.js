// import controllers review, products
const userController = require("../controller/userController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

// router
const router = require("express").Router();

// use routers
router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.get("/get-user-info", isAuthenticateUser, userController.getUserInfo);
router.get("/", userController.getAllUsers);

module.exports = router;
