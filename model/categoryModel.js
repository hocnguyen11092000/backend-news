module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Category;
};
