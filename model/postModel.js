module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    img_id: {
      type: DataTypes.STRING,
    },
  });

  return Post;
};
