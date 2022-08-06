const catchAsyncError = require("../middleware/catchAsyncError");
const db = require("../model");
const cloudinary = require("cloudinary");
const Like = db.likes;
const User = db.users;

exports.createLike = catchAsyncError(async (req, res, next) => {
  const isLike = await Like.findOne({
    where: {
      user_id: req.body.user_id,
      comment_id: req.body.comment_id,
    },
  });

  if (!isLike) {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: "news/like",
    //   width: 150,
    //   crop: "scale",
    // });

    const newLike = {
      ...req.body,
      // image: myCloud.secure_url,
      // image_id: myCloud.public_id,
    };
    const like = await Like.create(newLike);

    res.status(201).json({
      success: true,
      like,
      message: "add like successfully",
    });
  }

  // có like rồi và trùng với cái cũ
  if (isLike && req.body.name === isLike.dataValues.name) {
    //await cloudinary.v2.uploader.destroy(isLike.image_id);

    await Like.destroy({
      where: {
        user_id: req.body.user_id,
        comment_id: req.body.comment_id,
      },
    });

    return res.status(200).json({
      message: "unlike...",
    });
  } else {
    // await cloudinary.v2.uploader.destroy(isLike.image_id);
    // await Like.destroy({
    //   where: {
    //     user_id: req.body.user_id,
    //     comment_id: req.body.comment_id,
    //   },
    // });

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: "news/like",
    //   width: 150,
    //   crop: "scale",
    // });

    const newLike = {
      ...req.body,
      // image: myCloud.secure_url,
      // image_id: myCloud.public_id,
    };

    await Like.update(newLike, {
      where: {
        user_id: req.body.user_id,
        comment_id: req.body.comment_id,
      },
    });
    res.status(200).json({
      success: true,
      message: "update like successfully",
    });

    // const newLike = {
    //   ...req.body,
    //   image: myCloud.secure_url,
    //   image_id: myCloud.public_id,
    // };
    // const like = await Like.create(newLike);

    // res.status(201).json({
    //   success: true,
    //   like,
    //   message: "add like successfully",
    // });
  }

  // const like = await Like.create(newLike);

  // res.status(201).json({
  //   success: true,
  //   like,
  //   message: "add like successfully",
  // });
});
