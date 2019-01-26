module.exports = (sequelize, DataTypes) => {
  const ProjectComment = sequelize.define('ProjectComment', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ProjectComment.associate = (models) => {
    // Associate comment back to project
    ProjectComment.belongsTo(models.Project, {
      foreignKey: 'projectID',
    });

    // Associate comment back to user
    ProjectComment.belongsTo(models.User, {
      foreignKey: 'userID',
    });
  };

  return ProjectComment;
};
