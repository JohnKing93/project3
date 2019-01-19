module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    First_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Last_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Hours_Earned: {
      type: DataTypes.FLOAT,
      allowNull: false,
      default: 0,
    },
    Hours_Redemmed: {
      type: DataTypes.FLOAT,
      allowNull: false,
      default: 0,
    },
  });

  return User;
};
