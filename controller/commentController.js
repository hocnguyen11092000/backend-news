const catchAsyncError = require("../middleware/catchAsyncError");
const db = require("../model");
const ErrorHander = require("../utils/ErrorHander");
const Comment = db.comments;
const User = db.users;
const Like = db.likes;

const { Op } = require("sequelize");

exports.getAllComment = catchAsyncError(async (req, res, next) => {
  const comments = await Comment.findAll();

  res.status(200).json({
    success: true,
    comments,
  });
});

exports.createComment = catchAsyncError(async (req, res, next) => {
  req.body.parentId = req.body.parent_id;
  let comment = await Comment.create(req.body);

  if (req.body.parent_id) {
    const parentComment = await Comment.findOne({
      where: { id: req.body.parent_id },
    });

    const count = parentComment.dataValues.hasChild;
    await Comment.update(
      { hasChild: Number(count) + 1 },
      { where: { id: req.body.parent_id } }
    );
    res.status(201).json({
      success: true,
      comment,
      parentComment,
    });
  } else {
    res.status(201).json({
      success: true,
      comment,
    });
  }
});

exports.getCommentOfPost = catchAsyncError(async (req, res, next) => {
  const id = req.params.postId;

  const comments = await Comment.findAll({
    include: [
      {
        model: User,
        as: "user",
        // attributes: ["id", "name"],
      },
      {
        model: Like,
        as: "like",

        include: [
          {
            model: User,
            as: "user",
          },
        ],
      },
    ],

    where: {
      [Op.and]: [
        {
          post_id: id,
        },
        {
          parentId: 0,
        },
      ],
    },
  });
  if (!comments) {
    return next(new ErrorHander("comment of post not found", 404));
  }

  res.status(200).json({
    success: true,
    comments,
  });
});

exports.getSubCommentOfPost = catchAsyncError(async (req, res, next) => {
  const idPost = req.params.postId;
  const parentId = req.params.parentId;

  const resultPerPage = 5;
  const page = req.query.page;

  const currentIndex = Number(page - 1) * resultPerPage;

  const subComment = await Comment.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Like,
        as: "like",
      },
    ],
    where: {
      [Op.and]: [
        {
          post_id: idPost,
        },
        {
          parentId: parentId,
        },
      ],
    },
    offset: currentIndex || 0,
    limit: page ? resultPerPage : 100,
  });

  const total = await Comment.count({
    where: {
      [Op.and]: [
        {
          post_id: idPost,
        },
        {
          parentId: parentId,
        },
      ],
    },
  });

  const totalPage = Math.ceil((total - 1) / 5);

  res.status(200).json({
    success: true,
    subComment,
    pagination: {
      page: Number(page),
      totalPage: totalPage,
      limit: resultPerPage,
    },
  });
});

exports.getCommentById = catchAsyncError(async (req, res, next) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  if (!comment) {
    return next(new ErrorHander("comment not found", 404));
  }

  return res.status(200).json({
    success: true,
    comment,
  });
});
