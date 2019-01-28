module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
      default: 'User',
    },
    hoursEarned: {
      type: DataTypes.FLOAT,
      default: 0,
    },
    hoursRedeemed: {
      type: DataTypes.FLOAT,
      default: 0,
    },
  });

  User.associate = (models) => {
    // Associate user back to permissions
    models.User.belongsTo(models.Permission, {
      foreignKey: 'permissionID',
    });

    // User can own many ideas
    models.User.hasMany(models.Idea, {
      foreignKey: {
        name: 'ownerID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many idea comments
    models.User.hasMany(models.IdeaComment, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many votes
    models.User.hasMany(models.IdeaVote, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can own many projects
    models.User.hasMany(models.Project, {
      foreignKey: {
        name: 'ownerID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many project comments
    models.User.hasMany(models.ProjectComment, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can be a member of many projects
    models.User.hasMany(models.ProjectMember, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can redeem many incentives
    models.User.hasMany(models.IncentiveRedeemed, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });

    // User can have many timesheets
    models.User.hasMany(models.Timesheet, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return User;
};
