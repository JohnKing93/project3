module.exports = (sequelize) => {
  const IncentiveRedeemed = sequelize.define('IncentiveRedeemed', {});

  IncentiveRedeemed.associate = (models) => {
    // Associate vote back to idea
    IncentiveRedeemed.belongsTo(models.Incentive, {
      foreignKey: 'incentiveID',
    });

    // Associate vote back to user
    IncentiveRedeemed.belongsTo(models.User, {
      foreignKey: 'userID',
    });
  };

  return IncentiveRedeemed;
};
