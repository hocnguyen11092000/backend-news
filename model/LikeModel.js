module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Like;
};
