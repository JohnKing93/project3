module.exports = (sequelize, DataTypes) => {
  const Incentive = sequelize.define('Incentive', {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Incentive;
};
