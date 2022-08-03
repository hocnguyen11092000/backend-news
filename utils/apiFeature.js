const { Op } = require("sequelize");
const db = require("../model");
const Category = db.categories;
const User = db.users;
const Comment = db.comments;

class ApiFeature {
  constructor(modal, queryStr) {
    this.modal = modal;
    this.queryStr = queryStr;
    this.query = undefined;
  }

  filter(resultPerPage) {
    const queryCopy = { ...this.queryStr };

    const currentIndex = Number(this.queryStr.page - 1) * resultPerPage;

    this.query = this.modal.findAll({
      order: [["id", "DESC"]],
      attributes: { exclude: ["category_id", "user_id", "img_id"] },
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: User,
          as: "user",
        },
        {
          model: Comment,
          as: "comment",
        },
      ],
      where: {
        [Op.and]: [
          {
            title: {
              [Op.substring]: queryCopy?.keyword || "",
            },
          },
        ],
      },
      offset: currentIndex || 0,
      limit: resultPerPage,
    });
    return this;
  }
}

module.exports = ApiFeature;
