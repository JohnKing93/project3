module.exports = (sequelize, DataTypes) => {
  const Incentive = sequelize.define('Incentive', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Incentive;
};
