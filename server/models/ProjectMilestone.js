module.exports = (sequelize, DataTypes) => {
  const ProjectMilestone = sequelize.define('ProjectMilestone', {
    milestone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ProjectMilestone.associate = (models) => {
    // Associate milestone back to project
    ProjectMilestone.belongsTo(models.Project, {
      foreignKey: 'projectID',
    });

    // Associate milestone back to status
    ProjectMilestone.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });
  };

  return ProjectMilestone;
};
