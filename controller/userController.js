const db = require("../model");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwt");

const bcrypt = require("bcryptjs");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/ErrorHander");

// create main Model
const User = db.users;

// main work

// 1. create product

const Register = catchAsyncError(async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "news/avatar",
    width: 150,
    crop: "scale",
  });

  let info = {
    email: req.body.email,
    password: passwordHash,
    name: req.body.name,
    avatar: myCloud.secure_url,
  };

  const user = await User.create(info);
  sendToken(user, 200, res);
});

const Login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please enter Email or Password", 400));
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new ErrorHander("Wrong email or password", 401));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Wrong password", 401));
  }
  sendToken(user, 200, res);
});

const getUserInfo = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  delete user.dataValues.password;

  res.status(200).json({
    success: true,
    user,
  });
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    success: true,
    users,
  });
});

module.exports = {
  Register,
  Login,
  getUserInfo,
  getAllUsers,
};
