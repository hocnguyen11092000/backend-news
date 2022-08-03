const catchAsyncError = require("../middleware/catchAsyncError");
const db = require("../model");
const Category = db.categories;

exports.createCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    category,
    message: "add category successfully",
  });
});

exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findAll();

  res.status(200).json({
    success: true,
    category,
  });
});

exports.getDetailCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findOne({ where: { id: req.params.id } });

  if (!category) {
    return next(new Error("category not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

exports.updateCategory = catchAsyncError(async (req, res, next) => {
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    success: true,
    message: "update category successfully",
  });
});

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    success: true,
    message: "delete category successfully",
  });
});
