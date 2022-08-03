// import controllers review, products
const commentController = require("../controller/commentController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

// router
const router = require("express").Router();

//comment routers
router.post("/new", commentController.createComment);
router.get("/", commentController.getAllComment);
router.get("/:postId", commentController.getCommentOfPost);
router.get("/sub/:postId/:parentId", commentController.getSubCommentOfPost);
router.get("/detail/:id", commentController.getCommentById);
// router.put("/:id", categoryController.updateCategory);
// router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
