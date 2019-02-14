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
    Incentive.hasMany(models.IncentiveRedeemed, {
      foreignKey: {
        name: 'incentiveID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // Associate incentive back to status
    Incentive.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });
  };

  return Incentive;
};
