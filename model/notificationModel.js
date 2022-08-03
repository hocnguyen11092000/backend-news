module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("notification", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Notification;
};
