module.exports = (sequelize) => {
  const RoleMember = sequelize.define('RoleMember', {});

  RoleMember.associate = (models) => {
    // Associate role member back to status
    RoleMember.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });

    // Associate role member back to user
    RoleMember.belongsTo(models.User, {
      foreignKey: 'userID',
    });

    // Associate role member back to project roles
    RoleMember.belongsTo(models.ProjectRole, {
      foreignKey: 'roleID',
    });

    // Associate role member back to project
    RoleMember.belongsTo(models.Project, {
      foreignKey: 'projectID',
    });
  };

  return RoleMember;
};
