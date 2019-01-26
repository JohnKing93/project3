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

  Incentive.associate = (models) => {
    // Incentive can be redeemed multiple times by different users
    models.Idea.hasMany(models.IncentiveRedeemed, {
      foreignKey: {
        name: 'incentiveID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return Incentive;
};
