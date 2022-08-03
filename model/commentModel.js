module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: DataTypes.STRING,
    },
    parent_name: {
      type: DataTypes.STRING,
    },
    parentId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    hasChild: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Comment;
};
