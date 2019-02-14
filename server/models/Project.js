module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
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

  Project.associate = (models) => {
    // Associate project back to status
    Project.belongsTo(models.Status, {
      foreignKey: 'statusID',
    });

    // Associate project back to user
    Project.belongsTo(models.User, {
      foreignKey: 'ownerID',
    });

    // Project can have many roles
    Project.hasMany(models.ProjectRole, {
      as: 'Roles',
      foreignKey: {
        name: 'projectID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // Project can have many roles
    Project.hasMany(models.RoleMember, {
      foreignKey: {
        name: 'projectID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // Project can have many comments
    Project.hasMany(models.ProjectComment, {
      foreignKey: {
        name: 'projectID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // Project can have many milestones
    Project.hasMany(models.ProjectMilestone, {
      foreignKey: {
        name: 'projectID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // Project can have many timesheets
    Project.hasMany(models.Timesheet, {
      foreignKey: {
        name: 'projectID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return Project;
};
