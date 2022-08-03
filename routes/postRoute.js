// import controllers review, products
const postController = require("../controller/postController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

// router
const router = require("express").Router();

// post routers
router.post("/new", postController.createPost);
router.get("/", postController.getAllPost);
router.get("/:id", postController.getDetailPost);
router.get("/category/:id", postController.getPostsByCategory);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
