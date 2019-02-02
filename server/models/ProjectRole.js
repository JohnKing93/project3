module.exports = (sequelize, DataTypes) => {
  const ProjectRole = sequelize.define('ProjectRole', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });

  ProjectRole.associate = (models) => {
    // Associate project role back to status
    models.ProjectRole.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });

    // Associate project role back to project
    models.ProjectRole.belongsTo(models.Project, {
      foreignKey: 'projectID',
    });

    // project role can have many members
    models.ProjectRole.hasMany(models.RoleMember, {
      foreignKey: {
        name: 'roleID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return ProjectRole;
};
