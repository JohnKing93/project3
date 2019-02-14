module.exports = (sequelize, DataTypes) => {
  const ProjectRole = sequelize.define('ProjectRole', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  });

  ProjectRole.associate = (models) => {
    // Associate project role back to status
    ProjectRole.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });

    // Associate project role back to project
    ProjectRole.belongsTo(models.Project, {
      foreignKey: 'projectID',
    });

    // project role can have many members
    ProjectRole.hasMany(models.RoleMember, {
      foreignKey: {
        name: 'roleID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return ProjectRole;
};
