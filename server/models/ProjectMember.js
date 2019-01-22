module.exports = (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define('ProjectMember', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ProjectMember.associate = (models) => {
    // Associate ProjectMember back to status
    models.ProjectMember.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });

    // Associate ProjectMember back to user
    models.ProjectMember.belongsTo(models.User, {
      foreignKey: 'userID',
    });

    // Associate ProjectMember back to project
    models.ProjectMember.belongsTo(models.Project, {
      foreignKey: 'projectID',
    });
  };

  return ProjectMember;
};
