const catchAsyncError = require("../middleware/catchAsyncError");
const db = require("../model");
const cloudinary = require("cloudinary");
const ErrorHander = require("../utils/ErrorHander");
const ApiFeature = require("../utils/apiFeature");
const readingTime = require("reading-time");

const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Category = db.categories;

exports.createPost = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "news/posts",
    width: 150,
    crop: "scale",
  });

  let postInfo = {
    image: myCloud.secure_url,
    img_id: myCloud.public_id,
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    user_id: Number.parseInt(req.body.user_id),
    category_id: Number.parseInt(req.body.category_id),
  };

  const post = await Post.create(postInfo);

  res.status(201).json({
    success: true,
    message: "add post successfully",
    post,
  });
});

exports.getAllPost = catchAsyncError(async (req, res, next) => {
  const apiFeature = new ApiFeature(Post, req.query).filter(8);
  const numberOfPost = await Post.count();
  const hasPost = !!numberOfPost;

  let posts = await apiFeature.query;
  posts.forEach((x) => {
    x.dataValues.timeReading = readingTime(x.dataValues.description);
  });

  res.status(200).json({
    success: true,
    posts,
    count: numberOfPost,
    // searchCount: posts.length,
    hasPost,
  });
});

exports.getDetailPost = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const post = await Post.findOne({
    attributes: { exclude: ["category_id", "user_id", "img_id"] },
    where: { id: id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Category,
        as: "category",
      },
    ],
  });

  if (!post) {
    return next(new ErrorHander("post not found", 404));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

exports.updatePost = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const newData = req.body;

  if (req.body.image && req.body.image !== "") {
    const post = await Post.findByPk(id);
    if (!post) {
      return next(new ErrorHander("post not found", 400));
    }

    const imageId = post.img_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "news/posts",
      width: 150,
      crop: "scale",
    });

    newData.image = myCloud.secure_url;
    newData.img_id = myCloud.public_id;
  }

  await Post.update(newData, {
    where: { id: id },
  });

  res.status(200).json({
    success: true,
    message: "update post successfully",
  });
});

exports.deletePost = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    return next(new ErrorHander("post not found", 404));
  }

  await cloudinary.v2.uploader.destroy(post.img_id);

  await Post.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    success: true,
    message: "delete post successfully",
  });
});

exports.getPostsByCategory = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findByPk(id);

  const posts = await Post.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
    ],
    where: { category_id: Number.parseInt(id) },
  });

  if (!posts) {
    return next(new ErrorHander("post not found", 404));
  }

  posts.forEach((x) => {
    x.dataValues.timeReading = readingTime(x.dataValues.description);
  });

  res.status(200).json({
    success: true,
    posts,
    count: posts.length,
    category,
  });
});
