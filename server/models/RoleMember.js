module.exports = (sequelize) => {
  const RoleMember = sequelize.define('RoleMember', {});

  RoleMember.associate = (models) => {
    // Associate role member back to status
    models.RoleMember.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });

    // Associate role member back to user
    models.RoleMember.belongsTo(models.User, {
      foreignKey: 'userID',
    });

    // Associate role member back to project roles
    models.RoleMember.belongsTo(models.ProjectRole, {
      foreignKey: 'roleID',
    });
  };

  return RoleMember;
};
