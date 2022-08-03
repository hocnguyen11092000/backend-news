// import controllers review, products
const likeController = require("../controller/likeController");

// router
const router = require("express").Router();

// category routers
router.post(
  "/new",

  likeController.createLike
);

module.exports = router;
