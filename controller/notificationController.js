const catchAsyncError = require("../middleware/catchAsyncError");
const db = require("../model");
const cloudinary = require("cloudinary");
const Notification = db.notifications;

exports.createNotification = catchAsyncError(async (req, res, next) => {
  const notification = await Notification.create(req.body);
  res.status(201).json({
    success: true,
    notification,
    message: "add notification successfully",
  });
});

exports.getAllNotifications = catchAsyncError(async (req, res) => {
  const notification = await Notification.findAll();

  res.status(200).json({
    success: true,
    notification,
  });
});

exports.getNotificationsOfUser = catchAsyncError(async (req, res) => {
  const seen = await Notification.findAll({
    where: { seen: false, user_id: req.query.user_id },
  });

  const notification = await Notification.findAll({
    order: [["id", "DESC"]],
    where: {
      user_id: req.query.user_id,
    },
  });

  res.status(200).json({
    success: true,
    seen: seen?.length,
    notification,
  });
});

exports.updateSeen = catchAsyncError(async (req, res) => {
  await Notification.update(
    { seen: true },
    {
      where: {
        user_id: req.body.user_id,
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "update category successfully",
  });
});
