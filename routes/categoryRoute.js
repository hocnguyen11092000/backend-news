// import controllers review, products
const categoryController = require("../controller/categoryController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

// router
const router = require("express").Router();

// category routers
router.post(
  "/new",
  isAuthenticateUser,
  authorizeRoles("admin"),
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getDetailCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
