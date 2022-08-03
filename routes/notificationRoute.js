// import controllers review, products
const notificationController = require("../controller/notificationController");

// router
const router = require("express").Router();

// category routers
router.post("/new", notificationController.createNotification);

router.get("/", notificationController.getAllNotifications);
router.get("/user", notificationController.getNotificationsOfUser);
router.put("/update-seen", notificationController.updateSeen);

module.exports = router;
