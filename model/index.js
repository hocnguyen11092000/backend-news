const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.categories = require("./categoryModel.js")(sequelize, DataTypes);
db.posts = require("./postModel.js")(sequelize, DataTypes);
db.comments = require("./commentModel.js")(sequelize, DataTypes);
db.likes = require("./LikeModel")(sequelize, DataTypes);
db.notifications = require("./notificationModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// 1 to Many Relation

db.users.hasMany(db.posts, {
  foreignKey: "user_id",
  as: "posts",
});

db.users.hasMany(db.notifications, {
  foreignKey: "user_id",
  as: "notifications",
});

db.categories.hasMany(db.posts, {
  foreignKey: "category_id",
  as: "category",
});

db.posts.hasMany(db.comments, {
  foreignKey: "post_id",
  as: "comment",
});

db.users.hasMany(db.comments, {
  foreignKey: "user_id",
  as: "comment",
});

db.comments.hasMany(db.likes, {
  foreignKey: "comment_id",
  as: "like",
});

db.users.hasMany(db.likes, {
  foreignKey: "user_id",
  as: "like",
});

//--

db.posts.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.posts.belongsTo(db.categories, {
  foreignKey: "category_id",
  as: "category",
});

db.comments.belongsTo(db.posts, {
  foreignKey: "post_id",
  as: "post",
});

db.comments.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.likes.belongsTo(db.comments, {
  foreignKey: "comment_id",
  as: "comment",
});

db.likes.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.notifications.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = db;
